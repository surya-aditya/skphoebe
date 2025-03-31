import { R } from "./math";

// Opacity
export const Opacity = (el, val) => (el.style.opacity = val);

// Prevent Default
export const PD = (event) => {
	if (event.cancelable) event.preventDefault();
};

export const rmAttr = (el, attr) => {
	el.removeAttribute(attr);
};

// Create Element
export const Cr = (el) => document.createElement(el);

// Computed Style
export const CS = (el, prop) => parseFloat(getComputedStyle(el)[prop]);

// Pointer Events
export const pe = (el, val) => (el.style.pointerEvents = val);

export const PE = {
	a: (el) => pe(el, "all"),
	n: (el) => pe(el, "none"),
};

// Get Bounding Client Rect
export const Re = (el) => el.getBoundingClientRect();

// Top
export const Top = (elem) => {
	let offsetTop = 0;
	while (elem) {
		offsetTop += elem.offsetTop;
		elem = elem.offsetParent;
	}
	return R(offsetTop);
};

// Get index
export const index = (searchEl, array) => {
	var length = array.length;
	for (let i = 0; i < length; i++) if (searchEl === array[i]) return i;
	return -1;
};

// Get Index by List
export const IndexList = (el) => index(el, el.parentNode.children);

// Get Index by Class
export const IndexClass = (el, cl) => index(el, Get.cl(cl));

// Check browser agent
export const Snif = {
	uA: navigator.userAgent.toLowerCase(),
	get iPadIOS13() {
		return "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints;
	},
	get isMobile() {
		return /mobi|android|tablet|ipad|iphone/.test(this.uA) || this.iPadIOS13;
	},
	get isFF() {
		return -1 < this.uA.indexOf("firefox");
	},
};

// Get Element
export const Get = {
	id: (id, el = document) => el.getElementById(id),
	cl: (cl, el = document) => {
		const elements = el.getElementsByClassName(cl);
		return Array.from(elements).filter((el) => el instanceof HTMLElement);
	},
	tag: (tag, el = document) => {
		const elements = el.getElementsByTagName(tag);
		return Array.from(elements).filter((el) => el instanceof HTMLElement);
	},
};

export const GetSe = (query, el = document) => el.querySelector(query);
export const GetAll = (query, el = document) => el.querySelectorAll(query);

// Element Attribute
export const Ga = (el, attr) => el.getAttribute(attr);
export const Sa = (el, attr, val) => el.setAttribute(attr, val);

// Classlist
export const Cl = {
	co: (el, className) => el.classList.contains(className),
	a: (el, className) => el.classList.add(className),
	r: (el, className) => el.classList.remove(className),
};

export const isStr = (value) => typeof value === "string";
export const isObj = (value) => value === Object(value);
export const isArr = (value) => Array.isArray(value);
export const isDef = (value) => value !== undefined;
export const isUnd = (value) => value === undefined;

export const Select = {
	el: (el) => {
		const result = [];

		if (isStr(el)) {
			const selectorType = el.charAt(0);
			const selectorName = el.substring(1);

			if (selectorType === "#") {
				result[0] = Get.id(selectorName);
			} else if (selectorType === ".") {
				result.push(...Get.cl(selectorName));
			}
		} else {
			result[0] = el;
		}

		return result;
	},
	type: (el) => (el.charAt(0) === "#" ? "id" : "class"),
	name: (el) => el.substring(1),
};

export function Has(obj, props) {
	if (Array.isArray(props)) {
		return props.some((prop) =>
			Object.prototype.hasOwnProperty.call(obj, prop)
		);
	}
	return Object.prototype.hasOwnProperty.call(obj, props);
}

export function BM(object, methodNames) {
	const numMethods = methodNames.length;
	for (let i = 0; i < numMethods; i++) {
		const methodName = methodNames[i];
		object[methodName] = object[methodName].bind(object);
	}
}

export const Fetch = (options) => {
	const requestType = options.type;
	const isHtml = requestType === "html";

	let responseFormat = isHtml ? "text" : "json";

	const requestOptions = {
		method: isHtml ? "GET" : "POST",
		mode: "same-origin",
	};

	if (requestType !== "data") {
		requestOptions.headers = new Headers({
			"Content-type":
				requestType === "json"
					? "application/x-www-form-urlencoded"
					: "text/html",
		});
	}

	if (!isHtml) requestOptions.body = options.body;

	if (isDef(options.signal)) requestOptions.signal = options.signal;

	fetch(options.url, requestOptions)
		.then((response) => {
			if (response.ok) {
				return response[responseFormat]();
			} else if (options.error) {
				options.error();
			}
		})
		.then((data) => {
			options.success(data);
		})
		.catch((error) => {
			if (options.error) options.error();
		});
};

// Listeners
export const L = (target, method, eventName, callback, useCapture = false) => {
	const elements = Select.el(target);
	const numElements = elements.length;
	const actionType = method === "a" ? "add" : "remove";
	const eventMethod = `${actionType}EventListener`;
	const commonEventNames = [
		"mousemove",
		"mousewheel",
		"touchmove",
		"touchstart",
	];
	const options = commonEventNames.includes(eventName)
		? { passive: false }
		: undefined;

	for (let i = 0; i < numElements; i++) {
		const el = elements[i];
		if (el && typeof el[eventMethod] === "function") {
			el[eventMethod](eventName, callback, useCapture ? options : undefined);
		}
	}
};

// Transform
export const T = (element, xValue, yValue, unit = "%") => {
	unit = isUnd(unit) ? "%" : unit;
	element.style.transform = `translate3d(${xValue}${unit}, ${yValue}${unit}, 0)`;
};

export const Clone = (data) => JSON.parse(JSON.stringify(data));

export function Throttle(fn, limit) {
	let lastFunc;
	let lastRan;
	return function (...args) {
		const context = this;
		if (!lastRan) {
			fn.apply(context, args);
			lastRan = Date.now();
		} else {
			clearTimeout(lastFunc);
			lastFunc = setTimeout(function () {
				if (Date.now() - lastRan >= limit) {
					fn.apply(context, args);
					lastRan = Date.now();
				}
			}, limit - (Date.now() - lastRan));
		}
	};
}

export function cssTr(element, duration, timingFunction) {
	element.style.transition = `${duration}ms transform cubic-bezier(${timingFunction})`;
}

export const rTS = (url) => {
	return url.endsWith("/") ? url.slice(0, -1) : url;
};

export const Pause = (timer) => {
	isDef(timer) && timer.pause();
};

export const Stop = (task) => {
	if (isDef(task)) task.stop();
};

export function pad(num, length = 3) {
	return num.toString().padStart(length, "0");
}
