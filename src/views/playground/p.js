export const template = (data) => {
	const gallery = data.list;

	let playgroundFull = "";

	for (let i = 0; i < gallery.length; i++) {
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
	}

	return html` <div id="pl-p_">
		<div id="pl-p-bg"></div>
		<div id="pl-p">
			<div>
				<div id="pl-p-cl">Close</div>
			</div>
			<ul>
				${playgroundFull}
			</ul>
		</div>
	</div>`;
};
