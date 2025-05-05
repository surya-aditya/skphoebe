import { linkSvg } from "../partials/svg";
import { DefaultImageUrl } from "../utils/Resource";

function getTargetHeight(width, aspectRatio = 1.778) {
	return Math.round(width / aspectRatio);
}

export const template = (data) => {
	const nextProject = data.nextProject;

	const width = 240;
	const mHeight = getTargetHeight(width, 0.838);

	const nextServicesDivs = nextProject.services
		.split(",")
		.map((service) => `<span>${service.trim()}</span>`)
		.join("");

	const gallery = data.gallery;
	let galleryList = "";
	let minimapGallery = "";

	for (let i = 0; i < gallery.length; i++) {
		const image = gallery[i].gallery_image;
		const ratio = image.dimensions.width / image.dimensions.height;

		const width = 1200;
		const height = getTargetHeight(width, ratio);
		const url = image.url + "&w=" + width + "&h=" + height;

		galleryList += html`
			<div class="wo-r">
				<div class="r_">
					<img
						class="r r-o"
						width=${width}
						height=${height}
						data-src="${url}"
						src="${DefaultImageUrl}"
						style="aspect-ratio: ${ratio.toFixed(5)}"
					/>
				</div>
			</div>
		`;

		const widthThumb = 240;
		const heightThumb = getTargetHeight(widthThumb, ratio);
		const urlThumb = image.url + "&w=" + widthThumb + "0&h=" + heightThumb;
		minimapGallery += html`
			<div class="wo-p-r">
				<div class="r_">
					<img
						data-src="${urlThumb}"
						src="${DefaultImageUrl}"
						class="r r-o"
						style="aspect-ratio: ${ratio.toFixed(5)}"
						width=${widthThumb}
						height=${heightThumb}
					/>
				</div>
			</div>
		`;
	}

	return html`
		<div class="p_">
			<div class="p">
				<div class="wo">
					<header class="wo-he">
						<div class="wo-he-ba">
							<div class="_me"></div>
						</div>
						<div>
							<div class="wo-he-la">
								<span class="t-y">
									<span class="t-br y_">
										<span class="y">Works</span>
									</span>
								</span>
								<a href="/" class="wo-cl t-y">
									<span class="t-br y_">
										<span class="y">Close</span>
									</span>
								</a>
							</div>
							<div class="wo-he-de">
								<span class="t-y t-s">${data.pre_title}</span>
								<h1 class="t-y t-s">${data.title}</h1>
								<p class="t-y t-s">${data.description}</p>
								<a href="${data.website_url.url}" class="t-y">
									<span class="y_">
										<span class="y">
											${linkSvg()}
											<span>Visit Website</span>
										</span>
									</span>
								</a>
							</div>
							<div class="wo-he-me t-y">
								<span class="y_">
									<span class="y">Year: ${data.year}</span>
								</span>
								<span class="y_">
									<span class="y">Services: ${data.services}</span>
								</span>
								<span class="y_">
									<span class="y">Industries: ${data.industries}</span>
								</span>
							</div>
						</div>
					</header>
					${galleryList}
					<footer class="wo-f">
						<a href="/work/${nextProject.uid}" class="wo-f-r">
							<div class="_me"></div>
						</a>
						<div>
							<div class="wo-f-la t-br">
								<span class="f-y">Next Work</span>
							</div>
							<div class="wo-f-de">
								<div class="wo-f-de-ti">
									${nextProject.title}
								</div>
								<div class="wo-f-de-se">
									<div class="f-y">${nextServicesDivs}</div>
								</div>
							</div>
						</div>
					</footer>
				</div>
				<div class="wo-p _ns">
					<div class="wo-p-c_">
						<div class="wo-p-c">
							<header class="wo-p-he">
								<div class="wo-p-he-ba">
									<img src="${data.image.url + "&w=240&h=" + mHeight}" class="_me"></img>
								</div>
								<div>
									<div class="wo-p-he-la">
										<span class="t-br">
											<span>Works</span>
										</span>
									</div>
									<div class="wo-p-he-de">
										<span>${data.pre_title}</span>
										<h1>${data.title}</h1>
										<p>${data.description}</p>
										<a href="${data.website_url.url}">
											${linkSvg()}
											<span>Visit Website</span>
										</a>
									</div>
									<div class="wo-p-he-me">
										<span>Year: ${data.year}</span>
										<span>Services: ${data.services}</span>
										<span>Industries: ${data.industries}</span>
									</div>
								</div>
							</header>
							${minimapGallery}
							<footer class="wo-p-f">
								<div class="wo-p-f-r">
									<img src="${nextProject.image.url + "&w=240&h=" + mHeight}" class="_me"/>
								</div>
								<div>
									<div class="wo-p-f-la t-br">
										<span>Next Work</span>
									</div>
									<div class="wo-p-f-de">
										<div class="wo-p-f-de-ti">
											<span>${nextProject.title}</span>
										</div>
										<div class="wo-p-f-de-se">
											<div>${nextServicesDivs}</div>
										</div>
									</div>
								</div>
							</footer>
						</div>
					</div>
					<div class="wo-p-i"></div>
				</div>
			</div>
		</div>
	`;
};
