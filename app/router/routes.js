import prismic, { getSingle } from "../lib/prismic";
import { aspectRatio, cleanUrl } from "../utils";

// Router IDs
export const types = [
	{
		id: "wo",
		name: "works",
		path: "/work",
	},
];

// getYear
export const year = new Date().getFullYear();
const copyright = `© ${year}, All rights reserved`;

// StudioName
export const webName = "Skolastika Phoebe";

// Router configurations
export const routes = [
	{
		id: "ho",
		type: "static",
		title: webName,
		path: "/",
		prismicType: "home",
		template: "home",
		preprocess: async ({ data }, collection, shared) => {
			const { works } = collection;

			data.copyright = copyright;

			data.shared = {};
			data.shared.email = shared.email;
			data.shared.social = shared.social_media;

			data.works = works.map((work) => {
				const _ = works.find((w) => w.uid === work.uid);

				return {
					uid: work.uid,
					title: _.data.title,
					services: _.data.services,
				};
			});

			return data;
		},
	},
	{
		id: "ge",
		type: "static",
		title: webName,
		path: "/general",
		prismicType: "general",
		template: "general",
		preprocess: async ({ data }, collection, shared) => {
			const { works } = collection;

			data.copyright = copyright;

			data.shared = {};
			data.shared.email = shared.email;
			data.shared.social = shared.social_media;

			data.recognitions = data.body
				.filter(
					(section) =>
						section.length !== 0 && section.slice_type === "recognition"
				)
				.map((section) => {
					const items = Object.values(section.items);
					const grouped = items.reduce((acc, item) => {
						const key = item.recognition_options;
						if (!acc[key]) acc[key] = [];

						acc[key].push(item);
						return acc;
					}, {});

					return {
						...section.primary,
						recognition: grouped,
					};
				});

			// for (let i = 0; i < data.recognitions.length; i++) {
			// 	console.log(data.recognitions[i]);
			// }

			return data;
		},
	},
	{
		id: "wo",
		type: "dynamic",
		title: [":uid", " — " + webName],
		path: "/work",
		prismicType: "works",
		template: "works",
		preprocess: async ({ uid, data }, collection) => {
			return data;
		},
	},
];
