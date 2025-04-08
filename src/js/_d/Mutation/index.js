import Load from "../Load";
import FxMutation from "./Fx/FxMutation";

import { isDef, isUnd } from "../../utils/dom";

export default class Mutation {
	constructor() {
		this.fx = new FxMutation();
	}

	out() {
		const _app = _A;

		_app.e.off();
		this.fx.out({ cb: () => _app.page.update() });
	}

	in() {
		const _app = _A;
		const _rgl = _app.rgl;
		const _e = _app.e;
		const url = _app.route.new.url;

		_app.page.insertNew();
		_app.page.removeOld();

		if (isDef(_app.data.gl[url]) && isUnd(_rgl._[url])) {
			new Load(() => {
				_rgl.clear();
				_rgl.init();
				_e.init();
				this.fx.in();
			});
		} else {
			_rgl.clear();
			_e.init();
			this.fx.in();
		}
	}
}
