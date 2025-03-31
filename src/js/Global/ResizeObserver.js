import { default as RafR } from "../utils/rafr";
import { BM, L, Snif } from "../utils/dom";
import { Timer } from "../utils/math";

export default class ResizeObserver {
	constructor() {
		this.eT = Snif.isMobile ? "orientationchange" : "resize";
		this.tick = false;
		this._ = [];

		BM(this, ["fn", "loop", "run"]);

		this.t = new Timer({ de: 40, cb: this.loop });

		this.rafr = new RafR(this.run);

		L(window, "a", this.eT, this.fn);
	}

	add(item) {
		this._.push(item);
	}

	rm(itemId) {
		const index = this._.findIndex((item) => item.id === itemId);
		if (index !== -1) this._.splice(index, 1);
	}

	fn(event) {
		this.e = event;
		this.t.run();
	}

	loop() {
		if (!this.tick) {
			this.tick = true;
			this.rafr.run();
		}
	}

	run() {
		this._.forEach((item) => item.cb(this.e));
		this.rafr.stop();
		this.tick = false;
	}
}
