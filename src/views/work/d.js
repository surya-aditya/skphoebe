import { linkSvg } from "../partials/svg";

export const template = (data) => {
	const nextProject = data.nextProject;

	const nextServicesDivs = nextProject.services
		.split(",")
		.map((service) => `<span>${service.trim()}</span>`)
		.join("");

	const gallery = data.gallery;
	let galleryList = "";

	for (let i = 0; i < gallery.length; i++) {
		const image = gallery[i].gallery_image;
		const ratio = image.dimensions.width / image.dimensions.height;

		galleryList += html`
			<div class="wo-r">
				<div class="_me" style="aspect-ratio: ${ratio.toFixed(5)}"></div>
			</div>
		`;
	}

	return html`
		<div class="p_">
			<div class="p">
				<header class="wo-he">
					<div class="wo-he-ba">
						<div class="_me"></div>
					</div>
					<div>
						<div class="wo-he-la">
							<span class="t-br">
								<span>Works</span>
							</span>

							<a href="/" class="wo-cl t-br">
								<span>Close</span>
							</a>
						</div>
						<div class="wo-he-de">
							<span>${data.pre_title}</span>
							<h1>${data.title}</h1>
							<p>${data.description}</p>
							<a href="${data.website_url.url}">
								${linkSvg()}
								<span>Visit Website</span>
							</a>
						</div>
						<div class="wo-he-me">
							<span>Year: ${data.year}</span>
							<span>Services: ${data.services}</span>
							<span>Industries: ${data.industries}</span>
						</div>
					</div>
				</header>
				${galleryList}
				<footer class="wo-f">
					<div class="wo-f-la"><span>Next Project</span></div>
					<div class="wo-f-sc">Scroll Down</div>
					<div class="wo-f-r">
						<div class="_me"></div>
					</div>
					<div class="wo-f-de">
						<div class="wo-f-de-ti">
							<span>${nextProject.title}</span>
						</div>
						<div class="wo-f-de-se">${nextServicesDivs}</div>
					</div>
				</footer>
			</div>
		</div>
	`;
};
