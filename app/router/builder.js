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

					// if (Object.keys(data).length) {
					if (data) {
						const html = await this.compileTemplate(
							template,
							this.device,
							data
						);

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
