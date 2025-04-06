import GLHome from "./gl";

export default class Home {
	constructor() {
		this.gl = new GLHome();
	}

	init() {
		const _app = _A;
		this.rqd = _app.is.ho;

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
