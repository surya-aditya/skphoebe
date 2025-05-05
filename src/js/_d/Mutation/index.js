import Load from "../Load";
import FxMutation from "./Fx/FxMutation";

import { isDef, isUnd } from "../../utils/dom";
import { De } from "../../utils/math";

export default class Mutation {
	constructor() {
		this.fx = new FxMutation();
	}

	out() {
		const _app = _A;

		_app.e.off();
		_app.page.update();
		_app.e.n.menuA();
	}

	in() {
		const _app = _A;
		const { is, was, rgl, e } = _app;
		const url = _app.route.new.url;

		const isWo = is.wo && was.wo && _app.target !== "back";
		const outType = isWo ? "outWo" : "out";
		const inType = isWo ? "inWo" : "in";

		this.$1 = this.fx[outType];
		this.$2 = this.fx[inType];

		if (isDef(_app.data.gl[url]) && isUnd(rgl._[url])) {
			new Load(() => {
				this.$1(() => {
					_app.page.insertNew();
					_app.page.removeOld();

					rgl.init();
					e.init();

					if (is.wo || is.pl) new De(() => e.r.run(), 1).run();

					this.$2();
				});
			});
		} else {
			this.$1(() => {
				_app.page.insertNew();
				_app.page.removeOld();

				e.init();

				if (is.wo || is.pl) new De(() => e.r.run(), 1).run();

				this.$2();
			});
		}
	}
}
