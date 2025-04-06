import ROR from "../../../Global/RORunner";
import Format from "../Format";

import { BM, isDef } from "../../../utils/dom";

export default class Instance {
	constructor() {
		BM(this, ["resize"]);

		this.ro = new ROR(this.resize);
	}

	init(config) {
		this.f = new Format(config);

		this.resize();
		this.ro.on();
	}

	resize() {
		this.f.resize();
	}

	play() {
		this.f.play();
	}

	pause() {
		this.f.pause();
	}

	destroy() {
		this.ro.off();
		if (isDef(this.f.destroy)) {
			this.f.destroy();
		}
	}
}
