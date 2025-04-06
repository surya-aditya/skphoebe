import ResourceGL from "../GL/ResourceGL";
import Load from "../Load";
import FxIntro from "./Fx/FxIntro";

export default class Intro {
	constructor(cb) {
		const _app = _A;

		cb(() => {
			_app.rgl = new ResourceGL();
			new Load(() => this.cb());
			_app.rgl.load();
		});
	}

	cb() {
		const _app = _A;
		const _rgl = _app.rgl;
		const _e = _app.e;

		_rgl.intro();
		_e.intro();
		_rgl.init();
		_e.init();
		_rgl.run();
		_e.run();

		new FxIntro();
	}
}
