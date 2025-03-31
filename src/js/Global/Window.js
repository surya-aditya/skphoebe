import ROR from "./RORunner";

import { BM } from "../utils/dom";

export default class Window {
	constructor(device) {
		this.d = device;
		const _app = _A;

		_app.win = {
			w: 0,
			h: 0,
		};

		_app.config.dim = {
			d: [1440, 900],
			m: [393, 856],
		};

		BM(this, ["resize"]);

		new ROR(this.resize).on();

		this.resize();
	}

	resize() {
		const _app = _A;
		const screenWidth = innerWidth;
		const screenHeight = innerHeight;

		_app.win = {
			w: screenWidth,
			h: screenHeight,
		};

		_app.winSemi = {
			w: 0.5 * screenWidth,
			h: 0.5 * screenHeight,
		};

		_app.winRatio = {
			wh: screenWidth / screenHeight,
			hw: screenHeight / screenWidth,
		};
		_app.isLandscape = 1 < _app.winRatio.wh;
		_app.format = _app.isLandscape ? "l" : "p";

		const config = _app.config.dim[this.d];

		_app.dim = {
			h: config[1],
			w: config[0],
		};

		// Scale Factor
		_app.winWSF = screenWidth / _app.dim.w;
		_app.winHSF = screenHeight / _app.dim.h;
	}
}
