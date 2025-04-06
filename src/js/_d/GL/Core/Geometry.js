import { Has } from "../../../utils/dom";
import {
	create,
	identity,
	multiplyFn,
	rotateFn,
	translateFn,
	scaleFn,
} from "../Utils";

export default class Geo {
	constructor(params) {
		var _rgl = _A.rgl;
		this.gl = _rgl.gl;
		this.ren = _rgl.ren;
		this.pgm = params.pgm;
		this.mode = params.mode;
		this.face = params.face;
		this.attrib = params.attrib;
		this.type = params.type;
		this.ren.vertexArray.bind(null);

		this.pgm.getL(this.attrib, "Attrib");
		this.modelM4 = create();
	}

	setVAO() {
		let renderer = this.ren;
		this.vao = renderer.vertexArray.create();
		renderer.vertexArray.bind(this.vao);
		this.setAttrib();
		renderer.vertexArray.bind(null);
	}

	setAttrib() {
		let attrData,
			isIndex,
			dataType,
			glContext = this.gl;

		for (const attribName in this.attrib) {
			if (Has(this.attrib, attribName)) {
				attrData = this.attrib[attribName];
				isIndex = "index" === attribName;
				dataType = attrData.data.constructor;
				attrData.type =
					dataType === Float32Array
						? glContext.FLOAT
						: dataType === Uint16Array
						? glContext.UNSIGNED_SHORT
						: glContext.UNSIGNED_INT;
				attrData.count = attrData.data.length / attrData.size;
				attrData.tar = isIndex
					? glContext.ELEMENT_ARRAY_BUFFER
					: glContext.ARRAY_BUFFER;
				attrData.normalize = false;
				glContext.bindBuffer(attrData.tar, glContext.createBuffer());
				glContext.bufferData(
					attrData.tar,
					attrData.data,
					glContext.STATIC_DRAW
				);
				if (!isIndex) {
					glContext.enableVertexAttribArray(attrData.location);
					glContext.vertexAttribPointer(
						attrData.location,
						attrData.size,
						attrData.type,
						attrData.normalize,
						0,
						0
					);
				}
			}
		}
	}

	draw(drawParams) {
		const glContext = this.gl;
		const renderer = this.ren;
		const move = drawParams.move;
		const lerp = move.lerp;
		const ease = move.ease;
		const viewParam = ease.view;

		renderer.framebuffer(null);
		renderer.viewport(
			viewParam,
			glContext.canvas.width,
			glContext.canvas.height
		);

		renderer.face(this.face);
		this.pgm.run();

		this.modelM4 = identity(this.modelM4);

		const camMatrix = renderer.cam.render({
			x: viewParam,
			y: 0,
			z: 0,
		});

		let viewMatrix = multiplyFn(this.modelM4, camMatrix);
		const xPosition = lerp.x + ease.x;
		const yPosition = lerp.y + ease.y + ease.y1;
		const width = lerp.w;
		const height = lerp.h;

		const centerX = xPosition + width / 2;
		const centerY = yPosition + height / 2;

		viewMatrix = rotateFn(
			translateFn(viewMatrix, [centerX, -centerY, 0]),
			ease.rx * ease.rf,
			[0, 1, 0]
		);

		viewMatrix = translateFn(
			rotateFn(viewMatrix, ease.ry * ease.rf, [1, 0, 0]),
			[-centerX, centerY, 0]
		);

		viewMatrix = scaleFn(
			rotateFn(
				translateFn(viewMatrix, [xPosition, -yPosition, 0]),
				lerp.rotate,
				[1, 0, 0]
			),
			[width, height, 1]
		);

		const uniform = this.pgm.uniform;

		if (this.type > 0) {
			let aspectRatio = 1;
			let aspect = drawParams.media.wh / (width / height);

			if (aspect < 1) {
				aspectRatio = 1 / aspect;
				aspect = 1;
			}

			const scale = lerp.scale + ease.scale;
			uniform.r.v = [aspect * scale, aspectRatio * scale];
		} else {
			uniform.r.v = [1, 1];
		}

		uniform.t.v = this.type;
		uniform.z.v = -50 * ease.z;
		uniform.o.v = lerp.opacity * ease.opacity;
		uniform.g.v = lerp.bw;
		uniform.mTB.v = [ease.mT, ease.mB];
		uniform.mLR.v = [ease.mL, ease.mR];
		uniform.mY.v = ease.mY;
		uniform.of.v = [ease.px, ease.py];
		uniform.uvm.v = viewMatrix;

		this.pgm.setUniform();

		if (this.type > 0) {
			const texture = this.attrib.a_t.tex;
			const textureL = texture.length;
			const mediaData = drawParams.media.data;

			for (let index = 0; index < textureL; index++) {
				this.tex(texture[index]);

				if (mediaData[index].v && mediaData[index].element.isPlaying) {
					glContext.texImage2D(
						glContext.TEXTURE_2D,
						0,
						glContext.RGBA,
						glContext.RGBA,
						glContext.UNSIGNED_BYTE,
						mediaData[index].element.dom
					);
				}
			}
		}

		this.drawGL();
	}

	tex(texture) {
		const glContext = this.gl;
		const program = this.pgm;

		program.texIndex = program.texIndex + 1;
		glContext.activeTexture(glContext["TEXTURE" + program.texIndex]);
		glContext.bindTexture(glContext.TEXTURE_2D, texture);
	}

	drawGL() {
		this.ren.vertexArray.bind(this.vao);

		const indexAttrib = this.attrib.index;

		this.gl.drawElements(
			this.gl[this.mode],
			indexAttrib.count,
			indexAttrib.type,
			0
		);
	}
}
