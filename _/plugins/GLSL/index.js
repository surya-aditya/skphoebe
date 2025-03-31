import path from "path";

import { createMangler } from "./mangler.js";
import { minify } from "./functions.js";

export default function GLSL(wordsToMangle) {
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
