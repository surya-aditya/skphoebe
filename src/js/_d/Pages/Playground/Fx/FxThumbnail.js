import { BM, Get, IndexList, L } from "../../../../utils/dom";

export default class FxThumbnail {
	constructor() {
		BM(this, ["fn"]);
	}

	init() {
		this.li = Get.cl("pl-li");
		this.liL = this.li.length;

		this.isShow = false;
	}

	fn(event) {
		this.isShow = !this.isShow;

		const _app = _A;
		const target = event.target;
		const index = IndexList(target);
		const fullscreen = _app.e.pl.fx$2;

		const action = target.id === "pl-p-cl" ? "hide" : "show";

		fullscreen.fx({ a: action, index });
	}

	l(action) {
		for (let i = 0; i < this.liL; i++) {
			L(this.li[i], action, "click", this.fn);
		}
		L(Get.id("pl-p-cl"), action, "click", this.fn);
	}

	on() {
		this.l("a");
	}

	off() {
		this.l("r");
	}
}
