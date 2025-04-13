import { Divider } from "../../utils";
import {
	applyMapping,
	mangleClassMethods,
	mangleThisProperties,
	protectSelectors,
	restoreSelectors,
} from "./functions";

const p_ = /hPS|onPS|fromBack|trM|insertNew|removeOld/;
const gl = /sliderMask/;
const manglePropsPattern = `^(?:[$_].*|.*[$_]|${p_.source}|${gl.source})$`;
const props = new RegExp(manglePropsPattern);

export function Obfuscator() {
	const mapping = {};

	return {
		name: "Obfuscator",
		setup(build) {
			build.onStart(() => {
				Divider();
				console.log("🎲 Obfuscating Javascript");
				// Divider();
			});

			build.onLoad({ filter: /\.js$/ }, async (args) => {
				let source = await Bun.file(args.path).text();

				const { newSource, protectedMap } = protectSelectors(source);
				source = newSource;
				source = mangleClassMethods(source, props, mapping);
				source = mangleThisProperties(source, props, mapping);
				source = applyMapping(source, mapping);
				source = restoreSelectors(source, protectedMap);

				// console.log(mapping);

				return { contents: source, loader: "js" };
			});
		},
	};
}
