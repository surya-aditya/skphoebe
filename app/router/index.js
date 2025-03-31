import { routes, studioName, types } from "./routes";

import { getAllByType, getSingle } from "../lib/prismic";

export default class RouterManager {
	constructor() {
		this._ = [];
		this.device = "d";
	}

	getRoutes() {
		return this._;
	}

	async getFromPath(path, exclude = []) {
		if (this._.length === 0) await this.registerRoutes();

		const route = this._.find(
			(r) => r.path === path && !exclude.includes(path)
		);
		if (route) return route;

		return {};
	}

	async registerRoutes() {
		await this.getStatic();
		await this.getDynamic();
	}

	async preProcessRoutes(routeProcess) {
		routeProcess = routeProcess.map((route) => {
			routes.forEach(({ id, type, prismicType, template, preprocess }) => {
				if (id === route.id)
					route = { ...route, type, prismicType, template, preprocess };
			});

			return route;
		});

		return routeProcess;
	}

	async getStatic() {
		if (routes.length === 0) return [];

		const data = routes
			.map(({ id, title, path, type }) => {
				if (type === "static") return { id, title, path };
			})
			.filter(Boolean);

		this._.push(...data);
		return data;
	}

	async getDynamic() {
		if (!types && types.length === 0) return [];

		const data = await Promise.all(
			types.map(async ({ id, name, path, pathFormat, filter }) => {
				const routeTemplate = routes.find((route) => route.id === id);

				if (!routeTemplate) return [];

				const items = await getAllByType(name);

				if (items) {
					let result = items
						.filter((item) => {
							if (!filter) return true;
							return filter(item);
						})
						.map(({ data, uid }) => {
							const title = Array.isArray(routeTemplate.title)
								? routeTemplate.title
										.map((part) => (part === ":uid" ? data.title : part))
										.join("")
								: routeTemplate.title;
							return {
								id,
								title,
								path: this.formatDynamicPath(uid, data, path, pathFormat),
								uid: uid,
							};
						})
						.filter(Boolean);

					return result;
				}
			})
		);

		this._.push(...data.flat());
		return data.flat();
	}

	formatDynamicPath(uid, data, path, pathFormat) {
		const objectPath = (o, s) => {
			s = s.replace(/\[(\w+)\]/g, ".$1");
			s = s.replace(/^\./, "");
			var a = s.split(".");
			for (var i = 0, n = a.length; i < n; ++i) {
				var k = a[i];
				if (k in o) {
					o = o[k];
				} else {
					return;
				}
			}
			return o;
		};

		if (pathFormat === null || pathFormat === undefined)
			return `${path}/${uid}`;
		pathFormat = pathFormat.replaceAll(":uid", uid);
		pathFormat = pathFormat
			.split("/")
			.map((item) => {
				if (item[0] === ":") {
					const field = item.slice(1, item.length);
					return objectPath(data, field);
				}
				return item;
			})
			.join("/");
		return pathFormat;
	}

	async getMetadata() {
		try {
			const { data: metadata } = await getSingle("metadata");
			return metadata;
		} catch (error) {
			console.error("Error fetching metadata:", error);
			return {};
		}
	}
}
