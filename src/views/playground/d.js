import { fooDesktop as Footer } from "../partials/foo";
import { navDesktop } from "../partials/nav";

export const template = (data) => {
	const list = data.list;
	let playgroundList = "";

	for (let i = 0; i < list.length; i++) {
		playgroundList += html`
			<div class="pl-li">
				<div class="_me"></div>
				<h2>${list[i].title || ""}</h2>
				<span>${list[i].description || ""}</span>
			</div>
		`;
	}

	const social = data.shared.social;
	let socialMedia = "";

	for (let i = 0; i < social.length; i++) {
		const socialItem = social[i];

		socialMedia += html`
			<li>
				<a
					href="${socialItem.link.url}"
					target="_blank"
					rel="noopener"
					aria-label="${socialItem.label_}"
				>
					${socialItem.label}
				</a>
			</li>
		`;
	}

	const footer = Footer(data.shared, data.copyright, false);

	return html`
		<div class="p_">
			<div class="p">
				<header class="pl-he">${navDesktop()}</header>
				<section class="pl-li_">${playgroundList}</section>
				${footer}
			</div>
		</div>
	`;
};
