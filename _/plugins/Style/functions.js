let vars = {};

// Config
const desktop = {
	w: 1440,
	h: 900,
};

const mobile = {
	w: 393,
	h: 856,
};

// Px to Vw
const vw = {
	d: (px) => `${(px / desktop.w) * 100}vw`,
	m: (px) => `${(px / mobile.w) * 100}vw`,
};

// Px to Vh
const vh = {
	d: (px) => `${(px / desktop.h) * 100}vh`,
	m: (px) => `${(px / mobile.h) * 100}vh`,
};

export function calVw(contents) {
	let prev;
	let newContents = contents;
	const regex = /([dm])-vw\(([^)]+)\)/g;
	while (prev !== newContents) {
		prev = newContents;
		newContents = newContents.replace(regex, (match, device, innerExpr) => {
			const expr = innerExpr.trim();
			if (/^[\d+\-*/().\s]+$/.test(expr)) {
				try {
					const evaluated = Function('"use strict";return (' + expr + ")")();
					return device.toLowerCase() === "d"
						? vw.d(evaluated)
						: vw.m(evaluated);
				} catch (err) {
					return match;
				}
			}
			return match;
		});
	}
	return newContents;
}

export function calVh(contents) {
	let prev;
	let newContents = contents;
	const regex = /([dm])-vh\(([^)]+)\)/g;
	while (prev !== newContents) {
		prev = newContents;
		newContents = newContents.replace(regex, (match, device, innerExpr) => {
			const expr = innerExpr.trim();
			if (/^[\d+\-*/().\s]+$/.test(expr)) {
				try {
					const evaluated = Function('"use strict";return (' + expr + ")")();
					return device.toLowerCase() === "d"
						? vh.d(evaluated)
						: vh.m(evaluated);
				} catch (err) {
					return match;
				}
			}
			return match;
		});
	}
	return newContents;
}

export function resolveVars(css) {
	return css.replace(/var\(\s*(--[^)]+)\s*\)/g, (match, name) => {
		const key = name.trim();
		if (vars[key] !== undefined) return vars[key];
		return match;
	});
}

export function extractRoot(css, exclude = []) {
	const rootRegex = /:root\s*{([\s\S]*?)}/;
	const match = css.match(rootRegex);
	if (!match) return css;
	const rootContent = match[1];
	const lines = rootContent.split(";");
	vars = {};
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed) continue;
		const parts = trimmed.split(":");
		if (parts.length < 2) continue;
		const varName = parts[0].trim();
		const value = parts.slice(1).join(":").trim();
		vars[varName] = value;
	}
	const newCss = css.replace(rootRegex, "").trim();
	return newCss;
}

// Async helper that replaces matches using an asynchronous replacement function.
async function asyncReplace(str, regex, asyncFn) {
	let result = "";
	let lastIndex = 0;
	let match;
	while ((match = regex.exec(str)) !== null) {
		result += str.slice(lastIndex, match.index);
		const replacement = await asyncFn(...match);
		result += replacement;
		lastIndex = match.index + match[0].length;
	}
	result += str.slice(lastIndex);
	return result;
}

// Asynchronously resolve calc() expressions.
export async function resolveCalc(css) {
	const regex = /calc\(([^()]+)\)/g;
	return await asyncReplace(css, regex, async (match, innerExpr) => {
		const processed = innerExpr.trim();
		if (/(?:[dm]-(?:vw|vh)\s*\()/.test(processed)) return match;

		if (/^[\d+\-*/().\s]+$/.test(processed)) {
			try {
				const evaluated = await Promise.resolve(
					Function('"use strict";return (' + processed + ")")()
				);
				const unitMatch = processed.match(/([a-zA-Z%]+)\s*$/);
				const unit = unitMatch ? unitMatch[1] : "";
				return evaluated + unit;
			} catch (err) {
				return match;
			}
		}
		return `calc(${processed})`;
	});
}
