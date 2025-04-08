import FxPreview from "./Fx/FxPreview";
import GLWork from "./gl";

export default class Work {
	constructor() {
		this.gl = new GLWork();
		this.pr = new FxPreview();
	}

	init() {
		const _app = _A;
		this.rqd = _app.is.wo;

		if (this.rqd) {
			this.gl.init();
			this.pr.init();
		}
	}

	resize() {
		if (this.rqd) {
			this.gl.resize();
			this.pr.resize();
		}
	}

	on() {
		// if (this.rqd) this.gl.on();
	}

	off() {
		// if (this.rqd) this.gl.off();
	}

	loop() {
		if (this.rqd) {
			this.gl.loop();
			this.pr.loop();
		}
	}
}
