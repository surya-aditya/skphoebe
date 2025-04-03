import { fooMobile as Footer } from "../partials/foo";

export const template = (data) => {
	const list = data.list;
	let playgroundList = "";

	for (let i = 0; i < list.length; i++) {
		const item = list[i];
		const isFull = item.full_size_on_mobile ?? false;

		playgroundList += html`
			<div class="pl-li${isFull ? " pl-li-f" : ""}">
				<picture>
					<img
						class="r r-o"
						data-src="${item.thumbnail.url}"
						src="data:image/gif;base64,R0lGODlhAQABAHAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
						alt="Thumbnail - ${item.title}"
					/>
				</picture>
				<h2>${item.title}</h2>
				<span>${item.description}</span>
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

	const footer = Footer(data.shared, data.copyright, false, "f-ho _ns");

	return html`
		<div class="p_">
			<div class="p">
				<div class="pl-li_">${playgroundList}</div>
				${footer}
			</div>
		</div>
	`;
};
