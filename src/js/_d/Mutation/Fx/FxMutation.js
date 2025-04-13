import Motion from "../../../Motion";
import Page from "../../Page";
import { BM, Get, Opacity, PE } from "../../../utils/dom";

export default class FxMutation {
	constructor() {
		const { d, e } = _A.t.o;

		BM(this, ["out", "in"]);
		this.t = Get.id("lo");
		const bg = Get.id("lo-bg");

		this.bgA = new Motion({ el: bg, p: { o: [0, 1] }, d, e });
	}

	out(cb) {
		const _app = _A;

		PE.a(this.t);

		const nav = Get.id("n");
		Opacity(nav, _app.is.wo ? 0 : 1);
		PE[_app.is.wo ? "n" : "a"](nav);

		this.bgA.play({ cb });
	}

	in() {
		const _app = _A;
		const _act = _app.rgl.act;

		_act.mutation();
		new Page({ intro: false }).play();

		this.bgA.play({
			reverse: true,
			cb: () => {
				_act.static();
				PE.n(this.t);
			},
		});
	}

	outWo(cb) {
		_A.e.wo.fxF.hide({ d: 300, de: "o1", cb });
	}

	inWo() {
		const _app = _A;
		const rgl = _app.rgl;
		const act = rgl.act;

		act.mutation();
		act.static();

		new Page({ intro: false }).play();
	}
}
