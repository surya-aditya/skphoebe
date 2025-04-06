import { Cl, Get, Re, T } from "../../utils/dom";
import { R } from "../../utils/math";

export default class ScrollInertia {
	constructor() {
		const _app = _A;
		this.url = _app.route.new.url;

		this._ = [];
		this._L = 0;

		const children = _app.e.p().children;

		for (let el of children) {
			if (!Cl.co(el, "_ns")) {
				this._[this._L] = { dom: el, range: {} };
				this._L++;
			}
		}

		this.resize();
	}

	resize() {
		const winHeight = _A.win.h;
		let totalH = 0;

		for (let i = 0; i < this._L; i++) {
			const el = this._[i];
			const elHeight = Re(el.dom).height;
			let rangeStart = totalH - winHeight;
			let rangeEnd = Math.max(totalH, 0) + elHeight;

			el.range.s = rangeStart;
			el.range.e = rangeEnd;
			el.isOut = false;

			totalH += elHeight;
		}

		this.run();
	}

	run() {
		const _app = _A;
		const _e = _app.e;
		const scroll = _e.s;

		const curScroll = scroll._[this.url].cur;

		for (let i = 0; i < this._L; i++) {
			const el = this._[i];
			const range = el.range;

			if (curScroll > range.s && curScroll < range.e) {
				if (el.isOut) el.isOut = false;
				this.draw(el, curScroll);
			} else if (!el.isOut) {
				el.isOut = true;
				this.draw(el, curScroll);
			}
		}
	}

	draw(e, p) {
		T(e.dom, 0, R(-p), "px");
	}
}
