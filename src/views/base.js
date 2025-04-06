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
