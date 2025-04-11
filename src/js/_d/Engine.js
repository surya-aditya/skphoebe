import ROR from "../Global/RORunner";

import Cursor from "./Cursor";
import Scroll from "./Scroll";

import General from "./Pages/General";
import Home from "./Pages/Home";
import Playground from "./Pages/Playground";

import { BM, Get } from "../utils/dom";
import { default as RafR } from "../utils/rafr";
import ScrollInertia from "./Scroll/ScrollInertia";
import Work from "./Pages/Work";

function Page$1(suffix) {
	const elements = Get.cl("p" + (suffix || ""));
	return elements[elements.length - 1];
}

export default class Engine {
	constructor() {
		BM(this, ["resize", "loop"]);

		_A.tr = {
			d: 1e3,
			o: { d: 300, e: "l" },
			y: { d: 1500, e: "o6" },
			i: { d: 300 },
		};

		this.raf = new RafR(this.loop);

		this.p = Page$1;

		this.s = new Scroll();
		this.c = new Cursor();

		this.ho = new Home();
		this.ge = new General();
		this.pl = new Playground();
		this.wo = new Work();
	}

	intro() {
		this.s.intro();
	}

	init() {
		this.s.init();
		this.i = new ScrollInertia();

		this.ho.init();
		this.ge.init();
		this.pl.init();
		this.wo.init();

		this.loop();
	}

	resize() {
		this.s.resize();
		this.i.resize();

		this.ho.resize();
		this.ge.resize();
		this.pl.resize();
		this.wo.resize();
	}

	run() {
		new ROR(this.resize).on();
		this.raf.run();
		this.c.run();
	}

	on() {
		this.s.on();

		this.ho.on();
		this.ge.on();
		this.wo.on();
	}

	off() {
		this.s.off();

		this.ho.off();
		this.ge.off();
		this.wo.off();
	}

	loop() {
		this.s.loop();

		this.ho.loop();
		this.ge.loop();
		this.pl.loop();
		this.wo.loop();

		if (_A.e.s.rqd) this.i.run();
	}
}
