import Motion from "../../Motion";
import { BM, Get, L, Re } from "../../utils/dom";
import { Clamp, Lerp, R } from "../../utils/math";

export default class SVTo {
	constructor(options) {
		this.isSTo = false;
		this.sUp = options.sUp;

		BM(this, ["prFn"]);
	}

	init() {
		const app = _A;
		this.url = app.route.new.url;
		this.isWork = app.is.wo;
	}

	stop() {
		if (this.isSTo) {
			this.anim.pause();
			this.isSTo = false;
		}
	}

	prFn({ pageY }) {
		this.stop();

		const _app = _A;
		const { winSemi } = _app;
		const { _, max, isDrag } = _app.e.s;
		const { cur } = _[this.url];

		if (!isDrag) {
			const current = R(cur);
			const prC = Get.cl("wo-p-c")[0];
			const mainC = Get.cl("wo")[0].offsetHeight / prC.offsetHeight;
			const y = pageY - Re(prC).top;

			const target = Clamp(0, max, y * mainC - winSemi.h);
			const distance = Math.abs(target - current);
			const duration =
				distance === 0 ? 0 : Lerp(100, 400, Clamp(0, 1, distance / 3000));

			this.play({
				start: current,
				end: target,
				d: duration,
				e: "io3",
			});
		}
	}

	y(element) {
		const transform = element.style.transform;
		const parts = transform.match(/^translate3d\((.+)\)$/)[1].split(", ");
		return parseFloat(parts[1]);
	}

	play({ start, end, d, e }) {
		this.anim = new Motion({
			d,
			e,
			u: ({ pr }) => this.sUp(Lerp(start, end, pr)),
		});

		this.isSTo = true;
		this.anim.play();
	}

	on() {
		this.l("a");
	}

	off() {
		this.l("r");
	}

	l(mode) {
		if (this.isWork) L(Get.cl("wo-p-c")[0], mode, "click", this.prFn);
	}
}
