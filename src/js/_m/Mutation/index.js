import { Opacity, PE } from "../../utils/dom";
import { De } from "../../utils/math";
import Page from "../Page";
import FxMutation from "./Fx/FxMutation";

export default class Mutation {
	constructor() {
		this.fx = new FxMutation();
	}

	out() {
		const _app = _A;
		const _e = _app.e;

		_e.off();

		this.fromMenu = _e.n.isOpen;

		if (this.fromMenu) {
			_app.page.update();
		} else {
			this.fx.out({
				d: 200,
				e: "l",
				cb: () => {
					_app.page.update();

					if (_app.is.ho || _app.is.ge || _app.is.pl) {
						Opacity(_app.e.n.n, 1);
						PE.a(_app.e.n.n);
					} else {
						Opacity(_app.e.n.n, 0);
						PE.n(_app.e.n.n);
					}
				},
			});
		}
	}

	in() {
		const _app = _A;
		const _e = _app.e;
		const d = 300;

		_app.page.removeOld();
		_app.page.insertNew();

		scrollTo(0, 0);

		_e.init();

		if (this.fromMenu) _e.n.fn();
		if (!this.fromMenu) this.fx.in({ d, e: "l" });

		this.cb();
	}

	cb() {
		const _app = _A;
		const _e = _app.e;
		const d = 300;

		new Page({ intro: false }).play();
		new De(() => _e.r.run(), 1).run();

		new De(() => {
			_e.on();
			_app.mutating = false;
		}, d).run();
	}
}
