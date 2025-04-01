import { isDef } from "../../../utils/dom";
import Camera from "./Camera";

export default class Renderer {
	constructor() {
		this.gl = _A.rgl.gl;
		this.first = true;
		this.state = {
			pgmCur: null,
			viewport: {
				x: 0,
				w: 0,
				h: 0,
			},
			framebuffer: null,
			face: null,
		};

		this.blend();
		this.gl.getExtension("OES_standard_derivatives");

		const vertexArrayExtension = this.gl.getExtension(
			"OES_vertex_array_object"
		);
		const methods = ["create", "bind"];
		this.vertexArray = {};

		for (let i = 0; i < 2; i++) {
			const method = methods[i];
			this.vertexArray[method] =
				vertexArrayExtension[method + "VertexArrayOES"].bind(
					vertexArrayExtension
				);
		}

		this.size = {
			w: 0,
			h: 0,
		};

		this.cam = new Camera();
		this.roRqd = false;
	}

	viewport(x, w, h) {
		const viewport = this.state.viewport;
		if (viewport.x !== x || viewport.w !== w || viewport.h !== h) {
			viewport.x = x;
			viewport.w = w;
			viewport.h = h;
			this.gl.viewport(x * this.dpr, 0, w, h);
		}
	}

	framebuffer(framebuffer) {
		if (this.state.framebuffer !== framebuffer) {
			this.state.framebuffer = framebuffer;
			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, framebuffer);
		}
	}

	face(face) {
		if (this.state.face !== face) {
			this.state.face = face;
			this.gl.enable(this.gl.CULL_FACE);
			this.gl.cullFace(this.gl[face]);
		}
	}

	blend() {
		const gl = this.gl;
		gl.enable(gl.BLEND);
		gl.blendFuncSeparate(
			gl.SRC_ALPHA,
			gl.ONE_MINUS_SRC_ALPHA,
			gl.ONE,
			gl.ONE_MINUS_SRC_ALPHA
		);
	}

	resize() {
		const _app = _A;
		const _windowSize = _app.win;
		const gl = this.gl;
		let dprMultiplier = 2;

		if (_windowSize.w < 600) {
			dprMultiplier = 3;
		} else if (_windowSize.w > 1920) {
			dprMultiplier = 1.5;
		}

		this.dpr = Math.min(devicePixelRatio, dprMultiplier);
		const width = _windowSize.w * this.dpr;
		const height = _windowSize.h * this.dpr;

		gl.canvas.width = width;
		gl.canvas.height = height;

		if (this.size.w !== width || this.size.h !== height) {
			this.cam.resize({
				aspect: gl.canvas.width / gl.canvas.height,
			});

			_app.rgl.clear();

			this.size.w = width;
			this.size.h = height;
			this.roRqd = true;
		}
	}

	render(objects) {
		const _rgl = _A.rgl;
		const _act = _rgl.act;

		_rgl.rqd = false;

		for (let i = 0; i < _act._L; i++) {
			const prop = _act.prop[i];

			if ((_act._[prop] || this.first) && isDef(objects[prop])) {
				objects[prop].moving();
				objects[prop].draw();
			}
		}

		if (this.first) this.first = false;
		if (this.roRqd) this.roRqd = false;
	}
}
