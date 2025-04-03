import Timeline from "../../../Motion/Timeline";

import { Get, PE } from "../../../utils/dom";
import { De } from "../../../utils/math";
import Page from "../../Page";

export default class FxIntro {
	constructor(cb) {
		const lo = Get.id("lo");
		const bg = Get.id("lo-bg");

		const de = 100;
		const d = 700;

		const page = new Page({ intro: true });
		const tl = new Timeline();

		tl.from({
			el: bg,
			p: { o: [1, 0] },
			d,
			e: "l",
			de,
			cb: () => {
				PE.n(lo);
			},
		});

		tl.play();
		new De(() => page.play(), 200).run();
	}
}
