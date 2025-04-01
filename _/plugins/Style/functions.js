/**
 * Resolve simple numeric division within root CSS variables.
 * Example: "--vw: calc(100vw / 1920);" → "--vw: .052083vw;"
 */
function resolveRootNumericDivisions(css) {
	const vars = {};
	css = css.replace(/:root\s*{([^}]+)}/, (match, content) => {
		const updated = content.replace(
			/--([\w-]+):\s*calc\(\s*(\d+(?:\.\d+)?)\s*(vw|vh|px|rem|em|%)\s*\/\s*(\d+(?:\.\d+)?)\s*\);/g,
			(_, name, num, unit, div) => {
				const resolved = (parseFloat(num) / parseFloat(div)).toFixed(6);
				vars[`--${name}`] = `${resolved}${unit}`;
				return `--${name}: ${resolved}${unit};`;
			}
		);
		return `:root {${updated}}`;
	});
	return { css, vars };
}

/**
 * Replace CSS variable references within :root using resolved values.
 * Example: "var(--vw)" → ".052083vw"
 */
function replaceRootVars(css, vars) {
	return css.replace(/:root\s*{([^}]+)}/, (match, content) => {
		const updated = content.replace(
			/var\((--[\w-]+)\)/g,
			(_, varName) => vars[varName] || `var(${varName})`
		);
		return `:root {${updated}}`;
	});
}

/**
 * Resolve simple multiplication expressions with numeric values.
 * Example: "--m: calc(40 * .052083vw);" → "--m: 2.08332vw;"
 */
function resolveSimpleMultiplications(css) {
	return css.replace(
		/calc\(\s*([\d.]+)\s*\*\s*([\d.]+)(vw|vh|px|rem|em|%)\s*\)/g,
		(_, num1, num2, unit) => {
			const result = (parseFloat(num1) * parseFloat(num2)).toFixed(6);
			return `${result}${unit}`;
		}
	);
}

/**
 * Extract resolved variables from :root.
 * Returns an object with key-value pairs of variables.
 */
function extractRootVariables(css) {
	const vars = {};
	const rootMatch = css.match(/:root\s*{([^}]+)}/);

	if (!rootMatch) return vars;

	rootMatch[1].replace(/--([\w-]+):\s*([^;]+);/g, (_, name, value) => {
		vars[`--${name}`] = value.trim();
	});

	return vars;
}

/**
 * Replace all occurrences of var(--variable) in CSS using extracted variables.
 */
function replaceCssVariables(css, vars) {
	return css.replace(/var\((--[\w-]+)\)/g, (_, varName) => {
		return vars[varName] || `var(${varName})`;
	});
}

/**
 * Resolve nested calc expressions that contain arithmetic operations.
 * Clearly handles multiple nested calc() and arithmetic.
 */
function resolveNestedCalcs(css) {
	return css.replace(/calc\(([^()]+)\)/g, (match, expression) => {
		try {
			// Remove potential CSS units (vw,vh,px,rem,etc.) to compute safely
			const unitMatch = expression.match(/(vw|vh|px|rem|em|%)/);
			const unit = unitMatch ? unitMatch[1] : "";

			// Replace multiple spaces for clean eval
			const cleanExpression = expression
				.replace(/(vw|vh|px|rem|em|%)/g, "")
				.replace(/\s+/g, " ")
				.trim();

			const result = Function(`return ${cleanExpression}`)();

			const roundedResult = parseFloat(result.toFixed(6));

			return `${roundedResult}${unit}`;
		} catch {
			// Return original if unable to resolve
			return match;
		}
	});
}

/**
 * Clear and explicit CSS pipeline that resolves CSS calculations
 * with scoped contexts clearly handling variable inheritance.
 */
export function processCssWithScopedContext(cssContent, globalVars = {}) {
	const { css: step1Css, vars: rootVars } =
		resolveRootNumericDivisions(cssContent);
	const scopedVars = { ...globalVars, ...rootVars };

	let processedCss = replaceRootVars(step1Css, scopedVars);
	processedCss = resolveSimpleMultiplications(processedCss);

	const extractedVars = extractRootVariables(processedCss);
	const allVars = { ...scopedVars, ...extractedVars };

	processedCss = replaceCssVariables(processedCss, allVars);
	processedCss = resolveNestedCalcs(processedCss);

	processedCss = removeRootSelector(processedCss);

	return { processedCss, extractedVars: allVars };
}

/**
 * Remove :root selector from CSS after processing is complete.
 */
function removeRootSelector(css) {
	return css.replace(/:root\s*{[\s\S]*?}\s*/g, "").trim();
}
