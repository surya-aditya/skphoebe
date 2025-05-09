import Motion from "../../../../Motion";
import {
	Cl,
	Get,
	GetSe,
	Opacity,
	Pause,
	Re,
	rmAttr,
	T,
} from "../../../../utils/dom";
import { Damp, R } from "../../../../utils/math";

export default class FxCursor {
	constructor() {
		this.rqd = false;

		this.c = [0, 0];

		this._0 = [
			{ cur: 0, tar: 0 },
			{ cur: 0, tar: 0 },
		];

		this._1 = [
			{ cur: 0, tar: 0 },
			{ cur: 0, tar: 0 },
		];

		this.mA = void 0;
	}

	init() {
		this.cu = Get.cl("cu");
		this.cuPoly = GetSe("#cu-c-c>path");
		this.a = GetSe("#pl-p>ul");

		this.resize();
	}

	resize() {
		// Hover area that detect showing/hiding cursor
		this.area = {
			x: Re(this.a).left,
			y: Re(this.a).top,
			w: Re(this.a).width,
			h: Re(this.a).height,
		};
		this.cuPos = [0.5 * this.cu[0].offsetWidth, 0.5 * this.cu[0].offsetHeight];
	}

	dirFx() {}

	show() {
		this.rqd = true;
		document.body.style.cursor = "none";

		for (let i = 0; i < 2; i++) {
			Opacity(this.cu[i], 1);
		}
	}

	hide() {
		this.rqd = false;
		document.body.style.cursor = "auto";

		for (let i = 0; i < 2; i++) {
			Opacity(this.cu[i], 0);
		}
	}

	loop() {
		const _app = _A;
		const { isShow } = _app.e.pl.fx$1;
		const mm = _app.e.c._;

		if (!isShow) return;

		const { x, y, w, h } = this.area;
		if (mm[0] >= x && mm[0] <= x + w && mm[1] >= y && mm[1] <= y + h) {
			this.show();
		} else {
			this.hide();
		}

		if (!this.rqd) return;

		for (let i = 0; i < 2; i++) {
			this._0[i].tar = mm[i] - this.cuPos[i];
			this._0[i].cur = Damp(this._0[i].cur, this._0[i].tar, 0.52);
			this._1[i].tar = mm[i] - this.cuPos[i];
			this._1[i].cur = Damp(this._1[i].cur, this._1[i].tar, 0.99);
		}

		T(this.cu[1], R(this._0[0].cur), R(this._0[1].cur), "px");
		T(this.cu[0], R(this._1[0].cur), R(this._1[1].cur), "px");

		const isLeft = mm[0] < _app.winSemi.w ? "a" : "r";
		Cl[isLeft](this.cu[0].children[0], "fl");
	}
}
