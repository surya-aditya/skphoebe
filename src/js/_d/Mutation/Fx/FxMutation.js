import Motion from "../../../Motion";
import Page from "../../Page";
import { Get, Opacity, PE } from "../../../utils/dom";

export default class FxMutation {
	constructor() {
		const t = (this.t = Get.id("lo-bg"));
		const { d, e } = _A.tr.o;

		this.tA = new Motion({ el: t, p: { o: [0, 1] }, d, e });
	}

	out(options) {
		PE.a(this.t);

		const nav = Get.id("n");
		Opacity(nav, _A.is.wo ? 0 : 1);
		PE[_A.is.wo ? "n" : "a"](nav);

		this.tA.play({ cb: options.cb });
	}

	in() {
		const _app = _A;
		const _act = _app.rgl.act;

		_act.mutation();
		new Page({ intro: false }).play();

		this.tA.play({
			reverse: true,
			cb: () => {
				_act.static();
				PE.n(this.t);
			},
		});
	}
}
