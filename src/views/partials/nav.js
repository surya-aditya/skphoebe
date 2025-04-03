import { logoSvg, modeSvg } from "./svg";

export const navDesktop = () => {
	return html`
		<div id="n">
			<div id="n0">${logoSvg()}</div>
			<div id="n1">
				<a href="/" id="n1-0">Works</a>
				<a href="/" id="n1-1">General</a>
				<a href="/" id="n1-2">Playground</a>
			</div>
			<div id="n2">
				<span>Mode</span>
				<div>${modeSvg()}</div>
			</div>
		</div>
	`;
};
export const headerMobile = (shared, copyright) => {
	const social = shared.social_media;

	let socialMedia = "";

	for (let i = 0; i < social.length; i++) {
		const socialItem = social[i];

		socialMedia += html`
			<li>
				<a href="${socialItem.link.url}" target="_blank" rel="noopener">
					<span class="y_"><span class="y">${socialItem.label_}.</span></span>
				</a>
			</li>
		`;
	}

	return html`
		<div id="n">
			<a href="/" id="n0">${logoSvg()}</a>
			<div id="n1">
				<div id="n1-br-l"></div>
				<div>
					<div id="n1-cur_">
						<span id="n1-cur">Works</span>
						<span> Close </span>
					</div>
				</div>
				<div id="n1-br-r"></div>
			</div>
			<div id="n2">${modeSvg()}</div>
			<div id="n-m">
				<div id="n-bg"></div>
				<div id="n-li">
					<a href="/" id="n-li-0">
						<span class="y_">
							<span class="y">Works</span>
						</span>
					</a>
					<a href="/general" id="n-li-1">
						<span class="y_">
							<span class="y">General</span>
						</span>
					</a>
					<a href="/playground" id="n-li-2">
						<span class="y_">
							<span class="y">Playground</span>
						</span>
					</a>
				</div>
				<div id="n-f">
					<div id="n-con">
						<div>
							<span class="t-br y_">
								<span class="y">Email</span>
							</span>
							<a href="mailto:${shared.email}">
								<span class="y_">
									<span class="y">${shared.email}</span>
								</span>
							</a>
						</div>
						<div>
							<span class="t-br y_">
								<span class="y">Social Media</span>
							</span>
							<ul>
								${socialMedia}
							</ul>
						</div>
					</div>
					<div id="n-cpr">
						<span class="y_">
							<span class="y">${copyright}</span>
						</span>
					</div>
					<a href="https://surya-aditya.com" target="_blank" rel="noopener">
						<span class="y_">
							<span class="y">Development by Surya Aditya</span>
						</span>
					</a>
				</div>
			</div>
		</div>
	`;
};
