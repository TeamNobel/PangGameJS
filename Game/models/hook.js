var Hook = function (x) {
	this.x = x;
	this.y = canvas.height;
	this.height = 0;
	this.width = 3;
	this.destroy = false;
	this.draw = function () {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = "silver";
		ctx.fill();
		ctx.closePath();

		this.y -= 2;
		this.height += 2;

		this.destroy = (this.y < 0);
	}
};
