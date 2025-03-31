import { isDef } from "../../../utils/dom";

export default class Texture {
	constructor(config) {
		const _gl = _A.rgl.gl;
		const texture = _gl.createTexture();
		_gl.bindTexture(_gl.TEXTURE_2D, texture);

		let filterMode;

		if (isDef(config.color)) {
			// If a color is defined, create a 1x1 texture with that color
			filterMode = "NEAREST";
			_gl.texImage2D(
				_gl.TEXTURE_2D,
				0,
				_gl.RGB,
				1,
				1,
				0,
				_gl.RGB,
				_gl.UNSIGNED_BYTE,
				new Uint8Array(config.color)
			);
		} else if (isDef(config.data)) {
			// If data is defined, create a texture from that data
			filterMode = "NEAREST";
			_gl.texImage2D(
				_gl.TEXTURE_2D,
				0,
				_gl.RGB,
				config.data.vert,
				config.data.hori,
				0,
				_gl.RGB,
				_gl.FLOAT,
				new Float32Array(config.data.arr)
			);
		} else if (isDef(config.fbo)) {
			// If an FBO is defined, create a texture for it
			filterMode = "LINEAR";
			_gl.texImage2D(
				_gl.TEXTURE_2D,
				0,
				_gl.RGBA,
				config.fbo.w,
				config.fbo.h,
				0,
				_gl.RGBA,
				_gl.FLOAT,
				null
			);
		} else {
			// Otherwise, create a texture from an object
			filterMode = "LINEAR";
			_gl.texImage2D(
				_gl.TEXTURE_2D,
				0,
				_gl.RGBA,
				_gl.RGBA,
				_gl.UNSIGNED_BYTE,
				config.obj
			);
		}

		// Set texture parameters
		const parameters = ["S", "T", "MIN", "MAG"];
		for (let i = 0; i < 4; i++) {
			const parameter =
				i < 2 ? `WRAP_${parameters[i]}` : `${parameters[i]}_FILTER`;
			const value = i < 2 ? "CLAMP_TO_EDGE" : filterMode;
			_gl.texParameteri(
				_gl.TEXTURE_2D,
				_gl[`TEXTURE_${parameter}`],
				_gl[value]
			);
		}

		return texture;
	}
}
