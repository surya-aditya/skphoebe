import { BM, Cl, Get, isUnd, Re } from "../utils/dom";
import { default as RafR } from "../utils/rafr";

export default class Load {
	constructor() {
		BM(this, ["loop"]);

		this.raf = new RafR(this.loop);

		this.isOff = true;
	}

	init() {
		this.url = _A.route.new.url;

		this.lazyp = Get.cl("r");
		this.lazypL = this.lazyp.length;

		this.lazyRange = [];
		this.lazypOff = [];
		for (let i = 0; i < this.lazypL; i++) {
			this.lazypOff[i] = true;
			this.lazyRange[i] = {};
		}

		this.resize();
	}

	resize() {
		const _app = _A;
		const scroll = _app.e.s._;
		const winH = _app.win.h;

		for (let i = 0; i < this.lazypL; i++) {
			if (isUnd(this.lazyp[i])) return;

			const rect = Re(this.lazyp[i]);
			const top = rect.top;
			const height = rect.height;

			this.lazyRange[i].s = Math.max(top + scroll - winH, winH < top ? 1 : 0);
			this.lazyRange[i].e = Math.max(top + scroll, 0) + height;
		}
	}

	run() {
		this.isOff = false;
		this.raf.run();
	}

	loop() {
		const _app = _A;
		const scroll = _app.e.s._;

		for (let i = 0; i < this.lazypL; i++) {
			if (
				this.lazypOff[i] &&
				scroll >= this.lazyRange[i].s &&
				scroll <= this.lazyRange[i].e
			) {
				if (this.isOff || isUnd(this.lazyp[i])) return;

				this.lazypOff[i] = false;

				const element = this.lazyp[i];

				if (element.tagName === "IMG") {
					const src = element.dataset.src;
					const img = new Image();
					img.crossOrigin = "anonymous";
					img.src = src;

					img.decode().then(() => {
						if (!this.isOff && !isUnd(element)) {
							element.src = src;
							if (Cl.co(element, "r-o")) {
								Cl.a(element, "on");
							} else if (Cl.co(element.parentNode, "r-o")) {
								Cl.a(element.parentNode, "on");
							}
						}
					});
				} else {
					Cl.a(el, "on");
				}
			}
		}
	}

	off() {
		this.isOff = true;
		this.lazypL = 0;
		this.raf.stop();
	}
}
