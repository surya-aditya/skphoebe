import { getVersion } from "./utils/index.js";

export function config(pagePath, id) {
	return {
		config: {
			v: "?" + getVersion(),
		},
		route: {
			new: { url: pagePath, page: id },
			old: { url: false, page: false },
		},
		is: { [id]: true },
		was: [],
	};
}
