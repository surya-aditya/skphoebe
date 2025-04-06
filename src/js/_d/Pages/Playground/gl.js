import Motion from "../../../Motion";
import { Get, L, Re } from "../../../utils/dom";
import { Ease } from "../../../utils/easings";
import { Damp, Lerp } from "../../../utils/math";

export default class GLPlayground {
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

		for (let i = 0; i < this.texL; i++) this.bw[i] = 0;

		this.resize();
	}

	resize() {
		const _app = _A;
		const currScroll = _app.e.s._[this.url].cur;

		for (let i = 0; i < this.texL; i++) {
			const image = this.img[i];

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
		const { cur, tar } = _app.e.s._[this.url];

		const scroll = Damp(cur, tar, 0.09);

		for (let i = 0; i < this.texL; i++) {
			let { lerp } = this.tex[i].move;
			lerp.y = this.y[i] - scroll;
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
		this.overFn();
	}

	overFn() {
		const _app = _A;
		let newOver = -1;

		const cursor = _app.e.c._;
		const x = cursor[0];
		const y = cursor[1];

		for (let i = 0; i < this.nuL; i++) {
			const { lerp } = this.tex[i][0].move;
			let xInRange = x >= lerp.x && x <= lerp.x + lerp.w;
			let yInRange = y >= lerp.y && y <= lerp.y + lerp.h;

			if (xInRange && yInRange) {
				newOver = i;
				break;
			}
		}

		this.over = newOver;
	}

	ov(event) {
		this.isOver = event.type === "mouseenter";
	}

	l(action) {
		const ev = ["enter", "leave"];
		for (let i = 0; i < 2; i++) L(this.el, action, "mouse" + ev[i], this.ov);
	}

	on() {
		this.l("a");
	}

	off() {
		this.l("r");
	}
}
