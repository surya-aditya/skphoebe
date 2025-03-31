import prismic, { getSingle } from "../lib/prismic";
import { aspectRatio, cleanUrl } from "../utils";

// Router IDs
export const types = [];

// getYear
const getYear = new Date().getFullYear();
export const year = getYear.toString().slice(2);

// StudioName
export const studioName = "Artem Militonian";

// Router configurations
export const routes = [
	{
		id: "ho",
		type: "static",
		title: studioName,
		path: "/",
		prismicType: "",
		template: "home",
		preprocess: async ({ data }, collection, shared) => {
			return data;
		},
	},
];
