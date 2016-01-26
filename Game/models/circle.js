var Circle = function (x, y, radius) {
	if (!x || !y || !radius) {
		var errorMsg = "Missing:";

		if (!x) {
			errorMsg += " 'x' ";
		}

		if (!y) {
			errorMsg += " 'y' ";
		}

		if (!radius) {
			errorMsg += " 'radius' ";
		}

		throw new Error(errorMsg);
	}

	this.x = x;
	this.y = y;
	this.radius = radius;
};