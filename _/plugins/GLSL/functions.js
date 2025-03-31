function* generate() {
	const chars = "abcdefghijklmnopqrstuvwxyz";
	let length = 1;

	while (true) {
		for (let i = 0; i < 26 ** length; i++) {
			let name = "";
			for (let temp = i, j = 0; j < length; j++, temp = Math.floor(temp / 26)) {
				name = chars[temp % 26] + name;
			}
			yield "z_" + name;
		}
		length++;
	}
}

export function createMangler(wordsToMangle) {
	const mangleMap = new Map();
	const mangleNameGenerator = generate();

	wordsToMangle.forEach((word) =>
		mangleMap.set(word, mangleNameGenerator.next().value)
	);

	const mangleCode = (code) => {
		mangleMap.forEach((mangledName, word) => {
			code = code.replace(new RegExp(`\\b${word}\\b`, "g"), mangledName);
		});
		return code;
	};

	return { mangleMap, mangleCode };
}

export function minify(glslCode, mangleCode) {
	const extRegex = /#extension\s+GL_OES_standard_derivatives\s*:\s*enable/g;
	const extDirective = glslCode.match(extRegex);
	let code = glslCode.replace(extRegex, "");

	code = mangleCode(code)
		.replace(/\/\/.*$|\/\*[\s\S]*?\*\//gm, "")
		.replace(/\s*([{}();,:=<>+\-*/])\s*/g, "$1")
		.replace(/\s+/g, " ")
		.replace(/^\s+|\s+$/g, "");

	return extDirective ? `${extDirective[0]}\n${code}` : code;
}
