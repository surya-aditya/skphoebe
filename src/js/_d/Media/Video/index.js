import Instance from "./Instance";
import Texture from "../../GL/Core/Texture";

import { Get, L } from "../../../utils/dom";

export default class Video {
	constructor(options) {
		const source = options.src;

		const gl = options.gl;
		const tex = options.tex;
		const callback = options.cb;
		const layer = options.layer;

		const container = Get.id("_v");

		const videoInstance = new Instance();

		videoInstance.init({
			c: container,
			src: source,
			css: {
				id: source.id,
				class: "tex",
			},
		});

		const element = videoInstance.f.v;
		const elDom = element.dom;

		let isPlaying = false;
		let hasTimeUpdated = false;

		const updateState = () => {
			if (isPlaying && hasTimeUpdated) {
				if (gl) {
					if (layer === 0) {
						tex.wh = elDom.videoWidth / elDom.videoHeight;

						tex.data[layer] = {
							v: true,
							element,
						};
					}

					tex.attrib[layer] = new Texture({ obj: elDom });
					tex.destroy = () => videoInstance.destroy();
				}

				callback();

				videoInstance.pause();
			}
		};

		const onPlaying = () => {
			isPlaying = true;

			playing("r");
			updateState();
		};

		const onTimeUpdate = () => {
			hasTimeUpdated = true;

			timeUpdate("r");
			updateState();
		};

		const playing = (action) => {
			L(elDom, action, "playing", onPlaying);
		};

		const timeUpdate = (action) => {
			L(elDom, action, "timeupdate", onTimeUpdate);
		};

		playing("a");
		timeUpdate("a");

		videoInstance.play();
	}
}
