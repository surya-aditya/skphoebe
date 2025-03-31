import Motion from "./index";
import ObjArr from "./ObjArr";

import { Ease } from "../utils/easings";
import { isDef, isUnd } from "../utils/dom";

export default class Anima {
	constructor(options) {
		this.a = _A;
		this.de = options.de || 0;

		const lineStartTogether = options.lineStartTogether || false;
		const ch = options.ch;
		const random = options.random || false;
		const prop = options.p;

		let elements = options.el;

		if (isUnd(elements.length)) elements = [elements];

		this.lineL = elements.length;

		this.start = prop[0][1];
		this.objL = this.lineL;

		const children = elements[0].children;

		if (ch > 0 && this.lineL === 1 && children.length > 1)
			this.objL = children.length;

		this.line = [];
		let indexStart = 0;

		for (let i = 0; i < this.lineL; i++) {
			const el = ch === 0 ? [elements[i]] : elements[i].children;

			this.line[i] = new ObjArr({
				length: this.lineL,
				objL: this.objL,
				indexStart,
				ch,
				el,
				prop,
				de: this.de,
				rand: random,
			});

			if (!lineStartTogether) indexStart += this.line[i].objL;
		}
	}

	motion(options) {
		if (isDef(this.anim)) this.anim.pause();

		const isShow = options.action === "show";
		const duration = options.d;
		const easing = Ease[options.e];
		const lines = this.line;
		const lineLength = this.lineL;
		const current = lines[0].obj[0].curr[0];

		let propEndIsEnd = false;
		let de = options.de;

		if (!isShow) {
			propEndIsEnd =
				(this.start < 0 && current > 0) ||
				(this.start > 0 && current < 0) ||
				Math.abs(current) < Math.abs(0.3 * this.start);
		}

		if (isShow && this.isRunning) de = 0;

		for (let i = 0; i < lineLength; i++) {
			lines[i].prepare({
				isShow,
				isRunning: this.isRunning,
				propEndIsEnd,
			});
		}

		const durationFactor =
			duration / (isShow ? 1 - (this.objL - 1) * this.de : 1);

		this.anim = new Motion({
			de: de,
			d: durationFactor,
			u: (updateObj) => {
				for (let pr = updateObj.pr, i = 0; i < lineLength; i++) {
					lines[i].loop({
						pr,
						rEase: easing,
					});
				}
			},
			cb: () => {
				this.isRunning = false;
			},
		});

		return {
			play: () => {
				this.isRunning = true;
				this.anim.play();
			},
		};
	}
}
