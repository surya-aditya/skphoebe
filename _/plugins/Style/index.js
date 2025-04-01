import path from "path";

// Utils
import { Divider, RESOLVING_LOG } from "../../utils";
import { processCssWithScopedContext } from "./functions";

const contextVarsCache = { d: {}, m: {} };

function extractContextFromPath(filePath) {
	return filePath.includes("/m.css") ? "m" : "d";
}

export async function Style() {
	return {
		name: "Style Minifier",
		setup(build) {
			Divider();
			RESOLVING_LOG();

			build.onResolve({ filter: /\.css$/ }, (args) => {
				const resolvedPath = path.resolve(args.resolveDir, args.path);
				return { path: resolvedPath, namespace: "style" };
			});

			build.onLoad({ filter: /\.css$/, namespace: "style" }, async (args) => {
				const context = extractContextFromPath(args.path);
				let contents = await Bun.file(args.path).text();

				const isVarsFile = args.path.includes(`utils/vars/${context}.css`);

				// Always process vars.css to extract usable values
				const { processedCss, extractedVars } = processCssWithScopedContext(
					contents,
					contextVarsCache[context]
				);

				// Update cache with resolved variables
				contextVarsCache[context] = {
					...contextVarsCache[context],
					...extractedVars,
				};

				// If this is the vars.css file, return empty content (don't emit it)
				if (isVarsFile) {
					return { contents: "", loader: "css" };
				}

				// For all other CSS, use the resolved variables
				return { contents: processedCss, loader: "css" };
			});
		},
	};
}
