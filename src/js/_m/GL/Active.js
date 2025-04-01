export default class Active {
	constructor(type) {
		const _app = _A;

		// Type
		this.t = type;

		// Properties
		this.prop = Object.keys(_app.data.gl);

		// Values
		this._ = {};
		this._L = this.prop.length;

		this.static(true);
	}

	static(isFirst = false) {
		let route = _A.route.new[this.t];

		if (isFirst && (route === "/contact" || route === "/talents")) route = "/";

		for (let i = 0; i < this._L; i++) {
			const prop = this.prop[i];
			this._[prop] = prop === route;
		}
	}

	mutation() {
		const route = _A.route;
		for (let i = 0; i < this._L; i++) {
			const prop = this.prop[i];
			this._[prop] = prop === route.new[this.t] || i === route.old[this.t];
		}
	}
}
