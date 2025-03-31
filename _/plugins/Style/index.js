import path from "path";

// Functions
import {
	calVw,
	calVh,
	resolveCalc,
	resolveVars,
	extractRoot,
} from "./functions";

// Utils
import { Divider, RESOLVING_LOG } from "../../utils";

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
				let contents = await Bun.file(args.path).text();

				const pipeline = [
					(contents) => Promise.resolve(extractRoot(contents)),
					(contents) => Promise.resolve(resolveVars(contents)),
					resolveCalc,
					(contents) => Promise.resolve(calVw(contents)),
					(contents) => Promise.resolve(calVh(contents)),
					resolveCalc,
				];

				for (const fn of pipeline) contents = await fn(contents);
				return { contents, loader: "css" };
			});
		},
	};
}
