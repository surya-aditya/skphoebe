import { BM, Snif, L, PD } from "../../utils/dom";

export default class VirtualScroll_ {
	constructor() {
		this._ = [];
		this.l = 0;
		this.t = false;
		this.ff = Snif.isFF;
		BM(this, ["fn"]);

		const doc = document;
		L(doc.body, "a", "wheel", this.fn);
		L(doc, "a", "keydown", this.fn);
	}

	// Add an event handler
	a(handler) {
		this._.push(handler);
		this.l++;
	}

	// Remove an event handler by id
	r(id) {
		let index = this.l;

		while (index--) {
			if (this._[index].id === id) {
				this._.splice(index, 1);
				this.l--;
				return;
			}
		}
	}

	// Function to handle events
	fn(event) {
		this.e = event;
		this.eT = event.type;
		this.eK = event.key;

		// If handlers are present and not currently processing, begin processing
		if (this.l > 0 && !this.t) {
			this.t = true;
			this.run();
		}
	}

	// Decide whether to process wheel or keyboard input
	run() {
		if ("wheel" === this.eT) {
			this.w();
		} else if ("keydown" === this.eT) {
			this.k();
		}
	}

	// Handle wheel event
	w() {
		const event = this.e;

		const deltaY = event.wheelDeltaY;
		const scale = this.ff && event.deltaMode === 1 ? 0.833333 : 0.555556;

		this.s = -deltaY * scale;
		this.cb("w");
	}

	// Handle keyboard event
	k() {
		const key = this.eK;
		const isUpOrLeft = key === "ArrowUp" || key === "ArrowLeft";
		const isDownOrRight = key === "ArrowDown" || key === "ArrowRight";
		const isSpace = key === " ";

		if (isUpOrLeft || isDownOrRight || isSpace) {
			let value = 100;

			if (isUpOrLeft) {
				value *= -1;
			} else if (isSpace) {
				const dir = this.e.shiftKey ? -1 : 1;
				value = (_A.win.h - 40) * dir;
			}

			this.s = value;
			this.cb("k");
		} else {
			this.t = false;
		}
	}

	// Callback to handle the result of input
	cb(type) {
		let i = this.l;

		while (i--) {
			const listener = this._[i];
			if (type === "w" || listener.k) {
				listener.cb(this.s);
			}
		}

		this.t = false;
	}
}
