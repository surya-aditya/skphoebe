import { De } from "../utils/math";

export default class Page {
	constructor(data) {
		const _app = _A;
		const _e = _app.e;
		const _is = _app.is;
		const _was = _app.was;

		const intro = data.intro;
		const delay = _app.t.o.d * 0.5;
		const anim = [];

		const d = 1600;
		const e = "o6";

		if (intro) {
			if (_is.wo) {
				anim.push(_app.e.wo.fx.show({ d, e }));
				anim.push(_app.e.wo.gl.show({ d, e }));
			}

			new De(() => {
				_e.on();
				_app.mutating = false;
				_app.intro = false;
			}, delay).run();
		} else {
			if (_is.wo) {
				if (!_was.wo) anim.push(_app.e.wo.gl.show({ d, e }));
				anim.push(_app.e.wo.fx.show({ d, e }));
			}

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
