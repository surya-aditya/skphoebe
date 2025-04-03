import { logoSvg } from "./svg";

export const fooDesktop = (shared, copyright, dev = false, cl) => {
	const social = shared.social;
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

	let devText = "";
	if (dev) {
		devText = html`
			<a href="https://surya-aditya.com" target="_blank" rel="noopener">
				Development by Surya Aditya
			</a>
		`;
	} else {
		devText = html` <div>Folio Vol. 02</div> `;
	}

	return html`
		<footer class="f ${cl}">
			<div class="f-cpr">${copyright}</div>
			<div class="f-con">
				<a href="mailto:${shared.email}" class="f-ma"> E. ${shared.email} </a>
				<ul>
					${socialMedia}
				</ul>
			</div>
			${devText}
		</footer>
	`;
};

export const fooMobile = (shared, copyright, dev = false) => {
	const social = shared.social;
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
					${socialItem.label_}.
				</a>
			</li>
		`;
	}

	let devText = "";
	if (dev) {
		devText = html`
			<a href="https://surya-aditya.com" target="_blank" rel="noopener">
				Development by Surya Aditya
			</a>
		`;
	}

	return html`
		<footer class="f">
			<div>
				<a href=""> ${logoSvg()} </a>
			</div>
			<div>
				<div class="f-con">
					<div>
						<span class="t-br">
							<span>Email</span>
						</span>
						<a href="mailto:${shared.email}" class="f-ma"> ${shared.email} </a>
					</div>
					<div>
						<span class="t-br">
							<span>Social Media</span>
						</span>
						<ul>
							${socialMedia}
						</ul>
					</div>
				</div>
				<div class="f-cpr">${copyright}</div>
				${devText}
			</div>
		</footer>
	`;
};
