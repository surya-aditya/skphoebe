import VS from "./VS";
import PointerMove from "../Cursor/PointerMove";
import { BM, Cl, L, PD, Re } from "../../utils/dom";
import { Clamp, Damp, R, Une } from "../../utils/math";
import SVTo from "./SVTo";

export default class Scroll {
	constructor() {
		this.rqd = false;
		this.min = 0;
		this.isDown = false;
		this.isDrag = false;
		this.prev = 0;

		BM(this, ["vFn", "sUp", "move", "down", "up"]);

		this.v = new VS({ cb: this.vFn, k: true });
		this.sVTo = new SVTo({ sUp: this.sUp });
		this.pm = new PointerMove({ cb: this.move });
	}

	intro() {
		const config = _A.config.routes;
		const keys = Object.keys(config);
		const length = keys.length;

		this._ = {};

		for (let i = 0; i < length; i++) {
			this._[keys[i]] = { cur: 0, tar: 0 };
		}
	}

	init() {
		const _app = _A;
		this.url = _app.route.new.url;

		this.sVTo.init();

		this.sUpAll(0);
		this.resize();
	}

	resize() {
		const _app = _A;
		const { win, e } = _app;
		const { h } = win;
		const page = e.p();
		const el = page.children;
		const elL = el.length;

		let total = 0;

		if (_app.is.ho) {
			total = 0;
		} else if (_app.is.wo) {
			const innerEl = page.children[0].children;
			const innerElL = innerEl.length;

			for (let i = 0; i < innerElL; i++) {
				if (!Cl.co(innerEl[i], "_ns")) total += Re(innerEl[i]).height;
			}
		} else {
			for (let i = 0; i < elL; i++) {
				if (!Cl.co(el[i], "_ns")) total += Re(el[i]).height;
			}
		}

		this.max = Math.max(total - h, 0);
		this.max = R(this.max);

		this.sUpAll(this.clamp(this._[this.url].tar));
	}

	vFn(delta) {
		if (!this.isDown) {
			this.sVTo.stop();
			this.sUp(this.clamp(this._[this.url].tar + delta));
		}
	}

	sUp(newValue) {
		this._[this.url].tar = newValue;
	}

	down(event) {
		PD(event);

		if (
			event.target.tagName === "A" ||
			event.button === 2 ||
			(event.ctrlKey && event.button === 1)
		)
			return;

		this.isDown = true;
		this.isDrag = false;

		this.start = {
			x: event.pageX,
			y: event.pageY,
		};

		this.tar = this._[this.url].tar;
		this.tarPrev = this.tar;
	}

	move(x, y, event) {
		PD(event);

		if (this.isDown) {
			let deltaX = Math.abs(x - this.start.x);
			let deltaY = Math.abs(y - this.start.y);
			this.isDrag = deltaX > 6 || deltaY > 6;

			if (this.isDrag) {
				if (y > this.prev && this.tar === this.min) {
					this.start.y = y - (this.tarPrev - this.min) / 2;
				} else if (y < this.prev && this.tar === this.max) {
					this.start.y = y - (this.tarPrev - this.max) / 2;
				}

				this.prev = y;
				this.tar = 2 * -(y - this.start.y) + this.tarPrev;
				this.tar = this.clamp(this.tar);
				this.sUp(this.tar);
			}
		}
	}

	// Finalizes interaction once the mouse is released
	up() {
		if (!this.isDown) return;

		this.isDown = false;
		// this.isDrag = false;
	}

	// Periodically updates positions to create a smooth scrolling or dragging effect
	loop() {
		this.rqd = false;
		const url = this.url;
		const curScroll = R(this._[url].cur);

		const needUpd = Une(curScroll, this._[url].tar, 3);

		if (needUpd) {
			this._[url].cur = Damp(this._[url].cur, this._[url].tar, 0.09);
		}

		if (needUpd && !this.rqd) this.rqd = true;
	}

	// Updates all registered scroll positions
	sUpAll(value) {
		const scroll = this._[this.url];
		scroll.tar = value;
		scroll.cur = value;

		this.tar = value;
		this.tarPrev = value;
	}

	// Clamps the scroll position to ensure it remains within allowable limits
	clamp(value) {
		return R(Clamp(this.min, this.max, value));
	}

	// Handles event registration for pointer events
	l(mode) {
		var doc = document;

		L(doc, mode, "pointerdown", this.down);
		L(doc, mode, "pointerup", this.up);
	}

	// Activates the handlers and listeners
	on() {
		this.v.on();
		this.pm.on();
		this.sVTo.on();
		this.l("a");
	}

	// Deactivates the handlers and listeners
	off() {
		this.v.off();
		this.pm.off();
		this.sVTo.off();
		this.l("r");
	}
}
