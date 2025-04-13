import Motion from "../../../../Motion";
import { Get } from "../../../../utils/dom";

export default class FxFooter {
	init() {
		const page = _A.e.p();
		this.p = Get.cl("wo-p", page)[0];
		this.f = Get.cl("f-y", page)[0].children[0];

		const p = { y: [0, -110] };
		const d = 700;
		const e = "i3";

		this.pA = new Motion({ el: this.p, p, d, e });
		this.fA = [];
		for (let i = 0; i < this.f.length; i++) {
			this.fA[i] = new Motion({ el: this.f[i], p, d, e });
		}
	}

	show() {
		this.pA.play();
		for (let i = 0; i < this.fA.length; i++) {
			this.fA[i].play();
		}
	}

	hide() {
		this.pA.play({ reverse: true });
		for (let i = 0; i < this.fA.length; i++) {
			this.fA[i].play({ reverse: true });
		}
	}
}
