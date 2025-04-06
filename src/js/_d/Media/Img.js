import Texture from "../GL/Core/Texture";

import ROR from "../../Global/RORunner";
import { BM, Get, isDef, isStr } from "../../utils/dom";

export default class Img {
	constructor(options) {
		this.o = options;
		this.src = options.src.url;

		this.hasFormat = !isStr(this.src);
		this.format = "";
		this.first = true;

		if (this.hasFormat) {
			BM(this, ["resize"]);
			this.ro = new ROR(this.resize);
			this.ro.on();
		}

		// Initial resize call
		this.resize();
	}

	/**
	 * Handles the resizing and reloading of the image based on the format
	 */
	resize() {
		const options = this.o;
		const gl = options.gl;
		const tex = options.tex;
		const layer = options.layer;
		const callback = options.cb;

		// Check if the format has changed
		if (_A.format !== this.format) {
			this.format = _A.format;
			const src = this.hasFormat ? this.src[this.format] : this.src;

			// Create a new Image object and set its properties
			const image = new Image();

			image.onload = () => {
				if (gl) {
					if (layer === 0) {
						tex.wh = image.width / image.height;
					}
					tex.data[layer] = {
						v: false,
						element: image,
					};

					if (isDef(tex.attrib[layer])) {
						gl.deleteTexture(tex.attrib[layer]);
					}

					tex.attrib[layer] = new Texture({ obj: image });
				}

				if (this.first) {
					this.first = false;

					callback();
				}
			};

			image.crossOrigin = "anonymous";
			image.src = src;
		}
	}
}
