import Timeline from "../../Motion/Timeline";
import { Get, Re, Cl, isUnd } from "../../utils/dom";
import { De } from "../../utils/math";
import SL from "../../utils/sline";

export default class FxScroll {
	initB(opt) {
		this.visible = [];
		this.trigger = [];
		this.limit = [];
		this.fx = [];
		this.first = true;

		const page = _A.e.p();

		this.de = opt.de;

		this.l = Get.cl("l", page);
		this.lL = this.l.length;

		this.y = Get.cl("t-y", page);
		this.yL = this.y.length;

		this.s = Get.cl("t-s", page);
		this.sL = this.s.length;

		this.sSL = [];
		for (let i = 0; i < this.sL; i++) {
			this.sSL[i] = new SL({ el: this.s[i] });
		}

		if (_A.intro) _A.intro = false;

		this.resizeB();
	}

	initA() {
		const _app = _A;
		this.url = _app.route.new.url;

		this.resizeA();
	}

	resizeB() {
		let index = -1 + this.yL + this.lL;

		for (let i = 0; i < this.sL; i++) {
			index++;

			let y = this.visible[i] ? 0 : 110;
			this.sSL[i].resize({
				tag: {
					start: `<div class="y_"><div class="y" style="transform: translate3d(0, ${y}%, 0);">`,
					end: "</div></div>",
				},
			});
		}
	}

	resizeA() {
		let index = -1;
		const tr = _A.t;
		let yDur = tr.y.s.d;
		const yEase = tr.y.s.e;

		for (let i = 0; i < this.yL; i++) {
			index++;

			if (!this.visible[index]) {
				this.trigger[index] = this.y[i];
				const calcData = this.calc(index, "t-y");

				let delay = 60;

				this.fx[index] = new Timeline();

				for (let j = 0; j < calcData._.domL; j++) {
					let de = j === 0 ? calcData.de : delay;

					if (j < calcData._.domL) {
						if (calcData._.dom[j].closest(".t-y").tagName === "H1") {
							yDur += 300;
						}

						this.fx[index].from({
							el: calcData._.dom[j],
							p: { y: [110, 0] },
							d: yDur,
							e: yEase,
							de,
						});
					}

					if (j < calcData.line.domL) {
						let p = { x: [-102, 0] };

						for (let li = 0; li < calcData.line.domL; li++) {
							const line = calcData.line.dom[li];

							this.fx[index].from({
								el: line.children[0],
								p,
								d: yDur,
								e: yEase,
								de: de + 300,
							});
						}
					}
				}
			}
		}

		if (this.first) {
			this.first = false;
			this.triggerL = index + 1;
			for (let i = 0; i < this.triggerL; i++) {
				if (isUnd(this.visible[i])) this.visible[i] = false;
			}
		}
	}

	loop() {
		if (this.triggerL !== 0 && !_A.mutating) {
			const currentScroll = _A.e.s._[this.url].cur;

			for (let i = 0; i < this.triggerL; i++) {
				if (currentScroll > this.limit[i] && !this.visible[i]) {
					this.visible[i] = true;
					this.fx[i].play();
				}
			}
		}
	}

	calc(index, className) {
		const isY = className === "t-y";
		const propClass = className === "t-o" ? "o" : "y";
		const _app = _A;
		const winH = _app.win.h;
		const trigger = this.trigger[index];
		const result = {
			_: {},
			lineS: {},
			line: {},
		};
		const regexPattern = "-[0-9]?[0-9]";
		const scroll = _app.e.s._[this.url].cur;

		const elTop = Re(trigger).top + scroll;

		const isViewport = elTop < winH;

		this.limit[index] = isViewport ? -1 : elTop - winH;

		let delay = 0;

		if (isViewport) delay = this.de;

		const regex = new RegExp(className + regexPattern);
		const match = trigger.className.match(regex);

		if (match) delay += 100 * match[0].substring(4);

		const complexRegex = new RegExp(className + regexPattern + regexPattern);
		const complexMatch = trigger.className.match(complexRegex);
		if (complexMatch) {
			const deVal = complexMatch[0].substring(4).split("-");
			delay += isViewport ? 100 * deVal[1] : 100 * deVal[0];
		}

		const elements = Cl.co(trigger, propClass)
			? [trigger]
			: Get.cl(propClass, trigger);

		result._ = { dom: elements, domL: elements.length };

		if (isY) {
			let lineElements = Get.cl("l", trigger);

			result.line = { dom: lineElements };

			result.lineS.domL = result.line.dom.length;
			result.line.domL = result.line.dom.length;
		}

		result.domL = result._.domL;
		if (isY) {
			result.domL = Math.max(
				result.line.domL,
				result._.domL,
				result.lineS.domL
			);
		}

		result.de = delay;
		result.vp = isViewport;

		return result;
	}
}
