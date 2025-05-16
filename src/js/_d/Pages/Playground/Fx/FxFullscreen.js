import Motion from "../../../../Motion";
import {
	BM,
	clipFn,
	Get,
	isUnd,
	L,
	Opacity,
	pad,
	PE,
	Re,
	T,
} from "../../../../utils/dom";
import { Damp, Mod, R, Une } from "../../../../utils/math";

export default class FxFullscreen {
	constructor() {
		BM(this, ["fn", "upAll", "fx"]);

		this.ease = 0.09;
	}

	init() {
		this.__ = Get.id("pl-p");
		this._ = this.__.children[0];
		this.a = this.__.children[1];

		this.li_ = Get.cl("pl-p-li");
		this.liL = this.li_.length;
		this.li = [];

		this.no = Get.id("pl-p-pagi-c");

		for (let i = 0; i < this.liL; i++) this.li[i] = this.li_[i].children[0];

		this.max = this.liL - 1;
		this.index = 0;

		this.p = {
			x: [],
			cl: [],
			cr: [],
		};

		this.co = {};

		const content = Get.id("pl-p-co").children;
		for (let i = 0; i < content.length; i++) {
			const initY = i === this.index ? 0 : 100;
			this.co[i] = {
				el: content[i],
				cur: initY,
				tar: initY,
			};
		}

		for (let i = 0; i < this.liL; i++) {
			const initX = i === 0 ? 0 : 10;
			const initClip = i === 0 ? 0 : 100;

			this.p.x[i] = { cur: initX, tar: initX };
			this.p.cl[i] = { cur: initClip, tar: initClip };
			this.p.cr[i] = { cur: 0, tar: 0 };
		}

		this.visibleFirst = false;
		this.visible = Array(this.liL).fill(false);

		this.resize();
	}

	resize() {
		if (!this.rqd) return;

		const _app = _A;
		const scrollY = _app.e.s._[_app.route.new.url].cur;
		const winHeight = _A.win.h;
		const top = Re(this.a).top + scrollY;
		const isInView = top < winHeight;

		this.limit = isInView ? -1 : top - winHeight;
		this.delay = isInView ? 0.5 * _A.t.tr.d + 400 : 0;

		for (let i = 0; i < this.co.length; i++) {
			const y = i === this.index ? 0 : 100;
			this.co[i].cur = y;
			this.co[i].tar = y;
		}
	}

	slide(clientX) {
		if (this.moveL >= this.liL) return;

		const isRight = clientX > _A.winSemi.w;
		const dir = isRight ? 1 : -1;

		console.log("slide", this.index);

		const prevIndex = this.index;
		const nextIndex = Mod(prevIndex + dir, this.liL);

		const isSameDirection = this.state === isRight || isUnd(this.state);

		this.state = isRight;
		this.index = nextIndex;

		this.no.textContent = pad(nextIndex + 1, 2);

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

			this.co[nextIndex].cur = 110;
			this.co[nextIndex].tar = 0;
			this.co[prevIndex].tar = -110;
		} else {
			if (isSameDirection) {
				this.p.cr[nextIndex].cur = 0;
				this.p.cr[nextIndex].tar = 0;
				this.p.cl[nextIndex].cur = 100;
				this.p.cr[prevIndex].cur = 0;
			}

			this.p.cl[nextIndex].tar = 0;
			this.p.cr[prevIndex].tar = 100;

			this.co[nextIndex].cur = -110;
			this.co[nextIndex].tar = 0;
			this.co[prevIndex].tar = 110;
		}

		this.on();
	}

	fx(opt) {
		const action = opt.a;
		const isShow = action === "show";
		const pointerEvents = isShow ? "a" : "n";
		const duration = isShow ? 1200 : 1e3;
		const ease = isShow ? "o6" : "o6";

		PE[pointerEvents](this.a);
		PE[pointerEvents](this.__);

		if (isShow) this.upAll(opt.index);

		Opacity(this.__, isShow ? 1 : 0);
		Opacity(Get.id("pl-p-bg"), isShow ? 1 : 0);
	}

	upAll(index) {
		const oldIndex = this.index;

		if (this.index === index) return;

		this.index = index;

		this.no.textContent = pad(index + 1, 2);

		// Content
		this.co[oldIndex].cur = 110;
		this.co[oldIndex].tar = 110;
		T(this.co[oldIndex].el, 0, R(this.co[oldIndex].cur));

		this.co[index].cur = 0;
		this.co[index].tar = 0;
		T(this.co[index].el, 0, R(this.co[index].cur));

		// Clipping
		this.p.x[index] = { cur: 0, tar: 0 };
		this.p.cl[index] = { cur: 0, tar: 0 };
		this.p.cr[index] = { cur: 0, tar: 0 };

		const newEl = this.li_[index];
		newEl.style.clipPath = clipFn(this.p.cl[index].cur, this.p.cr[index].cur);
		T(newEl.children[0], R(this.p.x[index].cur), 0);

		this.p.x[oldIndex] = { cur: 10, tar: 10 };
		this.p.cl[oldIndex] = { cur: 100, tar: 100 };
		this.p.cr[oldIndex] = { cur: 0, tar: 0 };

		const oldEl = this.li_[oldIndex];
		oldEl.style.clipPath = clipFn(
			this.p.cl[oldIndex].cur,
			this.p.cr[oldIndex].cur
		);
		T(oldEl.children[0], R(this.p.x[oldIndex].cur), 0);
	}

	fn(e) {
		this.off();
		this.slide(e.clientX);
	}

	l(action) {
		L(this.a, action, "click", this.fn);
	}

	on() {
		this.l("a");
	}

	off() {
		this.l("r");
	}

	loop() {
		const _app = _A;
		const { isShow } = _app.e.pl.fx$1;

		if (!isShow) return;

		this.moveL = 0;

		for (let i = 0; i < this.liL; i++) {
			this.p.x[i].cur = Damp(this.p.x[i].cur, this.p.x[i].tar, this.ease);
			this.p.cl[i].cur = Damp(this.p.cl[i].cur, this.p.cl[i].tar, this.ease);
			this.p.cr[i].cur = Damp(this.p.cr[i].cur, this.p.cr[i].tar, this.ease);

			const hasMovement = Une(this.p.x[i].cur, this.p.x[i].tar, 1);

			if (Une(this.p.x[i].cur, this.p.x[i].tar, 3)) {
				const el = this.li_[i];
				el.style.clipPath = clipFn(this.p.cl[i].cur, this.p.cr[i].cur);
				T(el.children[0], R(this.p.x[i].cur), 0);
			}

			if (hasMovement) this.moveL++;

			this.co[i].cur = Damp(this.co[i].cur, this.co[i].tar, this.ease);
			if (Une(this.co[i].cur, this.co[i].tar, 3)) {
				T(this.co[i].el, 0, R(this.co[i].cur));
			}
		}
	}
}
