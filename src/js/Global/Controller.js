import Rotate from "./Rotate";
import Window from "./Window";
import { Router } from "./Router";

import { BM, Fetch, Get, GetSe, L, PD, isUnd, rTS } from "../utils/dom";

export default class Controller {
	constructor(data) {
		const _app = _A;
		const d = data[0];
		const engine = data[1];
		const mutation = data[2];
		const intro = data[3];

		_app.intro = true;
		_app.mutating = false;
		_app.page = {};

		this.trM = mutation;
		this.isD = d;
		this.d = d ? "d" : "m";

		BM(this, ["eD"]);

		new Window(this.d);

		if (this.d === "m") new Rotate();
		_app.e = new engine();

		this.onPS();
		L(document, "a", "click", this.eD);

		new intro((callback) => this.intro(callback));
	}

	onPS() {
		let isReady = document.readyState !== "complete";

		onload = () => setTimeout(() => (isReady = false), 0);

		onpopstate = (event) => {
			if (isReady && document.readyState === "complete") {
				PD(event);
				event.stopImmediatePropagation();
			}

			const _app = _A;

			if (!isUnd(_app.config.routes)) {
				if (_app.mutating) {
					this.hPS();
				} else {
					_app.mutating = true;
					this.out(rTS(location.pathname), "back");
				}
			}
		};
	}

	eD(event) {
		const _app = _A;

		let target = event.target;
		let hasLink = false;
		let hasSubmit = false;

		while (target) {
			const tagName = target.tagName;
			if (tagName === "A") {
				hasLink = true;
				break;
			}

			if (
				(tagName === "INPUT" || tagName === "BUTTON") &&
				target.type === "submit"
			) {
				hasSubmit = true;
				break;
			}
			target = target.parentNode;
		}

		if (hasLink) {
			const href = target.href;
			const protocol = new URL(href).protocol;

			if (
				!target.hasAttribute("target") &&
				protocol !== "mailto:" &&
				protocol !== "tel:"
			) {
				PD(event);
				if (!_app.mutating) {
					const path = href.replace(/^.*\/\/[^/]+/, "");

					if (path === _app.route.new.url) return;

					_app.mutating = true;
					this.out(path, target);
				}
			}
		} else {
			if (hasSubmit) PD(event);
		}
	}

	intro(callback) {
		const _app = _A;

		const currentUrl = _app.route.new.url;

		Fetch({
			url: currentUrl + "?device=" + this.d,
			type: "html",
			success: (response) => {
				const res = JSON.parse(response);

				_app.config.routes = res.routes;
				_app.data = res.data;

				this.cache = res.cache;

				this.add(document.body, "afterbegin", res.body);
				this._ = Get.id("_");

				let url = currentUrl;

				this.add(this._, "beforeend", this.cache[url].html);

				this.trM = new this.trM();
				callback();
			},
		});
	}

	out(pathname, direction) {
		Router(pathname);

		const _app = _A;

		_app.target = direction;
		_app.fromBack = "back" === direction;

		_app.page.update = () => {
			this.in();
		};

		this.trM.out();
	}

	in() {
		const _app = _A;
		const route = _app.route;
		const cache = this.cache[route.new.url];

		document.title = cache.title;

		if (_app.target !== "back") this.hPS();

		_app.page.insertNew = () => {
			this.add(this._, "beforeend", cache.html);
		};

		_app.page.removeOld = () => {
			const child = this._.children[0];
			child.parentNode.removeChild(child);
		};

		this.trM.in();
	}

	add(el, pos, text) {
		el.insertAdjacentHTML(pos, text);
	}

	hPS() {
		const _app = _A;

		const url = _app.route.new.url;
		history.pushState({ page: url }, "", url);
	}
}
