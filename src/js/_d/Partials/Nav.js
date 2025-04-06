import { Sa } from "../../utils/dom";

export default class Nav {
	constructor() {
		BM(this, ["fn", "fnTh"]);
	}

	intro() {
		this.th = Get.id("n2");
	}

	init() {}

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
