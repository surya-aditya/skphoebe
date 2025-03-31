import { Ga } from "./dom";
import { Dist } from "./math";

export const SvgShapeL = function (element) {
	if (element.tagName === "circle") {
		const radius = Ga(element, "r");
		return 2 * radius * Math.PI;
	}

	if (element.tagName === "line") {
		let x1 = Ga(element, "x1");
		let x2 = Ga(element, "x2");
		let y1 = Ga(element, "y1");
		let y2 = Ga(element, "y2");
		x2 -= x1;
		y2 -= y1;
		return Math.sqrt(x2 * x2 + y2 * y2);
	}

	if (element.tagName === "polyline") {
		let totalLength = 0;
		let previousPoint = null;
		const numberOfPoints = element.points.numberOfItems;

		for (let i = 0; i < numberOfPoints; i++) {
			const currentPoint = element.points.getItem(i);
			if (i > 0) {
				totalLength += Dist(
					currentPoint.x - previousPoint.x,
					currentPoint.y - previousPoint.y
				);
			}
			previousPoint = currentPoint;
		}
		return totalLength;
	}

	return element.getTotalLength();
};

export const SvgSplit = function (pathString) {
	const segments = pathString.split(" ");
	const values = [];

	for (let i = 0; i < segments.length; i++) {
		const coordinates = segments[i].split(",");
		for (let j = 0; j < coordinates.length; j++) {
			let value = coordinates[j];
			value = isNaN(value) ? value : parseFloat(value);
			values.push(value);
		}
	}
	return values;
};
