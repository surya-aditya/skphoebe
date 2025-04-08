import GLGeneral from "./gl";

export default class General {
	constructor() {
		this.gl = new GLGeneral();
	}

	init() {
		const _app = _A;
		this.rqd = _app.is.ge;

		if (this.rqd) {
			this.gl.init();
		}
	}

	resize() {
		if (this.rqd) this.gl.resize();
	}

	on() {
		if (this.rqd) this.gl.on();
	}

	off() {
		if (this.rqd) this.gl.off();
	}

	loop() {
		if (this.rqd) this.gl.loop();
	}
}
