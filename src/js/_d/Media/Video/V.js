import { Cr, isDef } from "../../../utils/dom";

export default class V {
	constructor(config) {
		this.dom = Cr("video");

		this.dom.setAttribute("crossorigin", "anonymous");
		this.dom.setAttribute("preload", "metadata");
		this.dom.setAttribute("playsinline", "true");

		this.dom.muted = true;
		this.dom.loop = true;

		if (isDef(config)) {
			if (isDef(config.id)) {
				this.dom.id = config.id;
			}
			if (isDef(config.class)) {
				this.dom.className = config.class;
			}
		}

		this.isPlaying = false;
		this.pauseRqd = false;
		this.playScheduled = false;
	}

	src(source) {
		if (source) {
			this.dom.src = source;
		} else {
			console.log("No video source provided.", source);
		}
	}

	play() {
		this.pauseRqd = false;

		if (!this.isPlaying) {
			this.playPromise = this.dom.play();

			this.playPromise
				.then(() => {
					this.isPlaying = true;
					if (this.pauseRqd) this.pause();
				})
				.catch((error) => {
					this.play();
				});
		}
	}

	pause() {
		this.pauseRqd = true;

		if (this.isPlaying) {
			this.dom.pause();
			this.isPlaying = false;
		}
	}
}
