import ROR from "../Global/RORunner";

import { BM, Get } from "../utils/dom";
import RafRunner from "../utils/rafr";

import Cursor from "./Cursor";

function Page$1(suffix) {
	const elements = Get.cl("p" + (suffix || ""));
	return elements[elements.length - 1];
}

export default class Engine {
	constructor() {
		BM(this, ["resize", "loop"]);

		this.raf = new RafRunner(this.loop);

		this.p = Page$1;

		this.c = new Cursor();
	}

	intro() {}

	init() {
		this.loop();
	}

	resize() {}

	run() {
		new ROR(this.resize).on();
		this.raf.run();
		this.c.run();
	}

	on() {}

	off() {}

	loop() {}
}
