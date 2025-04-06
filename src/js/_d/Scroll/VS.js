import VirtualScroll_ from "./VirtualScroll_";

export const v = new VirtualScroll_();
export let VId = 0;

export default class VS {
	constructor(options) {
		this.o = options;
		this.i = VId;

		//prettier-ignore
		VId++
	}

	on() {
		v.a({
			id: this.i,
			cb: this.o.cb,
			k: this.o.k,
		});
	}

	off() {
		v.r(this.i);
	}
}
