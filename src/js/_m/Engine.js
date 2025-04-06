import ROR from "../Global/RORunner";

import { BM, Get } from "../utils/dom";
import { default as RafR } from "../utils/rafr";

import Cursor from "./Cursor";
import Load from "./Load";
import Nav from "./Partials/Nav";
import Scroll from "./Scroll";

function Page$1(suffix) {
	const elements = Get.cl("p" + (suffix || ""));
	return elements[elements.length - 1];
}

export default class Engine {
	constructor() {
		BM(this, ["resize", "loop"]);

		this.p = Page$1;
		this.raf = new RafR(this.loop);

		this.s = new Scroll();

		this.r = new Load();

		this.n = new Nav();
	}

	intro() {
		this.n.intro();
	}

	init() {
		this.s.init();
		this.r.init();

		this.n.init();

		this.loop();
	}

	resize() {
		this.s.resize();
		this.r.resize();
	}

	run() {
		new ROR(this.resize).on();
		this.raf.run();
	}

	on() {
		this.s.on();

		this.n.on();
	}

	off() {
		this.s.off();
		this.r.off();

		this.n.off();
	}

	loop() {
		this.n.loop();
	}
}
