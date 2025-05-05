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
import FxScroll from "./Scroll/FxScroll";
import Nav from "./Partials/Nav";
import LoadInertia from "./LoadInertia";

function Page$1(suffix) {
	const elements = Get.cl("p" + (suffix || ""));
	return elements[elements.length - 1];
}

export default class Engine {
	constructor() {
		BM(this, ["resize", "loop"]);

		_A.t = {
			d: 300,
			o: { d: 300, e: "l" },
			i: { d: 300 },
		};

		_A.t.y = {
			h: { d: 600, e: "o1" },
			s: { d: 1300, e: "o6" },
		};

		this.p = Page$1;

		this.raf = new RafR(this.loop);

		this.s = new Scroll();
		this.c = new Cursor();

		this.r = new LoadInertia();

		this.n = new Nav();

		this.ho = new Home();
		this.ge = new General();
		this.pl = new Playground();
		this.wo = new Work();

		this._s = new FxScroll();
	}

	intro() {
		this.s.intro();

		this.n.intro();
	}

	init() {
		this._s.initB({ de: _A.t.d * 0.5 });

		this.s.init();
		this.i = new ScrollInertia();

		this.r.init();
		this.n.init();

		this._s.initA();
		this.ho.init();
		this.ge.init();
		this.pl.init();
		this.wo.init();

		this.loop();
	}

	resize() {
		this._s.resizeB();
		this.s.resize();
		this.i.resize();

		this.r.resize();

		this._s.resizeA();
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

		this.n.on();

		this.ho.on();
		this.ge.on();
		this.wo.on();
	}

	off() {
		this.s.off();

		this.r.off();
		this.n.off();

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

		this._s.loop();

		if (_A.e.s.rqd) this.i.run();
	}
}
