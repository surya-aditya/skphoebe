import { isDef } from "./utils/dom";
import { BM, Cr, L } from "./utils/dom";

export default class Grid {
	constructor(options) {
		this.col = options[0];

		this.inDom = false;
		const doc = document;

		BM(this, ["key"]);
		L(doc, "a", "keydown", this.key);

		if (isDef(options[1])) {
			const newDiv = Cr("div");
			newDiv.id = "g-cta";
			doc.body.prepend(newDiv);

			BM(this, ["cta"]);

			L(newDiv, "a", "click", this.cta);
		}
	}

	cta() {
		this.c({
			esc: false,
			index: 0,
		});
	}

	key(event) {
		if (_A.isM) return;

		if ("Escape" === event.code && this.inDom) {
			this.c({ esc: true });
		} else if ("KeyG" === event.code && event.shiftKey) {
			this.c({ esc: false });
		}
	}

	c(event) {
		if (this.inDom) {
			if (event.esc || "o" === this.g.className) {
				this.r();
			} else {
				this.g.className = "o";
			}
		} else {
			this.a();
		}
	}

	r() {
		this.g.parentNode.removeChild(this.g);
		this.inDom = false;
	}

	a() {
		this.g = Cr("div");
		this.g.id = "g_";

		var gridContainerCols = Cr("div");
		gridContainerCols.id = "g";

		// Create the main grid columns
		for (let c = 0; c < this.col; c++) {
			var colDiv = Cr("div");
			gridContainerCols.appendChild(colDiv);
		}

		this.g.appendChild(gridContainerCols);
		document.body.prepend(this.g);
		this.inDom = true;
	}
}
