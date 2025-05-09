import { navDesktop as Nav } from "./partials/nav";

export const template = (data) => {
	return html`
		<canvas id="__"></canvas>
		<main id="_"></main>
		${Nav()}
		<div id="_p"></div>
		<div id="cu-c" class="cu">
			<svg id="cu-c-c" viewBox="0 0 15 24" fill="none">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M8.07576 11.9896L0.214355 4.12817L4.19507 0.147461L14.0468 9.99922C15.1461 11.0985 15.1461 12.8807 14.0468 13.9799L4.19507 23.8317L0.214355 19.851L8.07576 11.9896Z"
					fill="white"
				/>
			</svg>
		</div>
		<div id="cu-b" class="cu">
			<svg id="cu-b-l" viewBox="0 0 18 89" fill="none">
				<path
					d="M17.6377 2H1.99999V86.4436H17.6377"
					stroke="white"
					stroke-width="4"
				/>
			</svg>
			<svg id="cu-b-r" viewBox="0 0 18 89" fill="none">
				<path
					d="M0.357422 2H15.9951V86.4436H0.357422"
					stroke="white"
					stroke-width="4"
				/>
			</svg>
		</div>
	`;
};
