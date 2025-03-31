import { watch } from "fs";

// Utils
import { START_LOG, WATCHING_LOG, Divider, C } from "./utils/index.js";

// Plugins
import { Style } from "./plugins/Style/index.js";
import { Static } from "./plugins/Static/index.js";
import { Obfuscator } from "./plugins/Obfuscator/index.js";

// Version
import { setVersion } from "../app/utils/index.js";

const isProd = process.env.NODE_ENV === "production";

const entryDir = "src";
const outDir = "public";

const context = {
	target: "browser",
	entrypoints: [
		`./${entryDir}/js/d.js`,
		`./${entryDir}/js/m.js`,
		`./${entryDir}/css/d.css`,
		`./${entryDir}/css/m.css`,
	],
	outdir: outDir,
	sourcemap: isProd ? "none" : "linked",
	minify: true,
	format: "iife",
	plugins: [
		Static({ src: "static", dest: "public" }),
		Obfuscator(),
		await Style(),
	],
};

async function build(context) {
	const startTime = Date.now();

	await setVersion();
	await Bun.build(context);

	const buildDuration = Date.now() - startTime;
	if (isProd) {
		Divider();
		console.log(
			`${C.GREEN}🏗️  Build completed in ${buildDuration}ms.${C.RESET}`
		);
		Divider();
	}
}

if (isProd) {
	await build(context);
} else {
	await build(context);
	START_LOG();

	watch(entryDir, { recursive: true }, async (event, filename) => {
		if (filename) {
			WATCHING_LOG(filename);
			await build(context);
		}
	});
}
