import { create, identity, translateFn, invert, perspective } from "../Utils";

export default class Camera {
	constructor() {
		this.aspect = 1;
		this.state = { x: null };
		this.projectionM4 = create();
		this.camM4 = create();
	}

	resize(options) {
		const _app = _A;
		const _rgl = _app.rgl;
		const pi = Math.PI;

		if (options) {
			this.aspect = options.aspect;
		}

		const fov = 45;
		const near = 1;
		const far = 2500;
		this.projectionM4 = perspective(
			this.projectionM4,
			(fov * pi) / 180,
			this.aspect,
			near,
			far
		);

		const winSemi = _app.winSemi;
		this.posOrigin = {
			x: winSemi.w,
			y: -winSemi.h,
			z: winSemi.h / Math.tan((fov * pi) / 360),
		};

		for (let i = 0; i < _rgl.pgmL; i++) {
			_rgl.pgm[_rgl.pgmType[i]].uniform.umm.v = this.projectionM4;
		}

		this.render({ x: null });
	}

	render(pos) {
		if (this.state.x !== pos.x) {
			this.state.x = pos.x;
			this.camM4 = identity(this.camM4);
			this.camM4 = translateFn(this.camM4, [
				this.posOrigin.x + pos.x,
				this.posOrigin.y,
				this.posOrigin.z + pos.z,
			]);
			this.viewM4 = invert(this.camM4, this.camM4);
		}
		return this.viewM4;
	}
}
