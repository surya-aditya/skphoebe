import Motion from "../../Motion";
import Anima from "../../Motion/Anima";
import { BM, Cl, Ga, Get, GetSe, L, PE, Sa, T } from "../../utils/dom";

import { SvgShapeL } from "../../utils/svg";

export default class Nav {
	constructor() {
		BM(this, ["fn", "fnTh"]);
	}

	intro() {
		this.isOpen = false;
		this.body = document.body;

		this.n = Get.id("n");
		this.nm = Get.id("n-m");
		this.th = Get.id("n2");
		this.cta = Get.id("n1");

		this.ctaC = GetSe("#n1>div>div");

		this.logo = Get.id("logo");
		this.c0 = Get.id("c0");
		this.c1 = Get.id("c1");

		this.ny = Get.cl("y_");

		this.nA = new Anima({
			ch: 1,
			el: this.ny,
			p: [["y", 101, -101]],
			de: 0.03,
		});

		const bg = Get.id("n-bg");
		this.bgA = new Motion({
			el: bg,
			p: { o: [0, 1] },
			d: 300,
			e: "o1",
		});

		const length0 = SvgShapeL(this.c0);
		const length1 = SvgShapeL(this.c1);

		Get.id("n0").children[0].children[1].children[0].style.strokeDashoffset =
			length0;
		Get.id("n0").children[0].children[1].children[1].style.strokeDashoffset =
			length1;

		this.lA = new Motion({
			el: Get.id("n0").children[0].children[0],
			p: { o: [0, 1] },
		});

		this.c0Fx = new Motion({
			el: Get.id("n0").children[0].children[1].children[0],
			line: { start: 0, end: 100 },
		});

		this.c1Fx = new Motion({
			el: Get.id("n0").children[0].children[1].children[1],
			line: { start: 0, end: 100 },
		});
	}

	init() {
		const _app = _A;
		const route = _app.route.new.url;
		const menu = Get.id("n-li").children;

		for (let i = 0; i < menu.length; i++) {
			const anchor = menu[i];

			if (anchor.tagName === "A") {
				const link = Ga(anchor, "href");
				link === route ? Cl.a(anchor, "on") : Cl.r(anchor, "on");

				if (link === route) {
					Get.id("n1-cur").textContent = anchor.textContent;
				}
			}
		}
	}

	show() {
		return {
			play: (_) => {
				Cl.a(this.cta.children[1], "on");
				Cl.a(Get.id("n1-br-l"), "on");
				Cl.a(Get.id("n1-br-r"), "on");

				this.lA.play({ d: 300, de: 1e3 });
				this.c0Fx.play({ d: 1600, e: "io6" });
				this.c1Fx.play({ d: 1600, e: "io6" });
			},
		};
	}

	hide() {
		return {
			play: (_) => {
				Cl.r(this.cta.children[1], "on");
				Cl.r(Get.id("n1-br-l"), "on");
				Cl.r(Get.id("n1-br-r"), "on");

				this.lA.play({ reverse: true, d: 0 });
				this.c0Fx.play({ reverse: true, d: 0 });
				this.c1Fx.play({ reverse: true, d: 0 });
			},
		};
	}

	fn() {
		this.isOpen = !this.isOpen;

		const action = this.isOpen ? "show" : "hide";
		const d = this.isOpen ? 1200 : 400;
		const e = this.isOpen ? "o6" : "o3";
		const pointerEvents = this.isOpen ? "a" : "n";
		const classAction = this.isOpen ? "a" : "r";

		let isReverse = false;
		if (!this.isOpen) {
			isReverse = { reverse: true };
		}

		this.nA.motion({ action, d, e }).play();

		PE[pointerEvents](this.nm);
		Cl[classAction](this.body, "_ns");
		Cl[classAction](this.ctaC, "on");

		Cl[!this.isOpen ? "a" : "r"](Get.id("n2"), "h");

		this.bgA.play(isReverse);
	}

	fnTh() {
		const currentTheme = localStorage.getItem("th");
		const th = currentTheme === "d" ? "l" : "d";

		localStorage.setItem("th", th);
		Sa(document.body, "data-th", th);
	}

	l(action) {
		L(this.cta, action, "click", this.fn);
		L(this.th, action, "click", this.fnTh);
	}

	on() {
		this.l("a");
	}

	off() {
		this.l("r");
	}

	loop() {
		const scroll = _A.e.s._;
		scroll > 10 ? Cl.a(this.n, "iss") : Cl.r(this.n, "iss");
	}
}
