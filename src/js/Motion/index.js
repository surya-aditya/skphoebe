import { default as RafR } from "../utils/rafr";

import { BM, Has, Ga, Sa, Select, isDef, isStr, isUnd } from "../utils/dom";
import { R, De, Lerp, Clamp } from "../utils/math";
import { SvgShapeL, SvgSplit } from "../utils/svg";

import { Ease, CubicBezierEase } from "../utils/easings";

export default class Motion {
	constructor(options) {
		BM(this, ["loop", "run", "uS", "uL", "uP"]);

		this.v = this.init(options);
		this.r = new RafR(this.run);
	}

	init(options) {
		const obj = {
			el: Select.el(options.el),
			e: {
				// easing
				curve: options.e || "l",
			},
			d: {
				//duration
				origin: options.d || 0,
				curr: 0,
			},
			de: options.de || 0,
			cb: options.cb || false, // callback
			r: options.r || 2, // round off
			pr: 0, // progress
			prE: 0, // progress eased
			elapsed: 0,
		};

		obj.elL = obj.el.length;

		if (Has(options, "u")) {
			obj.up = (_) => options.u(obj);
		} else if (Has(options, "svg")) {
			obj.up = this.uS;
		} else if (Has(options, "line")) {
			obj.up = this.uL;
		} else {
			obj.up = this.uP;
		}

		const { p = false, svg = false, line = false } = options;

		if (p) {
			obj.prop = {};
			obj.propI = [];
			obj.propL = Object.keys(p).length;

			Object.entries(p).forEach(
				([keyName, [start, end, unit = "%"]], index) => {
					const isRadial = keyName.charAt(0) === "r";
					const adjustedKey = isRadial ? "r2" : keyName; // Applying the original condition

					obj.prop[index] = {
						name: keyName,
						origin: { start, end },
						curr: start,
						start,
						end,
						unit,
					};

					obj.propI[adjustedKey] = index;
				}
			);
		} else if (svg) {
			const { type, start: initialStart, end } = svg;
			const attr = type === "polygon" ? "points" : "d";
			const element = obj.el[0];
			const start = initialStart || Ga(element, attr);

			const originArrStart = SvgSplit(start);
			const originArrEnd = SvgSplit(end);

			obj.svg = {
				type,
				attr,
				end,
				start,
				curr: start,
				originArr: {
					start: originArrStart,
					end: originArrEnd,
				},
				arr: {
					start: originArrStart,
					end: originArrEnd,
				},
				arrL: originArrStart.length,
				val: [],
			};
		} else if (line) {
			const coeffS = isDef(line.start) ? (100 - line.start) / 100 : 1;
			const coeffE = isDef(line.end) ? (100 - line.end) / 100 : 0;
			obj.line = {
				dashed: line.dashed,
				coeff: {
					start: coeffS,
					end: coeffE,
				},
				shapeL: [],
				origin: {
					start: [],
					end: [],
				},
				curr: [],
				start: [],
				end: [],
			};
			for (let i = 0; i < obj.elL; i++) {
				const el = line.elWL || obj.el[i];
				obj.line.shapeL[i] = SvgShapeL(el);
				let dashArray;

				if (obj.line.dashed) {
					const dashPattern = obj.line.dashed;
					let dashL = 0;
					const dashArraySplit = dashPattern.split(/[\s,]/);
					const dashArrayL = dashArraySplit.length;
					for (let j = 0; j < dashArrayL; j++)
						dashL += parseFloat(dashArraySplit[j]) || 0;
					let dashArrayStr = "";
					const numRepeats = Math.ceil(obj.line.shapeL[i] / dashL);
					for (let j = 0; j < numRepeats; j++)
						dashArrayStr += dashPattern + " ";
					dashArray = dashArrayStr + "0 " + obj.line.shapeL[i];
				} else {
					dashArray = obj.line.shapeL[i];
				}

				obj.el[i].style.strokeDasharray = dashArray;
				obj.line.origin.start[i] = obj.line.coeff.start * obj.line.shapeL[i];
				obj.line.origin.end[i] = obj.line.coeff.end * obj.line.shapeL[i];
				obj.line.curr[i] = obj.line.origin.start[i];
				obj.line.start[i] = obj.line.origin.start[i];
				obj.line.end[i] = obj.line.origin.end[i];
			}
		}
		return obj;
	}

	play(options) {
		this.pause();
		this.u(options);
		this.de.run();
	}

	pause() {
		this.r.stop();
		if (this.de) {
			this.de.stop();
		}
	}

	u(options) {
		const opt = options || {};
		const { v } = this;
		const endpoint = Has(opt, "reverse") ? "start" : "end";

		if (Has(v, "prop")) {
			const propKeys = Object.keys(v.prop);
			for (let i = 0; i < v.propL; i++) {
				const name = propKeys[i];
				const prop = v.prop[name];

				prop.end = prop.origin[endpoint];
				prop.start = prop.curr;

				if (Has(opt, "p") && Has(opt.p, name)) {
					const optProp = opt.p[name];
					if (Has(optProp, "newEnd")) {
						prop.end = optProp.newEnd;
					}
					if (Has(optProp, "newStart")) {
						prop.start = optProp.newStart;
					}
				}
			}
		} else if (Has(v, "svg")) {
			const { svg } = v;
			svg.arr.start =
				Has(opt, "svg") && Has(opt.svg, "start")
					? opt.svg.start
					: SvgSplit(svg.curr);
			svg.arr.end =
				Has(opt, "svg") && Has(opt.svg, "end")
					? opt.svg.end
					: svg.originArr[endpoint];
		} else if (Has(v, "line")) {
			const { line } = v;
			for (let j = 0; j < v.elL; j++) {
				line.start[j] = line.curr[j];
			}
			if (Has(opt, "line") && Has(opt.line, "end")) {
				line.coeff.end = (100 - opt.line.end) / 100;
				for (let j = 0; j < v.elL; j++) {
					line.end[j] = line.coeff.end * line.shapeL[j];
				}
			} else {
				for (let j = 0; j < v.elL; j++) {
					line.end[j] = line.origin[endpoint][j];
				}
			}
		}

		v.d.curr = Has(opt, "d") ? opt.d : R(v.d.origin - v.d.curr + v.elapsed);
		v.e.curve = opt.e || v.e.curve;
		v.e.calc = isStr(v.e.curve) ? Ease[v.e.curve] : CubicBezierEase(v.e.curve);
		v.de = (Has(opt, "de") ? opt : v).de;
		v.cb = (Has(opt, "cb") ? opt : v).cb;
		v.pr = v.prE = v.d.curr === 0 ? 1 : 0;
		this.de = new De(this.loop, v.de);
	}

	// Global RAF
	loop() {
		this.r.run();
	}

	run(value) {
		const { v } = this;
		if (v.pr === 1) {
			this.pause();
			v.up();
			if (v.cb) v.cb();
		} else {
			v.elapsed = Clamp(0, v.d.curr, value);
			v.pr = Clamp(0, 1, v.elapsed / v.d.curr);
			v.prE = v.e.calc(v.pr);
			v.up();
		}
	}

	// Update Prop
	uP() {
		let { prop, propI, propL, elL } = this.v;

		for (; propL--; )
			prop[propL].curr = this.lerp(prop[propL].start, prop[propL].end);

		const x = Has(propI, "x") ? prop[propI.x].curr + prop[propI.x].unit : 0;
		const y = Has(propI, "y") ? prop[propI.y].curr + prop[propI.y].unit : 0;

		const translate3d = x + y === 0 ? 0 : `translate3d(${x},${y},0)`;
		const rotate = Has(propI, "r")
			? `${prop[propI.r].name}(${prop[propI.r].curr}deg)`
			: 0;
		const rotate2 = Has(propI, "r2")
			? `${prop[propI.r2].name}(${prop[propI.r2].curr}deg)`
			: 0;

		const scale = Has(propI, "s") ? `scale(${prop[propI.s].curr})` : 0;

		const transform =
			translate3d + rotate + rotate2 + scale === 0
				? 0
				: [translate3d, rotate, rotate2, scale]
						.filter((val) => val !== 0)
						.join(" ");

		const opacity = Has(propI, "o") ? prop[propI.o].curr : -1;

		for (; elL-- && !isUnd(this.v.el[elL]); ) {
			const el = this.v.el[elL];

			if (transform !== 0) el.style.transform = transform;
			if (opacity >= 0) el.style.opacity = opacity;
		}
	}

	// Update SVG
	uS() {
		const { v } = this;
		const { svg } = v;
		const { arr, arrL } = svg;

		let currTemp = "";

		for (let i = 0; i < arrL; i++) {
			svg.val[i] = isNaN(arr.start[i])
				? arr.start[i]
				: this.lerp(arr.start[i], arr.end[i]);
			currTemp += svg.val[i] + " ";
			svg.curr = currTemp.trim();
		}

		for (let i = 0; i < v.elL && !isUnd(v.el[i]); i++) {
			Sa(v.el[i], svg.attr, svg.curr);
		}
	}

	// Update Line
	uL() {
		const { v } = this;
		const { line, elL } = v;
		for (let i = 0; i < elL; i++) {
			const { el } = v;
			const elStyle = el[i].style;
			line.curr[i] = this.lerp(line.start[i], line.end[i]);
			elStyle.strokeDashoffset = line.curr[i];
			if (v.pr === 0) elStyle.opacity = 1;
		}
	}

	lerp(start, end) {
		const { v } = this;
		return R(Lerp(start, end, v.prE), v.r);
	}
}
