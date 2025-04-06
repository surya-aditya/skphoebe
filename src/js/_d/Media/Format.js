import { isDef } from "../../utils/dom";
import V from "./Video/V";

export default class Format {
	constructor(config) {
		// Container
		this.c = config.c;

		// Source
		this.src = config.src;

		this.isR = isDef(this.src.portrait);

		this.v = new V(config.css);

		this.created = false;
	}

	/**
	 * Handles resizing and reloading of the media source based on the format
	 */
	resize() {
		var currentFormat = _A.format;

		if (this.format !== currentFormat) {
			this.format = currentFormat;
			let source = this.src;

			if (this.isR) source = this.src[this.format];

			const hasDash = isDef(source.dash);
			this.type = "mp4";

			if (hasDash) this.type = "dash";

			if (this.created) {
				if (this.isR) this.srcUp(source.url);
			} else {
				this.create(source.url);
			}
		}
	}

	/**
	 * Updates the media source
	 * @param {string} source - The media source URL
	 */
	srcUp(source) {
		if (this.type !== "dash") {
			this.v.src(source);
		}
		// else {
		// this.player.attachSource(source);
		// }

		if (this.v.isPlaying) {
			this.v.isPlaying = false;
			this.v.play();
		}
	}

	/**
	 * Creates the media player and initializes the source
	 * @param {string} source - The media source URL
	 */
	create(source) {
		this.created = true;

		if (this.type !== "dash") {
			this.srcUp(source);
			this.add();
		}
		// else {
		// 	this.add();
		// 	this.player = dashjs.MediaPlayer().create();
		// 	this.player.initialize(this.v.dom);
		// 	this.srcUp(source);
		// }
	}

	/**
	 * Adds the video element to the container
	 */
	add() {
		this.c.appendChild(this.v.dom);
	}

	/**
	 * Plays the video
	 */
	play() {
		this.v.play();
	}

	/**
	 * Pauses the video
	 */
	pause() {
		this.v.pause();
	}

	/**
	 * Destroys the video player and removes the video element from the container
	 */
	destroy() {
		this.v.dom.remove();
		// if (this.type === "dash") this.player.destroy();
	}
}
