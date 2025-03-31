import ROR from "../../RORunner";

import Active from "./Active";
import Renderer from "./Core/Renderer";

import Program from "./Core/Program";
import ProgramMedia from "./Core/ProgramMedia";

import { default as RafR } from "../../utils/rafr";

import { BM, Get, isUnd } from "../../utils/dom";

import basicVertex from "./Shaders/Basic/vertex.glsl";
import basicFragment from "./Shaders/Basic/fragment.glsl";

export const Basic = {
	vertex: basicVertex,
	fragment: basicFragment,
};

export default class ResourceGL {
	constructor() {
		this._ = {};
		this.media = {};
		this.rqd = false;
		this.pass = 0;
		this.mutate = false;

		this.act = new Active("url");

		this.gl = Get.id("__").getContext("webgl", {
			antialias: true,
			alpha: true,
		});

		BM(this, ["resize", "loop"]);
		this.raf = new RafR(this.loop);
	}

	/**
	 * Load shaders and programs
	 */
	load() {
		this.ren = new Renderer();

		const basicProgramConfig = {
			name: "default",
			shader: Basic,
			pts: { h: 2, v: 2 },
			uniform: {
				// Texture
				texture: {
					type: "1i",
					v: 0,
				},

				// Type
				t: {
					type: "1i",
					v: 0,
				},

				// Texture Size
				s: {
					type: "2fv",
					v: [1, 1],
				},

				// Resolution
				r: {
					type: "2fv",
					v: [1, 1],
				},

				// Opacity
				o: {
					type: "1f",
					v: 0,
				},

				// Black and white / grayscale
				g: {
					type: "1f",
					v: 0,
				},

				// Kinetic
				k: {
					type: "1f",
					v: 0,
				},

				mM: {
					type: "1f",
					v: 0,
				},

				// Offset
				of: {
					type: "2fv",
					v: [0, 0],
				},

				// Viewport
				v: {
					type: "2fv",
					v: [0, 0],
				},

				z: {
					type: "1f",
					v: 0,
				},

				// Masking Left-Right
				mLR: {
					type: "2fv",
					v: [0, 0],
				},

				// Masking Top-Bottom
				mTB: {
					type: "2fv",
					v: [0, 0],
				},

				// Masking Y Normalized
				mY: {
					type: "1f",
					v: 0,
				},
			},
		};

		this.pgm = { default: new Program(basicProgramConfig) };

		this.pgmType = Object.keys(this.pgm);
		this.pgmL = this.pgmType.length;
	}

	/**
	 * Initialize resources based on the current route
	 */
	intro() {
		const _app = _A;
		const _act = this.act;
		const _currRoute = _app.route.new[_act.t];
		const _resources = _app.data.gl;

		for (let i = 0; i < _act._L; i++) {
			const rKey = _act.prop[i];

			if (rKey === _currRoute || _resources[rKey].tex.preload) {
				this._[rKey] = new ProgramMedia({
					p: this.pgm.default,
					prop: rKey,
				});
			}
		}
	}

	/**
	 * Initialize a specific resource if not already initialized
	 */
	init() {
		const _app = _A;
		const _currRoute = _app.route.new[this.act.t];
		const _resource = _app.data.gl[_currRoute];

		if (isUnd(this._[_currRoute]) && _resource) {
			this._[_currRoute] = new ProgramMedia({
				p: this.pgm.default,
				prop: _currRoute,
			});
		}
	}

	/**
	 * Start the rendering loop
	 */
	run() {
		new ROR(this.resize).on();
		this.resize();
		this.raf.run();
	}

	/**
	 * Handle window resize events
	 */
	resize() {
		const _app = _A;
		const _width = _app.win.w;
		const _height = _app.win.h;

		this.pgm.default.uniform.v.v = [_width, _height];
		this.ren.resize();
	}

	/**
	 * Main rendering loop
	 */
	loop() {
		this.ren.render(this._);
	}

	/**
	 * Clear the WebGL context
	 */
	clear() {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	}
}
