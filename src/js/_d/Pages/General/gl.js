import Motion from "../../../Motion";
import { BM, Get, IndexClass, IndexList, L, Re } from "../../../utils/dom";
import { Ease } from "../../../utils/easings";
import { Damp, Lerp, Une } from "../../../utils/math";

export default class GLGeneral {
	constructor() {
		BM(this, ["fnOver"]);
	}

	init() {
		const _app = _A;
		this.url = _app.route.new.url;
		this.animating = false;

		const textures = _A.rgl._[this.url];
		const page = (this.el = _app.e.p());

		this.img = Get.cl("_me", page);
		this.li = Get.cl("ge-li", page);
		this.liL = this.li.length;

		this.tex = textures.plane.main;
		this.texL = textures.planeL.main;

		this.index = { cur: 0, tar: -1 };
		this.y = [];
		this.o;
		this.sliderMask = [];

		for (let i = 0; i < this.texL; i++) {
			const active = 0 < i ? 1 : 0;
			this.sliderMask[i] = {
				tb: 0,
				bt: active,
			};
		}

		this.resize();
	}

	resize() {
		const _app = _A;
		const currScroll = _app.e.s._[this.url].cur;

		const image = this.img[0];

		for (let i = 0; i < this.texL; i++) {
			const { lerp, ease } = this.tex[i].move;
			const rect = Re(image);
			const posY = rect.top + currScroll;

			lerp.x = rect.left;
			lerp.w = image.offsetWidth;
			lerp.h = image.offsetHeight;

			ease.opacity = i === 0 ? 1 : 0;

			this.y[i] = posY;
		}
	}

	texSet() {
		const _app = _A;
		const scroll = _app.e.s._[this.url];

		const curr = scroll.cur;
		const targ = scroll.tar;

		const curScroll = Damp(curr, targ, 0.09);

		for (let i = 0; i < this.texL; i++) {
			const { lerp, ease } = this.tex[i].move;
			lerp.y = this.y[i] - curScroll;

			ease.opacity = i === this.index.cur ? 1 : 0;
		}
	}

	show(opt) {
		const d = opt.d;
		const e = opt.e;

		return {
			play: () => {},
		};
	}

	fnOver(event) {
		const index = IndexClass(event.target, "ge-li");
		console.log(index);

		if (index === this.index.tar) return;

		this.index.cur = index;
	}

	l(action) {
		for (let i = 0; i < this.li.length; i++) {
			L(this.li[i], action, "mouseenter", this.fnOver);
		}
	}

	on() {
		this.l("a");
	}

	off() {
		this.l("r");
	}

	loop() {
		this.texSet();
	}
}
