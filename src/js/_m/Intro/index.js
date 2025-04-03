import { Opacity, PE } from "../../utils/dom";
import FxIntro from "./Fx/FxIntro";

export default class Intro {
	constructor(cb) {
		const _app = _A;
		const _e = _app.e;

		cb(() => {
			_e.intro();
			_e.init();
			_e.r.run();
			_e.run();

			if (_app.is.ho || _app.is.ge || _app.is.pl) {
				Opacity(_app.e.n.n, 1);
				PE.a(_app.e.n.n);
			} else {
				Opacity(_app.e.n.n, 0);
				PE.n(_app.e.n.n);
			}

			new FxIntro();
		});
	}
}
