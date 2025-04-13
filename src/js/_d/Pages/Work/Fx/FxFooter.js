import Motion from "../../../../Motion";
import { Get } from "../../../../utils/dom";
import { De } from "../../../../utils/math";
import SL from "../../../../utils/sline";

export default class FxFooter {
	init() {
		this.ti = Get.cl("wo-f-de-ti", _A.e.p())[0];
		this.tiSL = new SL({ el: this.ti });

		this.resize();
	}

	resize() {
		this.tiSL.resize({
			tag: {
				start: `<span class="f-y_"><span class="f-y">`,
				end: "</span></span>",
			},
		});
	}

	hide(opt) {
		const page = _A.e.p();
		const foo = Get.cl("f-y", page);
		const fooL = foo.length;

		for (let i = 0; i < fooL; i++) {
			new Motion({
				el: foo[i],
				p: { y: [0, -110] },
				d: opt.d,
				e: opt.e,
				de: i * 60,
			}).play();
		}

		new De(() => {
			opt.cb();
		}, (fooL - 1) * 60 + 700).run();
	}
}
