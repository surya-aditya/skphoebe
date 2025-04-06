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
export const copyright = `© ${year}, All rights reserved`;

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

			data.work_list = works.map((work) => {
				const _ = works.find((w) => w.uid === work.uid);

				return {
					uid: work.uid,
					title: _.data.title,
					services: _.data.services,
					image: _.data.image,
				};
			});

			return data;
		},
	},
	{
		id: "ge",
		type: "static",
		title: "General - " + webName,
		path: "/general",
		prismicType: "general",
		template: "general",
		preprocess: async ({ data }, collection, shared) => {
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

			return data;
		},
	},
	{
		id: "pl",
		type: "static",
		title: "Playground - " + webName,
		path: "/playground",
		prismicType: "playground",
		template: "playground",
		preprocess: async ({ uid, data }, collection, shared) => {
			data.copyright = copyright;

			data.shared = {};
			data.shared.email = shared.email;
			data.shared.social = shared.social_media;

			return data;
		},
	},
	{
		id: "wo",
		type: "dynamic",
		title: [":uid", " — " + webName],
		path: "/work/:uid",
		prismicType: "works",
		template: "work",
		preprocess: async ({ uid, data }, collection) => {
			const works = collection.works;

			const index = works.findIndex((w) => w.uid === uid);

			if (index !== -1) {
				const nextIndex = (index + 1) % works.length;
				const next = works[nextIndex];

				data.nextProject = {
					uid: next.uid,
					title: next.data.title,
					image: next.data.image,
					services: next.data.services,
				};
			}

			return data;
		},
	},
];
