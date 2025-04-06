import { Has, isDef } from "../../../utils/dom";

export default class Program {
	constructor(prop) {
		const _rgl = _A.rgl;

		this.gl = _rgl.gl;
		this.ren = _rgl.ren;

		this.uniform = prop.uniform;
		this.pts = prop.pts;
		this.name = prop.name;
		this.fbo = isDef(prop.fbo);

		this.pgm = this.crP(prop.shader);

		const uniform = this.uniform;
		uniform.umm = { t: "Matrix4fv" }; // Model matrix
		uniform.uvm = { t: "Matrix4fv" }; // View matrix

		this.getL(uniform, "Uniform");
	}

	// Create program
	crP(shader) {
		const gl = this.gl;

		const shaders = [
			this.crS(shader.vertex, gl.VERTEX_SHADER),
			this.crS(shader.fragment, gl.FRAGMENT_SHADER),
		];

		const program = gl.createProgram();

		shaders.forEach((shader) => gl.attachShader(program, shader));
		gl.linkProgram(program);
		shaders.forEach((shader) => gl.deleteShader(shader));

		return program;
	}

	// Create shader
	crS(source, type) {
		const gl = this.gl;
		const shader = gl.createShader(type);

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		return shader;
	}

	// Get locations
	getL(data, type) {
		for (const key in data) {
			if (Has(data, key)) {
				data[key].location = this.gl[`get${type}Location`](this.pgm, key);
			}
		}
	}

	setUniform() {
		for (const key in this.uniform) {
			if (Has(this.uniform, key)) {
				const uniform = this.uniform[key];
				const location = uniform.location;
				const method = `uniform${uniform.t}`;

				if (uniform.t.startsWith("Matrix")) {
					this.gl[method](location, false, uniform.v);
				} else {
					this.gl[method](location, uniform.v);
				}
			}
		}
	}

	run() {
		this.texIndex = -1;
		if (this.ren.state.pgmCur !== this.name) {
			this.gl.useProgram(this.pgm);
			this.ren.state.pgmCur = this.name;
		}
	}
}
