import Motion from "../../../../Motion";
import {
	BM,
	clipFn,
	Get,
	isUnd,
	L,
	Opacity,
	PE,
	Re,
	T,
} from "../../../../utils/dom";
import { Damp, Mod, R, Une } from "../../../../utils/math";

export default class FxFullscreen {
	constructor() {
		BM(this, ["fn"]);
	}

	init() {
		this.__ = Get.id("pl-p");
		this._ = this.__.children[0];
		this.li_ = Get.cl("pl-p-li");
		this.liL = this.li_.length;
		this.li = [];

		for (let i = 0; i < this.liL; i++) this.li[i] = this.li_[i].children[0];

		this.max = this.liL - 1;
		this.index = 0;

		this.p = {
			x: [],
			cl: [],
			cr: [],
		};

		for (let i = 0; i < this.liL; i++) {
			const initX = i === 0 ? 0 : 10;
			const initClip = i === 0 ? 0 : 100;

			this.p.x[i] = { cur: initX, tar: initX };
			this.p.cl[i] = { cur: initClip, tar: initClip };
			this.p.cr[i] = { cur: 0, tar: 0 };
		}

		this.visibleFirst = false;
		this.visible = Array(this.liL).fill(false);
	}

	resize() {
		if (!this.rqd) return;

		const _app = _A;
		const scrollY = _app.e.s._[_app.route.new.url].cur;
		const winHeight = _A.win.h;
		const top = Re(this._).top + scrollY;
		const isInView = top < winHeight;

		this.limit = isInView ? -1 : top - winHeight;
		this.delay = isInView ? 0.5 * _A.t.tr.d + 400 : 0;
	}

	slide(clientX) {
		if (this.moveL >= this.liL) return;

		const isRight = clientX > _A.winSemi.w;
		const dir = isRight ? 1 : -1;

		const prevIndex = this.index;
		const nextIndex = Mod(prevIndex + dir, this.liL);

		const isSameDirection = this.state === isRight || isUnd(this.state);

		this.state = isRight;
		this.index = nextIndex;

		if (isSameDirection) this.p.x[nextIndex].cur = 20 * dir;

		this.p.x[nextIndex].tar = 0;
		this.p.x[prevIndex].tar = -20 * dir;

		if (isRight) {
			if (isSameDirection) {
				this.p.cl[nextIndex].cur = 0;
				this.p.cl[nextIndex].tar = 0;
				this.p.cr[nextIndex].cur = 100;
				this.p.cl[prevIndex].cur = 0;
			}
			this.p.cr[nextIndex].tar = 0;
			this.p.cl[prevIndex].tar = 100;
		} else {
			if (isSameDirection) {
				this.p.cr[nextIndex].cur = 0;
				this.p.cr[nextIndex].tar = 0;
				this.p.cl[nextIndex].cur = 100;
				this.p.cr[prevIndex].cur = 0;
			}
			this.p.cl[nextIndex].tar = 0;
			this.p.cr[prevIndex].tar = 100;
		}

		this.on();
	}

	fx(opt) {
		const action = opt.a;
		const isShow = action === "show";
		const pointerEvents = isShow ? "a" : "n";
		const duration = isShow ? 1200 : 1e3;
		const ease = isShow ? "o6" : "o6";

		PE[pointerEvents](this.__);
		Opacity(this.__, isShow ? 1 : 0);
		Opacity(Get.id("pl-p-bg"), isShow ? 1 : 0);
	}

	fn(e) {
		this.off();
		this.slide(e.clientX);
	}

	l(action) {
		L(this.__, action, "click", this.fn);
		// L(this.__, action, "click", () => this.fx({ a: "hide" }));
	}

	on() {
		this.l("a");
	}

	off() {
		this.l("r");
	}

	loop() {
		const _app = _A;
		const mm = _app.e.c._;
		const { cur } = _app.e.s._[_app.route.new.url];

		if (!this.visibleFirst && cur > this.limit) {
			this.visibleFirst = true;
		}

		this.moveL = 0;

		for (let i = 0; i < this.liL; i++) {
			this.p.x[i].cur = Damp(this.p.x[i].cur, this.p.x[i].tar, 0.09);
			this.p.cl[i].cur = Damp(this.p.cl[i].cur, this.p.cl[i].tar, 0.09);
			this.p.cr[i].cur = Damp(this.p.cr[i].cur, this.p.cr[i].tar, 0.09);

			const hasMovement = Une(this.p.x[i].cur, this.p.x[i].tar, 1);
			if (Une(this.p.x[i].cur, this.p.x[i].tar, 3)) {
				const el = this.li_[i];
				el.style.clipPath = clipFn(this.p.cl[i].cur, this.p.cr[i].cur);
				T(el.children[0], R(this.p.x[i].cur), 0);
			}

			if (hasMovement) this.moveL++;
		}

		if (_A.e.pl.fx$1.isShow) {
			if (mm[0] > _app.winSemi.w) {
				document.body.style.cursor = "e-resize";
			} else {
				document.body.style.cursor = "w-resize";
			}
		}
	}
}
