import GLPlayground from "./gl";

export default class Playground {
	constructor() {
		this.gl = new GLPlayground();
	}

	init() {
		const _app = _A;
		this.rqd = _app.is.pl;

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
