import { default as RafR } from "../utils/rafr";
import { BM, L, Snif } from "../utils/dom";
import { Timer } from "../utils/math";

export default class ResizeObserver {
	constructor() {
		this.eT = Snif.isMobile ? "orientationchange" : "resize";
		this.t = false;
		this._ = [];
		this.l = 0;

		BM(this, ["fn", "loop", "run"]);

		this.d = new Timer({ de: 40, cb: this.loop });
		this.r = new RafR(this.run);

		L(window, "a", this.eT, this.fn);
	}

	add(item) {
		this._.push(item);
		this.l++;
	}

	rm(id) {
		let count = this.l;
		for (; count--; ) {
			if (this._[count].id === id) {
				this._.splice(count, 1);
				this.l--;
				return;
			}
		}
	}

	fn(event) {
		this.e = event;
		this.d.run();
	}

	loop() {
		if (this.l > 0 && !this.t) {
			this.t = true;
			this.r.run();
		}
	}

	run() {
		let index = 0;
		let length = this._.length;

		for (; index < length; index++) {
			this._[index].cb(this.e);
		}

		this.r.stop();
		this.t = false;
	}
}
