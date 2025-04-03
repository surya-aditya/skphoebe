import { De } from "../utils/math";

export default class Page {
	constructor(data) {
		const _app = _A;
		const _e = _app.e;
		const is = _app.is;
		const was = _app.was;
		const isLocal = _app.config.isLocal;
		const intro = data.intro;
		const delay = isLocal ? 0 : 550;

		const anim = [];

		if (intro) {
			if (is.ho || is.ge || is.pl) {
				anim.push(_app.e.n.show());
			}

			new De((_) => {
				_app.mutating = false;
				_app.intro = false;
				_e.on();
			}, delay).run();
		} else {
			if (is.ho || is.ge || is.pl) {
				anim.push(_app.e.n.show());
			} else {
				anim.push(_app.e.n.hide());
			}

			new De((_) => {
				_app.mutating = false;
				_e.on();
			}, delay).run();
		}

		const animL = anim.length;
		return {
			play: (_) => {
				if (animL > 0) for (let i = 0; i < animL; i++) anim[i].play();
			},
		};
	}
}
