import { De } from "../utils/math";

export default class Page {
	constructor(data) {
		const _app = _A;
		const _e = _app.e;
		const _is = _app.is;

		const intro = data.intro;
		const delay = _app.tr.o.d * 0.5;
		const anim = [];

		let d = 1500;
		let e = "o6";

		if (intro) {
			new De(() => {
				_e.on();
				_app.mutating = false;
				_app.intro = false;
			}, delay).run();
		} else {
			new De(() => {
				_e.on();
				_app.mutating = false;
			}, delay).run();
		}

		const animL = anim.length;
		return {
			play: () => {
				if (animL > 0) for (let i = 0; i < animL; i++) anim[i].play();
			},
		};
	}
}
