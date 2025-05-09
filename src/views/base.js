import { font as Font } from "./partials/metadata";

export const template = (data) => {
	const APP = JSON.stringify(data._A);
	const inlineScript = `
		_A=${APP};const v=_A.config.v,n=window.navigator,d=document,a=/Mobi|Android|Tablet|iPad|iPhone/.test(n.userAgent)||"MacIntel"===n.platform&&n.maxTouchPoints>2?"m":"d",l=d.createElement("link");l.href="/css/"+a+".css"+v,l.rel="stylesheet",d.head.appendChild(l);const s=d.createElement("script");s.src="/js/"+a+".js"+v,d.onreadystatechange=e=>{"complete"===d.readyState&&(d.body.setAttribute("data-th",localStorage.getItem("th")||"l"),d.body.appendChild(s))};`;

	return html`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
				/>
				<meta name="format-detection" content="telephone=no" />
				<style>
					${data.preCSS}
				</style>
				<link rel="canonical" href="https://artemmilitonian.com" />
				<meta name="robots" content="noindex, nofollow" />
				<title>Boilerplate</title>
				<meta
					name="description"
					content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
				/>
				<base href="/" />
				${Font()}
				<script>
					${inlineScript};
				</script>
			</head>
			<body>
				<div id="_s">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
					>
						<symbol id="enter" viewBox="0 0 26 23" fill="none">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M0 0H2.70588V14.8824L14.8824 14.8824V10.1148C14.8824 9.88327 14.9984 9.66951 15.1862 9.55495C15.374 9.44038 15.6048 9.44265 15.7907 9.56088L25.4116 15.6813C25.594 15.7974 25.7059 16.0079 25.7059 16.2353C25.7059 16.4627 25.594 16.6732 25.4116 16.7893L15.7907 22.9097C15.6048 23.0279 15.374 23.0302 15.1862 22.9156C14.9984 22.8011 14.8824 22.5873 14.8824 22.3557V17.5882H2.70588H0V14.8824V0Z"
								fill="currentColor"
							/>
						</symbol>
					</svg>
				</div>
				<div id="lo">
					<div id="lo-bg"></div>
					<div id="lo-pr">
						<div></div>
					</div>
					<div id="lo-nu_">
						<div id="lo-nu"></div>
					</div>
				</div>
			</body>
		</html>
	`;
};
