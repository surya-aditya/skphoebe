import { Cr, Re, Select } from "./dom";

export default class SL {
	constructor(e) {
		// Get the target element and initial text content.
		this.el = Select.el(e.el)[0];
		this.txt = this.el.innerHTML;
		this.txt = this.txt
			.replaceAll("</em> <em>", " ")
			.replaceAll("</strong> <strong>", " ");

		// Create a temporary container to work with innerHTML and child nodes.
		let tempDiv = Cr("div");
		tempDiv.innerHTML = this.txt;
		let childNodes = tempDiv.childNodes;
		let childCount = childNodes.length;
		this.arr = [];
		let index = 0;

		// Object to store indices for opening and closing parentheses.
		let parensIndices = {
			o: [],
			c: [],
		};

		// Iterate over all child nodes.
		for (let i = 0; i < childCount; i++) {
			let node = childNodes[i];
			if (node.nodeType === 3) {
				// Text node.
				let words = node.nodeValue.split(" ");
				let wordsCount = words.length;
				for (let j = 0; j < wordsCount; j++) {
					if (words[j] === "(") {
						words[j] = "";
						parensIndices.o.push(index + 1);
					} else if (words[j].charAt(0) === ")") {
						words[j] = words[j].substring(1);
						parensIndices.c.push(index - 1);
					}
					let wordContent = words[j] === "" ? " " : words[j];
					this.arr[index] = {
						type: "txt",
						word: wordContent,
						par: {
							o: false,
							c: false,
						},
					};
					index++;
				}
			} else if (node.tagName === "BR") {
				// Line break.
				this.arr[index] = {
					type: "br",
					par: {
						o: false,
						c: false,
					},
				};
				index++;
			} else if (
				node.tagName === "A" ||
				node.tagName === "EM" ||
				node.tagName === "STRONG" ||
				node.tagName === "SPAN"
			) {
				// Anchor or similar tag.
				let outerHTML = node.outerHTML;
				let innerHTML = node.innerHTML;
				let parts = outerHTML.split(">" + innerHTML + "<");
				this.arr[index] = {
					type: "tag",
					start: parts[0] + ">",
					end: "<" + parts[1],
					word: innerHTML.split(" "),
					par: {
						o: false,
						c: false,
					},
				};
				index++;
			}
		}

		this.arrL = this.arr.length;

		// Update parenthesis flags for each word.
		let keys = ["o", "c"];
		for (let k = 0; k < keys.length; k++) {
			let key = keys[k];
			let indicesLength = parensIndices[key].length;
			for (let j = 0; j < indicesLength; j++) {
				this.arr[parensIndices[key][j]].par[key] = true;
			}
		}
	}

	resize(e) {
		// Reset innerHTML and get target width.
		this.el.innerHTML = this.txt;
		let availableWidth = this.gW(this.el);

		// Create a temporary div for measuring text.
		let tempDiv = Cr("div");
		let tempStyle = tempDiv.style;
		tempStyle.visibility = "hidden";
		tempStyle.position = "absolute";
		tempStyle.whiteSpace = "nowrap";

		// Get computed style from the original element.
		let computedStyle = getComputedStyle(this.el);
		tempStyle.fontFamily = computedStyle.fontFamily;
		tempStyle.fontSize = computedStyle.fontSize;
		tempStyle.fontWeight = computedStyle.fontWeight;
		tempStyle.letterSpacing = computedStyle.letterSpacing;

		// Prepend the temporary element to the document body.
		document.body.prepend(tempDiv);

		// Get text indent and adjust available width accordingly.
		let textIndent = parseFloat(computedStyle.textIndent);
		let hasIndent = textIndent > 0;
		let adjustIndent = true;

		function checkIndent(currentLineIndex) {
			if (hasIndent && !adjustIndent && currentLineIndex > 0) {
				adjustIndent = true;
				availableWidth += textIndent;
			}
		}

		if (hasIndent) {
			availableWidth -= textIndent;
			adjustIndent = false;
		}

		let finalHTML = "";
		let lines = [];
		let lineIndex = 0;
		let displayLine = "";
		let measuredLine = "";

		// Process each segment stored in this.arr.
		for (let i = 0; i < this.arrL; i++) {
			let segment = this.arr[i];
			checkIndent(lineIndex);

			if (segment.type === "txt") {
				let word = segment.word;
				// Add parenthesis if flagged.
				if (segment.par.o) {
					word = "(" + word;
				}
				if (segment.par.c) {
					word = word + ")";
				}
				let separator = " ";
				// Avoid duplicate spaces.
				if (word === " ") {
					separator = "";
				}
				tempDiv.innerHTML = displayLine + word;
				if (this.gW(tempDiv) > availableWidth) {
					if (measuredLine.trim() !== "") {
						lines[lineIndex++] = measuredLine.trim();
					}
					displayLine = word + separator;
					measuredLine = word + separator;
				} else {
					displayLine = displayLine + word + separator;
					measuredLine = measuredLine + word + separator;
				}
			} else if (segment.type === "tag") {
				let tagStart = segment.start;
				let tagEnd = segment.end;
				if (segment.par.o) {
					tagStart = "(" + tagStart;
				}
				if (segment.par.c) {
					tagEnd = tagEnd + ")";
				}
				let wordsArray = segment.word;
				let wordsCount = wordsArray.length;
				let lastIndex = wordsCount - 1;

				// Remove trailing whitespace.
				displayLine = this.rLS(displayLine);
				measuredLine = this.rLS(measuredLine);
				let tagLine = "";
				for (let j = 0; j < wordsCount; j++) {
					checkIndent(lineIndex);
					let space = j === lastIndex ? "" : " ";
					let word = wordsArray[j];
					tagLine += word;
					let composedTag = tagStart + tagLine + tagEnd;
					tempDiv.innerHTML = displayLine + composedTag;
					if (this.gW(tempDiv) > availableWidth) {
						if (j === 0) {
							lines[lineIndex++] = measuredLine.trim();
						} else {
							measuredLine = measuredLine.trim() + tagEnd;
							lines[lineIndex++] = measuredLine;
						}
						displayLine = "";
						tagLine = word + space;
						measuredLine =
							j === lastIndex
								? tagStart + word + tagEnd + space
								: tagStart + word + space;
					} else {
						tagLine += space;
						let displayedWord = word;
						if (j === 0) {
							displayedWord = tagStart + displayedWord;
						}
						if (j === lastIndex) {
							displayedWord += tagEnd;
						}
						measuredLine = measuredLine + displayedWord + space;
					}
					if (j === lastIndex) {
						displayLine += tagStart + tagLine + tagEnd;
					}
				}
			} else if (segment.type === "br") {
				// Force new line for break.
				lines[lineIndex++] = measuredLine.trim();
				displayLine = "";
				measuredLine = "";
			}
		}

		// Add the last line if it isn't already added.
		let trimmedMeasured = measuredLine.trim();
		if (trimmedMeasured !== "" && trimmedMeasured !== lines[lineIndex - 1]) {
			lines[lineIndex++] = trimmedMeasured;
		}

		// Wrap each line with tag provided in e.tag.
		let finalStartTag = e.tag.start;
		let finalEndTag = e.tag.end;
		for (let i = 0; i < lineIndex; i++) {
			let content = lines[i] === "" ? "&nbsp;" : lines[i];

			if (e.char) {
				const charStart = e.char.start || "";
				const charEnd = e.char.end || "";
				content = content
					.split("")
					.map(
						(char) => `${charStart}${char === " " ? "&nbsp;" : char}${charEnd}`
					)
					.join("");
			}

			finalHTML += finalStartTag + content + finalEndTag;
		}

		// Remove the temporary element.
		tempDiv.parentNode.removeChild(tempDiv);
		this.el.innerHTML = finalHTML;
	}

	// Remove trailing whitespace.
	rLS(e) {
		return e.replace(/\s?$/, "");
	}

	// Return the width of an element.
	gW(e) {
		return Re(e).width;
	}
}
