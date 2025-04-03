import { BM } from "../../utils/dom";
import SNative from "./SNative";

export default class Scroll {
	constructor() {
		BM(this, ["sY"]);
		this.n = new SNative({ cb: this.sY });
	}

	init() {
		this._ = 0;
	}

	resize() {}

	on() {
		this.n.on();
	}

	off() {
		this.n.off();
	}

	sY(y) {
		this._ = y;
	}
}
