import { fooDesktop as Footer } from "../partials/foo";
import { navDesktop } from "../partials/nav";

export const template = (data) => {
	const works = data.works;
	let workList = "";

	for (let i = 0; i < works.length; i++) {
		const work = works[i];

		const servicesDivs = work.services
			.split(",")
			.map((service) => `<h3>${service.trim()}</h3>`)
			.join("");

		workList += html`
			<a class="ho-wo" href="/work/${work.uid}">
				<div class="_me"></div>
				<h2>${work.title}</h2>
				<div>${servicesDivs}</div>
			</a>
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

	const footer = Footer(data.shared, data.copyright, false, "f-ho _ns");

	return html`
		<div class="p_">
			<div class="p">
				<div id="ho-wo_">${workList}</div>
				${footer}
			</div>
		</div>
	`;
};
