import { BM, Has, L, Select } from "../../utils/dom";

export default class PointerMove {
	constructor(options) {
		this.cb = options.cb;
		this.el = Has(options, "el") ? Select.el(options.el)[0] : document;

		BM(this, ["run"]);
	}

	on() {
		this.l("a");
	}

	off() {
		this.l("r");
	}

	l(mode) {
		L(this.el, mode, "pointermove", this.run);
	}

	run(event) {
		this.cb(event.pageX, event.pageY, event);
	}
}
