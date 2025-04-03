import path from "path";

export function cleanUrl(url) {
	try {
		const urlObj = new URL(url);
		return `${urlObj.origin}${urlObj.pathname}`;
	} catch (error) {
		return;
	}
}

export let version = 0;

export async function setVersion() {
	const now = new Date();
	const second = now.getSeconds();

	return btoa(second);
}

export function getVersion() {
	const now = new Date();
	const second = now.getSeconds();

	return btoa(second);
}

export function gcd(a, b) {
	return b === 0 ? a : gcd(b, a % b);
}

export function aspectRatio(width, height) {
	const divisor = gcd(width, height);
	const result = {
		width: width / divisor,
		height: height / divisor,
	};

	return {
		wh: Number((result.width / result.height).toFixed(2)),
		hw: Number((result.height / result.width).toFixed(2)),
	};
}

export function getContentType(filePath) {
	const ext = path.extname(filePath);
	switch (ext) {
		case ".js":
			return "application/javascript";
		case ".css":
			return "text/css";
		case ".html":
			return "text/html";
		case ".json":
			return "application/json";
		default:
			return "application/octet-stream";
	}
}
