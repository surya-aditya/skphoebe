import { fooMobile as Footer } from "../partials/foo";
import { headerMobile } from "../partials/nav";
import { linkSvg } from "../partials/svg";

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
			<div class="ho-wo">
				<picture>
					<img
						class="r r-o"
						data-src="${work.image.url}"
						src="data:image/gif;base64,R0lGODlhAQABAHAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
						alt="Thumbnail - ${work.title}"
					/>
				</picture>
				<a href="/work/${work.uid}">
					<h2>${work.title}</h2>
					<div>${servicesDivs}</div>
					<div>
						${linkSvg()}
						<span>View Details</span>
					</div>
				</a>
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

	const footer = Footer(data.shared, data.copyright);

	return html`
		<div class="p_">
			<div class="p">
				<header>${headerMobile()}</header>
				<div id="ho-wo_">${workList}</div>
				${footer}
			</div>
		</div>
	`;
};
