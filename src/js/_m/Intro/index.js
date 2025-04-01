// import Load from "../Load";

export default class Intro {
	constructor(cb) {
		cb(() => {
			// new Load(() => this.cb());
			this.cb();
		});
	}

	cb() {
		const _app = _A;
		const _e = _app.e;

		_e.intro();
		_e.init();
		_e.run();
	}
}
