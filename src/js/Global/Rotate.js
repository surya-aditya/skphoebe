import ROR from "./RORunner";
import { BM, Cr } from "../utils/dom";

export default class Rotate {
	constructor() {
		this.inj = false;

		BM(this, ["resize"]);

		new ROR(this.resize).on();
		this.resize();
	}

	resize() {
		const isLandscape = _A.winRatio.wh > 1;

		if (isLandscape && !this.inj) {
			this.a();
		} else if (!isLandscape && this.inj) {
			this.r();
		}
	}

	a() {
		const body = document.body;

		this.ro = Cr("div");
		this.ro.className = "ro_";

		const messageElement = Cr("div");
		messageElement.className = "ro";
		messageElement.innerHTML = `Rotate your device`;

		this.ro.appendChild(messageElement);

		body.prepend(this.ro);

		this.inj = true;
	}

	r() {
		this.ro.parentNode.removeChild(this.ro);

		this.inj = false;
	}
}
