import { headerMobile } from "./partials/nav";

export const template = (data) => {
	const header = headerMobile(data.shared, data.copyright);

	return html`
		<main id="_"></main>
		${header}
	`;
};
