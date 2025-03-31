import { BM, isDef } from "./dom";

const FRAME_RATE = 1e3 / 60;
export let RELATIVE_DELTA = 0;

let currentRafId = 0;

class VisibilityManager {
	constructor() {
		this._ = [];
		this.pause = 0;
		BM(this, ["v"]);
		document.addEventListener("visibilitychange", this.v);
	}

	// Add Subscriber
	add(subscriber) {
		this._.push(subscriber);
	}

	// Visibility Change
	v() {
		const now = performance.now();
		const isVisible = document.visibilityState === "visible";
		const mode = isVisible ? "start" : "stop";
		let elapsed;

		if (!isVisible) {
			this.pause = now;
		} else {
			elapsed = now - this.pause;
		}

		this._.forEach((subscriber) => subscriber[mode](elapsed));
	}
}

export const TabManager = new VisibilityManager();

class AnimationFrameManager {
	constructor() {
		this._ = [];
		this.play = true;
		BM(this, ["loop", "off", "on"]);
		TabManager.add({
			stop: this.off,
			start: this.on,
		});
		this.raf();
	}

	// Tab Off
	off() {
		this.play = false;
	}

	// Tab on
	on(elapsedTime) {
		this._.forEach((task) => (task.sT += elapsedTime));
		this.play = true;
	}

	// Add Task
	a(task) {
		this._.push(task);
	}

	// Remove Task
	r(taskId) {
		this._ = this._.filter((task) => task.id !== taskId);
	}

	// Update RAF
	loop(timestamp) {
		if (this.play) {
			this.t = this.t || timestamp;
			RELATIVE_DELTA = (timestamp - this.t) / FRAME_RATE;
			this.t = timestamp;
			this._.forEach((task) => {
				if (isDef(task) && (task.sT || (task.sT = timestamp))) {
					const elapsed = timestamp - task.sT;
					task.cb(elapsed);
				}
			});
		}
		this.raf();
	}

	raf() {
		requestAnimationFrame(this.loop);
	}
}

export const RAF = new AnimationFrameManager();

export default class RafRunner {
	constructor(callback) {
		this.cb = callback;
		this.on = false;
		this.id = currentRafId;

		currentRafId++;
	}

	run() {
		if (!this.on) {
			RAF.a({
				id: this.id,
				cb: this.cb,
				sT: performance.now(),
			});
			this.on = true;
		}
	}

	stop() {
		if (this.on) {
			RAF.r(this.id);
			this.on = false;
		}
	}
}
