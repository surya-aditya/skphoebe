import Geometry from "./Geometry";

import { Media } from "../Utils/Media";
import { Clone } from "../../../utils/dom";
import { Clamp, R, Une } from "../../../utils/math";

const lerpProps = [
	"x",
	"y",
	"w",
	"h",
	"scale",
	"opacity",
	"bw",
	"ki",
	"rotate",
];

const easeProps = [
	"x",
	"y",
	"y1",
	"scale",
	"opacity",
	"mL",
	"mR",
	"mT",
	"mB",
	"mY",
	"px",
	"py",
	"z",
	"rx",
	"ry",
	"rf",
	"view",
];
const propLerp = ["scale", "opacity", "rotate"];
const propEase = [
	"scale",
	"opacity",
	"mL",
	"mR",
	"mT",
	"mB",
	"mY",
	"px",
	"py",
	"z",
	"rx",
	"ry",
	"rf",
];

const createObject = (props, defaultValue) =>
	props.reduce((obj, prop) => ((obj[prop] = defaultValue), obj), {});

export default class ProgramMedia {
	constructor(config) {
		const _app = _A;
		this.pgm = config.p;
		this.prop = config.prop;
		this.isHo = "/" === this.prop;

		this._ = {
			lerp: createObject(lerpProps, 0),
			ease: createObject(easeProps, 0),
		};

		// Set default values for specific properties
		this._.lerp.scale = 1;
		this._.lerp.opacity = 1;
		this._.ease.opacity = 1;

		this.data = Media({ p: this.pgm.pts, z: false });

		const createAllProperties = (types, propsMap, precisionMap) => {
			return types.reduce((allProps, type) => {
				propsMap[type].forEach((prop) => {
					allProps.push({
						type,
						prop,
						r: precisionMap[type].includes(prop) ? 6 : 3,
					});
				});
				return allProps;
			}, []);
		};

		// Properties to be used in the objects
		const propsMap = {
			lerp: lerpProps,
			ease: easeProps,
		};

		// Precision properties map
		const precisionMap = {
			lerp: propLerp,
			ease: propEase,
		};

		// Initialize all properties to be animated
		this.all = createAllProperties(["lerp", "ease"], propsMap, precisionMap);
		this.allL = this.all.length;

		// Initialize lerp properties
		this.lerp = lerpProps.map((prop) => ({
			prop,
			r: precisionMap.lerp.includes(prop) ? 6 : 2,
		}));

		this.media = _app.rgl.media[this.prop];
		this.mediaName = Object.keys(this.media);
		this.mediaNameL = this.mediaName.length;

		this.plane = {};
		this.planeL = {};
		this.wh = {};

		this.mediaName.forEach((name) => {
			const mediaItems = this.media[name];
			this.set(name, mediaItems, mediaItems.length);
		});
	}

	set(name, items, length) {
		const defaultState = this._;
		const data = this.data;

		this.plane[name] = [];
		this.wh[name] = [];

		for (let i = 0; i < length; i++) {
			const item = items[i];
			const newGeo = new Geometry({
				type: name === "number" ? 2 : 1,
				pgm: this.pgm,
				mode: data.mode,
				face: "FRONT",
				attrib: {
					a_p: {
						size: data.pos.size,
						data: new Float32Array(data.pos.arr),
					},
					index: { size: 1, data: new Uint16Array(data.index) },
					a_t: {
						size: 2,
						tex: item.attrib,
						data: new Float32Array(data.uv),
					},
				},
			});

			newGeo.setVAO();

			this.plane[name].push({
				move: Clone(defaultState),
				save: Clone(defaultState),
				visible: false,
				out: true,
				media: item,
				wh: 0,
				geo: newGeo,
			});

			this.wh[name].push(item.wh);
		}

		this.planeL[name] = this.plane[name].length;
	}

	moving() {
		const _app = _A;
		const _rgl = _app.rgl;
		const winW = _app.win.w;
		const winH = _app.win.h;

		const shouldUpdate = _app.e.s.rqd || _app.rgl.ren.roRqd || !_app.mutating;

		this.mediaName.forEach((media, t) => {
			const planes = this.plane[media];

			planes.forEach((plane, i) => {
				let updateRqd = shouldUpdate;

				if (!updateRqd) {
					updateRqd = this.all.some((property) =>
						Une(
							plane.move[property.type][property.prop],
							plane.save[property.type][property.prop],
							property.r
						)
					);
				}

				if (!updateRqd || plane.media.wh !== this.wh[media][i]) {
					this.wh[media][i] = plane.media.wh;
					updateRqd = true;
				}

				if (
					!updateRqd ||
					plane.media.data.some((data) => data.v && data.element.isPlaying)
				) {
					updateRqd = true;
				}

				this.all.forEach((property) => {
					plane.save[property.type][property.prop] =
						plane.move[property.type][property.prop];
				});

				const { x, y, w, h, opacity } = plane.save.lerp;
				const ease = plane.save.ease;

				const isVisibleX = x < winW && x + w > 0;
				const isVisibleY = y < winH && y + h > 0;

				plane.visible =
					isVisibleX &&
					isVisibleY &&
					w > 0 &&
					h > 0 &&
					R(Clamp(0, 1, opacity), 6) > 0 &&
					ease.mT < 1 &&
					ease.mB < 1 &&
					ease.mL < 1 &&
					ease.mR < 1;

				if (_rgl.rqd || (updateRqd && plane.visible)) {
					_rgl.rqd = true;
				}
			});
		});
	}

	draw() {
		const _app = _A;
		const { rgl } = _app;

		this.mediaName.forEach((media) => {
			let planes = this.plane[media];

			planes.forEach((plane) => {
				if (plane.visible && rgl.rqd) {
					if (plane.out) plane.out = false;
					plane.media.data.forEach((data) => {
						if (data.v) data.element.play();
					});
					plane.geo.draw(plane);
				} else if (!plane.visible && !plane.out) {
					plane.out = true;
					plane.media.data.forEach((data) => {
						if (data.v) data.element.pause();
					});
					plane.geo.draw(plane);
				}
			});
		});
	}
}
