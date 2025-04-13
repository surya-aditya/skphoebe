import Motion from "../../../Motion";
import Page from "../../Page";
import { Get, Opacity, PE } from "../../../utils/dom";

export default class FxMutation {
	constructor() {
		this.t = Get.id("lo");
		this.bg = Get.id("lo-bg");
		const { d, e } = _A.t.o;

		console.log(t, this.bg);

		this.bgA = new Motion({ el: bg, p: { o: [0, 1] }, d, e });
	}

	out(opt) {
		const _app = _A;

		PE.a(this.t);

		const nav = Get.id("n");
		Opacity(nav, _app.is.wo ? 0 : 1);
		PE[_app.is.wo ? "n" : "a"](nav);

		this.bgA.play({ cb: opt.cb });
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
		cb();
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
