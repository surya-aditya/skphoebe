import { COPY_STATIC_LOG, Divider } from "../../utils";
import { copyDirectory } from "./functions";

export function Static(opt = {}) {
	const src = opt.src;
	const dest = opt.dest;

	Divider();
	COPY_STATIC_LOG();

	return {
		name: "Copy Static Files",
		setup(build) {
			build.onStart(async () => {
				try {
					await copyDirectory(src, dest);
				} catch (error) {
					console.error(`Error copying static files: ${error}`);
				}
			});
		},
	};
}
