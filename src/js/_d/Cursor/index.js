import { BM } from "../../utils/dom";
import PointerMove from "./PointerMove";

export default class Cursor {
	constructor() {
		this._ = [-1, -1];
		BM(this, ["move"]);
		this.mm = new PointerMove({ cb: this.move });
	}

	move(x, y) {
		this._ = [x, y];
	}

	run() {
		this.mm.on();
	}
}
