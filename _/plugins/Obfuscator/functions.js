export function generateRandomName(mapping = {}) {
	const length = 1;
	const firstChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$";
	const chars = "$_0123456789abcdefghijklmnopqrstuvwxyz_$";
	const maxNames = firstChars.length * chars.length;

	if (Object.values(mapping).length >= maxNames) {
		throw new Error("Exhausted all possible mangled names for length 2");
	}

	let name;
	do {
		name = "";
		name += firstChars[Math.floor(Math.random() * firstChars.length)];
		for (let i = 0; i < length; i++) {
			name += chars[Math.floor(Math.random() * chars.length)];
		}
	} while (Object.values(mapping).includes(name));

	return name;
}

export function mangleClassMethods(source, regex, mapping = {}) {
	return source.replace(
		/^\s*([$_a-zA-Z][$_a-zA-Z0-9]*)\s*\(/gm,
		(match, key) => {
			if (key === "constructor") return match;
			if (regex.test(key)) {
				if (!mapping[key]) mapping[key] = generateRandomName(2, mapping);
				return match.replace(key, mapping[key]);
			}
			return match;
		}
	);
}

export function mangleThisProperties(source, regex, mapping = {}) {
	return source.replace(/\.\s*([$_a-zA-Z][$_a-zA-Z0-9]*)/g, (match, key) => {
		if (regex.test(key)) {
			if (!mapping[key]) mapping[key] = generateRandomName(2, mapping);
			return "." + mapping[key];
		}
		return match;
	});
}

export function applyMapping(source, mapping) {
	for (const key in mapping) {
		const mangled = mapping[key];
		const reg = new RegExp("\\b" + key + "\\b", "g");
		source = source.replace(reg, mangled);
	}
	return source;
}

export function protectSelectors(source) {
	const protectedMap = {};
	let index = 0;
	// This regex matches .id("..."), .cl("..."), or .tag("...") (with either single or double quotes).
	const protectedRegex = /\.(id|cl|tag)\(\s*(".*?"|'.*?')\s*\)/g;
	const newSource = source.replace(protectedRegex, (match, method, str) => {
		const token = `__PROTECTED_${index}__`;
		protectedMap[token] = match;
		index++;
		return token;
	});
	return { newSource, protectedMap };
}

export function restoreSelectors(source, protectedMap) {
	for (const token in protectedMap) {
		const original = protectedMap[token];
		const tokenRegex = new RegExp(token, "g");
		source = source.replace(tokenRegex, original);
	}
	return source;
}
