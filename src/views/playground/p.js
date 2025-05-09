export const template = (data) => {
	const gallery = data.list;
	const galleryL = gallery.length;

	let playgroundFull = "";
	let playgroundContent = "";

	for (let i = 0; i < galleryL; i++) {
		const item = gallery[i];

		const aspectRatio = 1.778;
		const thumbnail = item.full_size_image.url;

		playgroundFull += html`
			<li class="pl-p-li">
				<img
					src="${thumbnail}"
					alt="${item.title} - Full Size"
					style="aspect-ratio: ${aspectRatio}"
					width="100%"
					height="100%"
				/>
			</li>
		`;

		playgroundContent += html`
			<li>
				<div class="pl-p-ti">${item.title || ""}</div>
				<div class="pl-p-de">${item.description || ""}</div>
			</li>
		`;
	}

	return html` <div id="pl-p_">
		<div id="pl-p-bg"></div>
		<div id="pl-p">
			<div>
				<ul id="pl-p-co">
					${playgroundContent}
				</ul>
				<div id="pl-p-pagi_">
					<div id="pl-p-pagi">
						<span id="pl-p-pagi-c">01</span>
						<span id="pl-p-pagi-s"> / </span>
						<span id="pl-p-pagi-t">${galleryL}</span>
					</div>
				</div>
				<div id="pl-p-cta_">
					<a id="pl-p-cta">
						<svg role="graphics-symbol">
							<use href="#enter"></use>
						</svg>
						<span>Visit Website</span>
					</a>
				</div>
				<div id="pl-p-cl_">
					<div id="pl-p-cl" class="t-br">
						<span>Close</span>
					</div>
				</div>
			</div>
			<ul>
				${playgroundFull}
			</ul>
		</div>
	</div>`;
};
