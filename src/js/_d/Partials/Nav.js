import { BM, Cl, Ga, Get, L, Sa } from "../../utils/dom";

export default class Nav {
	constructor() {
		BM(this, ["fnTh"]);
	}

	intro() {
		this.th = Get.id("n2");
	}

	init() {}

	menuA() {
		const _app = _A;
		const route = _app.route.new.url;
		const menu = Get.id("n1");
		const menuChildren = Get.tag("a", menu);

		for (let i = 0; i < menuChildren.length; i++) {
			const anchor = menuChildren[i];
			const link = Ga(anchor, "href");
			const isMatch = link === route ? "a" : "r";
			Cl[isMatch](menu.children[i], "on");
		}
	}

	fnTh() {
		const currentTheme = localStorage.getItem("th");
		const th = currentTheme === "d" ? "l" : "d";

		localStorage.setItem("th", th);
		Sa(document.body, "data-th", th);
	}

	l(action) {
		L(this.th, action, "click", this.fnTh);
	}

	on() {
		this.l("a");
	}

	off() {
		this.l("r");
	}
}
