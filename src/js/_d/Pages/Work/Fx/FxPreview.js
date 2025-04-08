import { Get, Re, T } from "../../../../utils/dom";
import { R, Remap } from "../../../../utils/math";

export default class FxPreview {
	init() {
		this.url = _A.route.new.url;

		this.pr_ = Get.cl("wo-p-c_")[0];
		this.pr = Get.cl("wo-p-c")[0];
		this.prI = Get.cl("wo-p-i")[0];
		this.foo = Get.cl("wo-f")[0];

		this.resize();
	}

	resize() {
		const _app = _A;
		const windowHeight = _app.win.h;

		this.prI.style.height = Re(this.prI).width / _app.winRatio.wh + "px";

		T(this.pr_, 0, 0, "px");
		T(this.prI, 0, 0, "px");

		const prHeight = this.pr.offsetHeight;
		const prRe = Re(this.pr);

		if (windowHeight < prRe.top + prHeight) {
			this.prArea = windowHeight - prRe.top;
		} else {
			this.prArea = prHeight;
		}

		const offset = prHeight * 0.25;
		this.max = prHeight + offset - this.prArea;
		this.maxPreview = this.prArea - offset - this.prI.offsetHeight;
	}

	loop() {
		const _app = _A;
		const { cur } = _app.e.s._[this.url];
		const max = _app.e.s.max;

		const prOffset = Remap(0, max, 0, this.max, cur);
		const indicatorOffset = Remap(0, max, 0, this.maxPreview, cur);

		// Apply transforms
		T(this.pr_, 0, -R(prOffset), "px");
		T(this.prI, 0, R(indicatorOffset), "px");
	}
}
