import { BM, PD, Snif, L } from "../../utils/dom";

export default class VirtualScroll_ {
	constructor() {
		this._ = []; // Stores handlers
		this.l = 0; // Length of handlers
		this.t = false; // Flag to check if currently processing
		this.ff = Snif.isFF; // Check if the browser is Firefox
		BM(this, ["fn"]); // Bind method 'fn' to 'this'

		// Listen to wheel and keydown events
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
		const arrow = "Arrow";
		const isArrowUpLeft = key === arrow + "Up" || key === arrow + "Left";
		const isSpace = " " === key;

		if (
			isArrowUpLeft ||
			key === arrow + "Down" ||
			key === arrow + "Right" ||
			isSpace
		) {
			let scrollAmount = 100;
			if (isArrowUpLeft) {
				scrollAmount *= -1;
			} else if (isSpace) {
				scrollAmount = this.e.shiftKey ? -1 : 1;
				scrollAmount *= _A.win.h - 40;
			}
			this.s = scrollAmount;
			this.cb("k");
		} else {
			this.t = false;
		}
	}

	// Callback to handle the result of input
	cb(type) {
		let index = this.l;

		while (index--) {
			const handler = this._[index];
			if (type !== "w" && !handler.k) continue;
			handler.cb(this.s);
		}

		this.t = false;
	}
}
