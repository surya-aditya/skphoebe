import { Cl, Get } from "../../utils/dom";

export default class VideoInertia {
	init() {
		this.v = Get.tag("video");
		this.vL = this.v.length;
	}

	on() {
		if (_A.is.pl) return;

		if (!this.observer) {
			this.observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							if (entry.target.readyState > 2 && entry.target.paused) {
								entry.target.play();
							}
						} else {
							if (!entry.target.paused) {
								entry.target.pause();
							}
						}
					});
				},
				{
					threshold: 0.5,
				}
			);
		}

		this.v.forEach((video) => {
			this.observer.observe(video);
		});
	}

	off() {
		if (this.observer) {
			this.observer.disconnect();
			this.observer = null;
		}
	}
}
