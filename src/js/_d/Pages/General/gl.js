import Motion from "../../../Motion";
import { Get, L, Re } from "../../../utils/dom";
import { Ease } from "../../../utils/easings";
import { Damp, Lerp } from "../../../utils/math";

export default class GLGeneral {
	init() {
		const _app = _A;
		this.url = _app.route.new.url;
		this.animating = false;

		const textures = _A.rgl._[this.url];
		const page = (this.el = _app.e.p());

		this.img = Get.cl("_me", page);

		this.tex = textures.plane.main;
		this.texL = textures.planeL.main;

		this.y = [];
		this.bw = [];

		this.prevCursorX = 0;

		for (let i = 0; i < this.texL; i++) this.bw[i] = 0;

		this.resize();
	}

	resize() {
		const _app = _A;
		const currScroll = _app.e.s._[this.url].cur;

		const image = this.img[0];

		for (let i = 0; i < this.texL; i++) {
			const lerp = this.tex[i].move.lerp;
			const rect = Re(image);
			const posY = rect.top + currScroll;

			lerp.x = rect.left;
			lerp.w = image.offsetWidth;
			lerp.h = image.offsetHeight;

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
			let { lerp } = this.tex[i].move;
			lerp.y = this.y[i] - curScroll;
		}
	}

	show(opt) {
		const d = opt.d;
		const e = opt.e;

		return {
			play: () => {},
		};
	}

	loop() {
		this.texSet();
	}
}
