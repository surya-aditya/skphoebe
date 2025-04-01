import path from "path";
import RouterManager from "./router";
import RouterBuilder from "./router/builder";

// App
import { config } from "./config.js";
import { year } from "./router/routes.js";

// Utils
import { compileCSS, compileTpl } from "./utils/compiler";
import { serveStatic } from "./utils/serveStatic.js";
import { brotliCompressSync } from "zlib";
import { Divider } from "../_/utils/index.js";

const publicPath = path.join(import.meta.dir, "../public");
const port = Bun.env.PORT || 3000;

const router = new RouterManager();

function compressData(req, data) {
	const acceptEncoding = req.headers.get("Accept-Encoding") || "";
	const isSupport = acceptEncoding.includes("br");

	if (isSupport) {
		return {
			data: brotliCompressSync(Buffer.from(data)),
			headers: { "Content-Encoding": "br" },
		};
	}

	return { data, headers: {} };
}

async function handleRoute(req, router, url) {
	let path = url.pathname;

	// Normalize URL path
	if (path !== "/" && path.endsWith("/")) path = path.slice(0, -1);

	// Get route information
	const { title, id } = await router.getFromPath(path);

	// Handle 404
	if (!title) {
		const preCSS = await compileCSS("404");
		const _404 = await compileTpl("404", { preCSS });
		return compressAndRespond(req, _404, "text/html");
	}

	// Preload CSS
	const preCSS = await compileCSS("preload");

	// Base Configuration
	const _A = config(path, id);
	const baseContent = await compileTpl("base", {
		_A,
		title,
		preCSS,
	});

	return compressAndRespond(req, baseContent, "text/html");
}

// Helper function to handle dynamic compression and respond
function compressAndRespond(req, data, contentType) {
	const { data: compressedData, headers } = compressData(req, data);
	return new Response(compressedData, {
		headers: { "Content-Type": contentType, ...headers },
	});
}

// Main server handler
async function startServer() {
	await router.registerRoutes();

	Bun.serve({
		port,
		async fetch(req) {
			const url = new URL(req.url);
			const device = url.searchParams.get("device");
			const filePath = path.join(publicPath, url.pathname);

			const staticRes = await serveStatic(req, filePath);
			if (staticRes) return staticRes;

			if (req.method === "GET" && !url.pathname.match(/\.[0-9a-z]+$/i)) {
				if (device) {
					const shared = await router.getSharedItems();
					const routerBuilder = new RouterBuilder(router._, device, shared);
					const routes = await routerBuilder.init();

					let data = {};

					const body = await compileTpl("base-" + device, {
						year,
						...data,
					});
					const responseData = JSON.stringify({ body, ...routes });

					return compressAndRespond(req, responseData, "application/json");
				}

				return await handleRoute(req, router, url);
			}

			return new Response("Not Found", { status: 404 });
		},
	});

	Divider();
	console.log(`Server running at http://localhost:${port}/`);
	Divider();
}

// Start the server
startServer().catch((err) => {
	console.error("Error starting server:", err);
});
