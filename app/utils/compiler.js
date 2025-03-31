import path from "node:path";

// Define the html function once
const html = (strings, ...values) => {
	return strings.reduce((result, string, i) => {
		return result + string + (values[i] || "");
	}, "");
};

globalThis.html = html;

export const minifyHTML = (htmlString) => {
	return htmlString
		.replace(/\n*/g, "") // Remove newlines
		.replace(/\s{2,}/g, " ")
		.replace(/>\s+</g, "><") // Remove spaces between tags
		.replace(/\s+(?=[^<]*>)/g, " ") // Preserve spaces between attribute names and values
		.trim();
};

const viewPath = "../../src/views";
export const compileTpl = async (filePath, data) => {
	const tplPath = path.join(import.meta.dir, viewPath, filePath + ".js");
	const module = await import(tplPath);
	const rawHTML = module.template(data);
	return minifyHTML(rawHTML);
};

export const autoTypographicQuotes = (content) => {
	return content
		.replace(/"([^"]*)"/g, "“$1”")
		.replace(/'([^']*)'/g, "‘$1’")
		.replace(/"/g, "“")
		.replace(/'/g, "‘");
};

const stylePath = "../../src/css";
export async function compileCSS(fileName) {
	try {
		const cssPath = path.join(import.meta.dir, stylePath, fileName + ".css");
		const file = Bun.file(cssPath);
		const cssData = await file.text();

		const css = cssData
			.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "")
			.replace(/\s+/g, " ")
			.replace(/\s*([{}:;,>])\s*/g, "$1")
			.trim();

		return css;
	} catch (err) {
		throw new Error(`Failed to compile CSS: ${err.message}`);
	}
}

const scriptPath = "../../public/js";
export async function getJS(fileName) {
	try {
		const jsPath = path.join(import.meta.dir, scriptPath, fileName + ".js");
		const file = Bun.file(jsPath);
		const jsData = await file.text();

		return jsData;
	} catch (err) {
		throw new Error(`Failed to compile JS: ${err.message}`);
	}
}
