var Rectangle = function (x, y, width, height) {
	if (!x || !y || !width || !height) {
		var errorMsg = "Missing:";
		if (!x) {
			errorMsg += " 'x' ";
		}

		if (!y) {
			errorMsg += " 'y' ";
		}

		if (!width) {
			errorMsg += " 'width' ";
		}

		if (!height) {
			errorMsg += " 'height' ";
		}

		throw new Error(errorMsg);
	}

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};