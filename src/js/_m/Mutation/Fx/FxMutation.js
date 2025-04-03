import Motion from "../../../Motion";
import { Get } from "../../../utils/dom";

export default class FxMutation {
	constructor() {
		this.bg = Get.id("lo").children[0];
		this.bgA = new Motion({
			el: this.bg,
			p: { o: [0, 1] },
		});
	}

	out(options) {
		const { d, e, cb } = options;
		this.bgA.play({ d, e, cb });
	}

	in(options) {
		const { d, e } = options;
		const reverse = true;
		const cb = false;
		this.bgA.play({ reverse, d, e, cb });
	}
}
