import RouterManager from "./index.js";

import { getAllByType, getSingle } from "../lib/prismic.js";
import { compileTpl } from "../utils/compiler.js";
import { cleanUrl, version } from "../utils/index.js";

export default class RouterBuilder {
	constructor(routes, device, shared = {}) {
		this._routes = routes;
		this.device = device || "d";
		this.shared = shared;

		this.routes = {};
		this.cache = {};
		this.collection = {};
		this.manager = new RouterManager();

		this.data = { cache: 2, gl: {} };
	}

	async init() {
		await this.fetchRouteData();
		return {
			cache: this.cache,
			data: this.data,
			routes: this.routes,
		};
	}

	async fetchCollection() {
		const collectionList = ["works"];
		await Promise.all(
			collectionList.map(async (col) => {
				this.collection[col] = await getAllByType(col);
			})
		);
	}

	async fetchRouteData() {
		await this.fetchCollection();

		const processedRoutes = await this.manager.preProcessRoutes(this._routes);

		await Promise.all(
			processedRoutes.map(async (route) => {
				const { id, title, path, type, prismicType, template, preprocess } =
					route;

				let prismicResult = {};
				let data = {};

				try {
					if (type === "static" && prismicType) {
						prismicResult = await getSingle(prismicType);
						if (prismicResult) {
							data = preprocess
								? await preprocess(prismicResult, this.collection, this.shared)
								: prismicResult;
						}
					} else if (type === "dynamic") {
						let item = this.collection[prismicType]?.find(
							(item) => item.uid === route.uid
						);

						if (route.item) item = route.item;

						if (item) {
							data = preprocess
								? await preprocess(item, this.collection, this.shared)
								: item;
						}
					}

					if (Object.keys(data).length) {
						const html = await this.compileTemplate(
							template,
							this.device,
							data
						);

						if (id === "ho") {
							this.glHome(path, data);
						} else if (id === "ge") {
							this.glGeneral(path, data);
						} else if (id === "pl") {
							this.glPlayground(path, data);
						} else if (id === "wo") {
							this.glWork(path, data);
						}

						this.routes[path] = id;
						this.cache[path] = { title, html };
					} else {
						this.cache[path] = { title, html: "" };
						this.routes[path] = id;
					}
				} catch (error) {
					console.error(`Error processing route ${path}:`, error);
				}
			})
		);
	}

	glHome(path, data) {
		const gl = [];

		for (let i = 0; i < data.work_list.length; i++) {
			const work = data.work_list[i];

			gl.push([
				{
					type: "img",
					url: work.image.url,
				},
			]);
		}

		this.data.gl[path] = {
			tex: {
				delete: false,
				preload: true,
				store: {
					main: [...gl],
				},
			},
		};
	}

	glGeneral(path, data) {
		const gl = [];

		for (let i = 0; i < data.recognitions.length; i++) {
			const recognition = data.recognitions[i];
			const group = Object.values(recognition.recognition);

			for (let j = 0; j < group.length; j++) {
				const items = group[j];
				for (let k = 0; k < items.length; k++) {
					gl.push([
						{
							type: "img",
							url: items[k].image.url,
						},
					]);
				}
			}
		}

		this.data.gl[path] = {
			tex: {
				delete: false,
				preload: true,
				store: {
					main: [...gl],
				},
			},
		};
	}

	glPlayground(path, data) {
		const gl = [];

		for (let i = 0; i < data.list.length; i++) {
			const item = data.list[i];

			gl.push([
				{
					type: "img",
					url: item.thumbnail.url,
				},
			]);
		}

		this.data.gl[path] = {
			tex: {
				delete: false,
				preload: true,
				store: {
					main: [...gl],
				},
			},
		};
	}

	glWork(path, data) {
		const gl = [];
		const mainImage = data.image;

		gl.push([
			{
				type: "img",
				url: mainImage.url,
			},
		]);

		for (let i = 0; i < data.gallery.length; i++) {
			const image = data.gallery[i].gallery_image;

			gl.push([
				{
					type: "img",
					url: image.url,
				},
			]);
		}

		gl.push([{ type: "img", url: data.nextProject.image.url }]);

		this.data.gl[path] = {
			tex: {
				delete: true,
				preload: false,
				store: {
					main: [...gl],
				},
			},
		};
	}

	async compileTemplate(template, device, data) {
		try {
			return await compileTpl(`${template}/${device}`, { ...data });
		} catch (err) {
			console.error(
				`Template compilation error for ${template}/${device}:`,
				err
			);
			return `<h1>Template Error Path: ${template}/${device}</h1>`;
		}
	}
}
