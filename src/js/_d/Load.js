import Img from "./Media/Img";

import { BM, Get, Has, T, cssTr, pad } from "../utils/dom";
import { default as RafR } from "../utils/rafr";
import { Lerp, R } from "../utils/math";
import Video from "./Media/Video";

export default class Load {
	constructor(callback) {
		this.cb = callback;

		const _app = _A;

		this.isTr = _app.route.old.url;
		this.isVi = _app.is.vi;

		this.dom_ = Get.id("lo-pr");
		this.dom = this.dom_.children[0];

		this.dom_.style.transition = "none";
		this.dom.style.transition = "none";

		T(this.dom_, 0, 0);
		T(this.dom, -110, 0);

		this.domStart = this.isTr ? -60 : -100;

		this.first = true;
		this.loading = false;
		this.no = 0;
		this.prevNo = 0;

		BM(this, ["loop"]);

		this.raf = new RafR(this.loop);
		this.raf.run();
	}

	/**
	 * Preloads necessary media assets based on the current route and configuration.
	 */
	preload() {
		const _app = _A;

		const route = _app.route;
		const newUrl = route.new.url;

		const renderer = _app.rgl;

		const gl = _app.data.gl;
		const keys = Object.keys(gl);
		const keysLength = keys.length;

		this.loading = true;
		this.texL = 0;

		if (this.isTr) {
			if (!this.isVi) {
				this._media({
					store: gl[newUrl].tex.store,
					url: newUrl,
					gl: true,
				});
			}
		} else {
			for (let i = 0; i < keysLength; i++) {
				const key = keys[i];
				const tex = gl[key].tex;

				if (!tex.preload && newUrl !== key) continue;

				this._media({
					store: tex.store,
					url: key,
					gl: true,
				});
			}
		}

		if (this.isTr) {
			const cacheMax = _app.data.gl.cache;
			let count = 0;

			const mediaKeys = Object.keys(renderer.media);

			for (let i = mediaKeys.length - 1; i >= 0; i--) {
				const key = mediaKeys[i];
				const tex = gl[key].tex;

				if (tex.delete) {
					count++;

					if (key !== newUrl && count > cacheMax) {
						const media = renderer.media[key];
						const mediaLayers = Object.keys(media);
						const layersLength = mediaLayers.length;

						for (let j = 0; j < layersLength; j++) {
							const layer = media[mediaLayers[j]];
							const layerLength = layer.length;

							for (let k = 0; k < layerLength; k++) {
								const data = layer[k].data;
								const dataLength = layer[k].layerL;

								for (let l = 0; l < dataLength; l++) {
									if (Has(data[l], "destroy")) {
										data[l].destroy();
									}
									renderer.gl.deleteTexture(layer[k].attrib[l]);
								}
							}
						}
						delete renderer.media[key];
						delete renderer._[key];
					}
				}
			}
		}
	}

	/**
	 * Loads media resources based on the provided configuration.
	 * @param {Object} config - Configuration for media loading.
	 */
	_media(config) {
		const rendererMedia = _A.rgl.media;

		const url = config.url;
		const store = config.store;
		const storeKeys = Object.keys(store);
		const storeLength = storeKeys.length;
		const useGL = config.gl;

		if (useGL) rendererMedia[url] = {};

		for (let i = 0; i < storeLength; i++) {
			const element = storeKeys[i];
			const layers = store[element];
			const layersLength = layers.length;

			if (useGL) rendererMedia[url][element] = [];

			for (let j = 0; j < layersLength; j++) {
				const layer = layers[j];

				const layerLength = layer.length;

				if (useGL) {
					rendererMedia[url][element][j] = {
						attrib: [],
						data: [],
						layerL: layerLength,
					};
				}

				for (let k = 0; k < layerLength; k++) {
					this.media({
						src: layer[k],
						url: url,
						element: element,
						index: j,
						layer: k,
						gl: useGL,
					});

					this.texL++;
				}
			}
		}
	}

	/**
	 * Loads a single media resource (image or video).
	 * @param {Object} config - Configuration for the media resource.
	 */
	media(config) {
		const src = config.src;
		const index = config.index;
		const layer = config.layer;
		const useGL = config.gl;

		let texture;
		const params = {
			gl: useGL,
			tex: useGL ? _A.rgl.media[config.url][config.element][index] : texture,
			layer: layer,
			src: src,
			cb: () => this.no++,
		};

		new (src.type === "img" ? Img : Video)(params);
	}

	/**
	 * Main loop to handle loading animations and state updates.
	 */
	loop() {
		const _app = _A;
		const { was, is } = _app;

		if (this.first) {
			this.first = false;

			if (this.isTr) {
				cssTr(this.dom, 3e3, ".25,1,.5,1");
				T(this.dom, this.domStart, 0);
			}
		}

		if (!this.loading) {
			if (this.isTr) {
				let canProceed = false;

				if (is.ho || is.pl) {
					canProceed = true;
				}

				if (canProceed) {
					cssTr(this.dom, 3500, "0.16, 1, 0.36, 1");
					this.preload();
				}
			} else {
				cssTr(this.dom, 3500, "0.16, 1, 0.36, 1");
				this.preload();
			}
		}

		if (this.no !== this.prevNo) {
			this.prevNo = this.no;
			const progress = this.no / this.texL;

			if (_app.intro || _app.mutating) {
				const progText = R(Lerp(0, 100, this.no / this.texL), 0);
				Get.id("lo-nu").textContent = pad(progText, 3);
			}

			T(this.dom, R(Lerp(this.domStart, 0, progress)), 0);
		}

		if (this.texL > 0 && this.no === this.texL) {
			T(this.dom_, 100.1, 0);
			cssTr(this.dom_, 1e3, ".76,0,.2,1");

			this.raf.stop();
			this.cb();
		}
	}
}
