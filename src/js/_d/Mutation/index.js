// import Load from "./Load";

// import { Get, T, cssTr, isDef, isUnd } from "../../utils/dom";

export default class Mutation {
	constructor() {
		this.fx = new FxMutation();
	}

	out() {
		const _app = _A;
		const url = _app.route.new.url;
		const _rgl = _app.rgl;

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

		// if (isDef(_app.data.gl[url]) && isUnd(_rgl._[url])) {
		//   cssTr(Get.id("lo-pr"), 800, "0.53, 0.23, 0.25, 1")

		//   new Load(() => {
		//     _rgl.clear()
		//     _rgl.init()
		//     _e.init()
		//     this.fx.in()
		//   })
		// } else {
		//   _rgl.clear()
		//   _e.init()
		//   if (_app.isCo) _e.co.fx.sT()
		//   this.fx.in()
		// }
		this.fx.in();
	}
}
