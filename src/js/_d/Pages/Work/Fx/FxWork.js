import Motion from "../../../../Motion";
import { Get } from "../../../../utils/dom";

export default class FxWork {
	show(opt) {
		const page = _A.e.p();
		const pr = Get.cl("wo-p-c", page)[0].children;

		const deMax = pr.length * 25;

		let prA = [];
		for (let i = 0; i < pr.length; i++) {
			prA[i] = new Motion({
				el: pr[i],
				p: { y: [100, 0, "px"], o: [0, 1] },
				d: opt.d,
				de: 25 * i,
				e: opt.e,
			});
		}

		const indicator = Get.cl("wo-p-i", page)[0];
		const indicatorA = new Motion({
			el: indicator,
			p: { o: [0, 1] },
			d: opt.d,
			de: deMax,
			e: opt.e,
		});

		return {
			play: () => {
				for (let i = 0; i < prA.length; i++) prA[i].play();
				indicatorA.play();
			},
		};
	}
}
