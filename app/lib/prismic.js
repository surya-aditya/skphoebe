import { createClient } from "@prismicio/client";

const routes = [];
const repo = Bun.env.PRISMIC_REPOSITORY;
const accessToken = Bun.env.PRISMIC_ACCESS_TOKEN;

export const client = createClient(repo, { accessToken, routes });

const fetchFromClient = async (method, ...args) => {
	const [typeName, params] = args;
	if (!typeName) return null;
	return client[method](typeName, params);
};

export const getAllByType = (typeName, params = {}) =>
	fetchFromClient("getAllByType", typeName, params);

export const getSingle = (typeName, params = {}) =>
	fetchFromClient("getSingle", typeName, params);

export const getByUID = (resource, uid, params = {}) => {
	if (!uid) return null;
	return client.getByUID(resource, uid, params);
};

export default {
	client,
	getAllByType,
	getSingle,
	getByUID,
};
