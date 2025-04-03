import { autoTypographicQuotes } from "../../../app/utils/compiler";
import { fooDesktop as Footer } from "../partials/foo";
import { navDesktop } from "../partials/nav";

export const template = (data) => {
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
					<h3>${option}</h3>
					<ul>
						${items
							.map(
								(item) =>
									html`<li>
										<span>${item.recognition_type}</span>
										<span>${autoTypographicQuotes(item.year)}</span>
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

	const footer = Footer(data.shared, data.copyright, true);

	return html`
		<div class="p_">
			<div class="p">
				<header id="ge-he" class="_ns">${navDesktop()}</header>
				<section id="ge-pr">
					<h1 class="t-br">
						<span>Profile</span>
					</h1>
					<p>${data.about}</p>
				</section>
				<section id="ge-re">
					<div>
						<p class="t-br"><span>Recognitions</span></p>
						<div class="_me"></div>
					</div>
					<ul>
						${allRecognitionList}
					</ul>
				</section>
				${footer}
			</div>
		</div>
	`;
};
