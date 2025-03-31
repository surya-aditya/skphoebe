import { getContentType } from ".";

const securityHeaders = {
	"Content-Security-Policy":
		"default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none';",
	"X-Content-Type-Options": "nosniff",
	"X-Frame-Options": "DENY",
	"Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload", // HSTS
	"Referrer-Policy": "no-referrer",
	"Permissions-Policy": "geolocation=(), microphone=(), camera=()",
};

export async function serveStatic(req, filePath, compressionType = "br") {
	const acceptEncoding = req.headers.get("Accept-Encoding") || "";
	const supportsCompression = acceptEncoding.includes(compressionType);

	const compressedPath = filePath + (compressionType === "br" ? ".br" : ".gz");
	const encoding = compressionType === "br" ? "br" : "gzip";

	if (supportsCompression && (await Bun.file(compressedPath).exists())) {
		const compressedFile = await Bun.file(compressedPath).arrayBuffer();
		return new Response(compressedFile, {
			headers: {
				...securityHeaders,
				"Content-Type": getContentType(filePath),
				"Content-Encoding": encoding,
			},
		});
	}

	if (await Bun.file(filePath).exists()) {
		const file = await Bun.file(filePath).arrayBuffer();
		return new Response(file, {
			headers: {
				...securityHeaders,
				"Content-Type": getContentType(filePath),
			},
		});
	}

	return null;
}
