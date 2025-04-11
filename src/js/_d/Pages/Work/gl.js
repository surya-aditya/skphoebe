import Motion from "../../../Motion";
import { Get, L, Re } from "../../../utils/dom";
import { Ease } from "../../../utils/easings";
import { Damp, iLerp, Lerp } from "../../../utils/math";

export default class GLWork {
	init() {
		const _app = _A;
		this.url = _app.route.new.url;
		this.animating = false;

		const textures = _A.rgl._[this.url];
		const page = (this.el = _app.e.p());

		this.img = Get.cl("_me", page);
		this.foo = Get.cl("wo-f", page)[0];

		this.tex = textures.plane.main;
		this.texL = textures.planeL.main;

		this.y = [];
		this.bw = [];

		this.ready = false;
		this.f = {};

		this.prop = ["x", "y", "w", "h"];
		this.propL = this.prop.length;

		const key = ["cur", "tar"];

		for (let i = 0; i < key.length; i++) {
			this.f[key[i]] = {};
			for (let j = 0; j < this.propL; j++) {
				this.f[key[i]][this.prop[j]] = 0;
			}
		}

		for (let i = 0; i < this.texL; i++) this.bw[i] = 0;

		this.resize();
	}

	resize() {
		const _app = _A;
		const { win } = _app;
		const { cur, step } = _app.e.s._[this.url];

		for (let i = 0; i < this.texL; i++) {
			const image = this.img[i];

			const lerp = this.tex[i].move.lerp;
			const rect = Re(image);
			const posY = rect.top + cur;

			lerp.x = rect.left;
			lerp.w = image.offsetWidth;
			lerp.h = image.offsetHeight;

			this.y[i] = posY;
		}

		const banner = this.img[0];
		const bannRe = Re(banner);
		const footerImg = this.img[this.texL - 1];
		const fooImgRe = Re(footerImg);

		this.f.cur.x = fooImgRe.left;
		this.f.cur.y = fooImgRe.top + step;
		this.f.cur.w = footerImg.offsetWidth;
		this.f.cur.h = footerImg.offsetHeight;

		const newY = 0.5 * -(win.h + 2);

		this.f.tar.x = bannRe.left;
		this.f.tar.y = _app.e.s.maxStep - _app.win.h + banner.offsetHeight;
		this.f.tar.w = banner.offsetWidth;
		this.f.tar.h = banner.offsetHeight;
	}

	texSet() {
		const _app = _A;
		const { _ } = _app.e.s;
		const { expand, step, cur, tar } = _[this.url];

		for (let i = 0; i < this.texL; i++) {
			let { lerp } = this.tex[i].move;

			if (i === this.texL - 1) {
				for (let j = 0; j < this.propL; j++) {
					const prop = this.prop[j];

					lerp[prop] = Lerp(this.f.cur[prop], this.f.tar[prop], expand);
					if (prop === "y") lerp[prop] -= step;
				}
			} else {
				lerp.y = this.y[i] - step;
			}
		}
	}

	show(opt) {
		const d = opt.d;
		const e = opt.e;

		return {
			play: () => {},
		};
	}

	loop() {
		this.texSet();
	}
}
