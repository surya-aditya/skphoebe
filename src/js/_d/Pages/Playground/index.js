import FxCursor from "./Fx/FxCursor";
import FxFullscreen from "./Fx/FxFullscreen";
import FxThumbnail from "./Fx/FxThumbnail";
import GLPlayground from "./gl";

export default class Playground {
	constructor() {
		this.gl = new GLPlayground();
		this.fx$1 = new FxThumbnail();
		this.fx$2 = new FxFullscreen();
		this.fx$3 = new FxCursor();
	}

	init() {
		const _app = _A;
		this.rqd = _app.is.pl;

		if (this.rqd) {
			this.gl.init();
			this.fx$1.init();
			this.fx$2.init();
			this.fx$3.init();
		}
	}

	resize() {
		if (this.rqd) {
			this.gl.resize();
			this.fx$2.resize();
			this.fx$3.resize();
		}
	}

	on() {
		if (this.rqd) {
			this.gl.on();
			this.fx$1.on();
			this.fx$2.on();
		}
	}

	off() {
		if (this.rqd) {
			this.gl.off();
			this.fx$1.off();
			this.fx$2.off();
		}
	}

	loop() {
		if (this.rqd) {
			this.gl.loop();
			this.fx$2.loop();
			this.fx$3.loop();
		}
	}
}
