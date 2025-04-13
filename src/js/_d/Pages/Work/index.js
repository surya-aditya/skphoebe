import FxFooter from "./Fx/FxFooter";
import FxPreview from "./Fx/FxPreview";
import FxWork from "./Fx/FxWork";
import GLWork from "./gl";

export default class Work {
	constructor() {
		this.gl = new GLWork();
		this.fx = new FxWork();
		this.fxF = new FxFooter();
		this.fxPr = new FxPreview();
	}

	init() {
		const _app = _A;
		this.rqd = _app.is.wo;

		if (this.rqd) {
			this.fxF.init();
			this.gl.init();
			this.fxPr.init();
		}
	}

	resize() {
		if (this.rqd) {
			this.fxF.resize();
			this.gl.resize();
			this.fxPr.resize();
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
			this.fxPr.loop();
		}
	}
}
