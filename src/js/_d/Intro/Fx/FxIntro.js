import Motion from "../../../Motion";
import Page from "../../Page";

import { Get, Opacity, PE } from "../../../utils/dom";
import { De } from "../../../utils/math";

export default class FxIntro {
	constructor() {
		const page = new Page({ intro: true });

		const lo = Get.id("lo");
		const bg = Get.id("lo-bg");
		const nu = Get.id("lo-nu");

		const d = 300;
		const de = 100;

		const introNu = new Motion({
			el: nu,
			p: { y: [0, -101] },
			d: 300,
			e: "i3",
		});

		const intro = new Motion({
			el: bg,
			p: { o: [1, 0] },
			d,
			de,
			cb: () => PE.n(lo),
		});

		const nav = Get.id("n");
		Opacity(nav, _A.is.wo ? 0 : 1);
		PE.n(nav);

		introNu.play();
		intro.play();
		new De(() => page.play(), d + de).run();
	}
}
