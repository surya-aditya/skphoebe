import { logoSvg, modeSvg } from "./svg";

export const navDesktop = () => {
	return html`
		<div id="n">
			<div id="n0">${logoSvg()}</div>
			<div id="n1">
				<a href="/" id="n1-0">Index</a>
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
export const headerMobile = () => {
	return html`
		<div id="n">
			<div id="n0">${logoSvg()}</div>
			<div id="n1"><span>[ Index ]</span></div>
			<div id="n2">
				<span>Mode</span>
				<div>${modeSvg()}</div>
			</div>
		</div>
	`;
};
