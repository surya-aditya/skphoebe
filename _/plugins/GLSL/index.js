import path from "path";

import { createMangler, minify } from "./functions.js";

const wordsToMangle = [];

export default function GLSL() {
	return {
		name: "GLSL Minifier",
		setup(build) {
			build.onLoad({ filter: /\.glsl$/ }, async (args) => {
				const contents = await Bun.file(
					path.resolve(path.dirname(import.meta.path), args.path)
				).text();
				const { mangleCode } = createMangler(wordsToMangle);
				return { contents: minify(contents, mangleCode), loader: "text" };
			});
		},
	};
}
