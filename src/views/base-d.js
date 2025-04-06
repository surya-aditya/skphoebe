import { navDesktop as Nav } from "./partials/nav";

export const template = (data) => {
	return html`
		<canvas id="__"></canvas>
		<main id="_"></main>
		${Nav()}
	`;
};
