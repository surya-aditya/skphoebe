import { autoTypographicQuotes } from "../../../app/utils/compiler";
import { logoSvg } from "../partials/svg";

export const template = (data) => {
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

	const recognitions = data.recognitions;
	let allRecognitionList = "";

	for (let i = 0; i < recognitions.length; i++) {
		const project = recognitions[i];
		// recognition is an object grouped by recognition_options keys
		const recognitionGroups = project.recognition;
		let projectRecognitionList = "";

		for (const option in recognitionGroups) {
			const items = recognitionGroups[option];

			projectRecognitionList += html`
				<li>
					<h3>
						<span>${option}</span>
						<span>${autoTypographicQuotes(items[0].year)}</span>
					</h3>
					<ul>
						${items
							.map(
								(item) =>
									html`<li>
										<span>${item.recognition_type}</span>
									</li>`
							)
							.join("")}
					</ul>
				</li>
			`;
		}

		allRecognitionList += html`
			<li>
				<h2>${project.project_name}</h2>
				<ul>
					${projectRecognitionList}
				</ul>
			</li>
		`;
	}

	return html`
		<div class="p_">
			<div class="p">
				<section id="ge-pr">
					<h1>
						<span>Profile</span>
					</h1>
					<p>${data.about}</p>
				</section>
				<section id="ge-re">
					<span>
						<span>Recognitions</span>
					</span>
					<ul>
						${allRecognitionList}
					</ul>
				</section>
				<footer class="f _ns">
					<div>${logoSvg()}</div>
					<div>
						<div class="f-cpr">${data.copyright}</div>
						<div class="f-con">
							<a href="mailto:${data.shared.email}" class="f-ma">
								E. ${data.shared.email}
							</a>
							<ul>
								${socialMedia}
							</ul>
						</div>
						<a href="https://surya-aditya.com" target="_blank" rel="noopener">
							Development by Surya Aditya
						</a>
					</div>
				</footer>
			</div>
		</div>
	`;
};
