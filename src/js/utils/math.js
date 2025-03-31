import { RELATIVE_DELTA, default as RafR } from "./rafr";
import { BM, isUnd } from "./dom";

export function iLerp(start, end, value) {
	return Clamp(0, 1, (value - start) / (end - start));
}

export function Lerp(start, end, progress) {
	return (1 - progress) * start + progress * end;
}

export function Clamp(min, max, value) {
	return value < min ? min : value > max ? max : value;
}

// Precision Round
export function R(number, precision) {
	precision = isUnd(precision) ? 100 : 10 ** precision;
	return Math.round(number * precision) / precision;
}

export function Remap(inputMin, inputMax, outputMin, outputMax, value) {
	return Lerp(outputMin, outputMax, iLerp(inputMin, inputMax, value));
}

// Distance
export function Dist(x, y) {
	return Math.sqrt(x * x + y * y);
}

// Unequal tolerance
export function UneT(value1, value2, tolerance) {
	return Math.abs(value1 - value2) >= tolerance;
}

// Unequal
export function Une(value1, value2, precision) {
	return R(Math.abs(value1 - value2), precision) !== 0;
}

// Modulo
export function Mod(dividend, divisor) {
	return ((dividend % divisor) + divisor) % divisor;
}

export function Damp(currentValue, targetValue, dampingFactor) {
	return Lerp(
		currentValue,
		targetValue,
		1 - Math.exp(Math.log(1 - dampingFactor) * RELATIVE_DELTA)
	);
}

// Delay
export class De {
	constructor(callback, delay) {
		this.cb = callback;
		this.de = delay;

		BM(this, ["loop"]);
		this._rafR = new RafR(this.loop);
	}

	run() {
		this.de === 0 ? this.cb() : this._rafR.run();
	}

	stop() {
		this._rafR.stop();
	}

	loop(time) {
		const elapsed = Clamp(0, this.de, time);
		const progress = Clamp(0, 1, elapsed / this.de);
		if (progress === 1) {
			this.stop();
			this.cb();
		}
	}
}

// Timer
export class Timer {
	constructor(options) {
		this._ = new De(options.cb, options.de);
	}

	run() {
		this._.stop();
		this._.run();
	}
}

export const Rand = {
	//Random
	ra: (min, max, precision = 0) => {
		const randomNum = Math.random() * (max - min) + min;
		return Rand.round(randomNum, precision);
	},
	// Unique
	uni: (n) => {
		const arr = Array.from({ length: n }, (_, i) => i);
		for (let i = n - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;
	},
	// Round
	ro: (num, precision) => {
		const factor = Math.pow(10, precision);
		return Math.round(num * factor) / factor;
	},
};
