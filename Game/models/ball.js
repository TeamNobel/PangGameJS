var Ball = function (circle, color) {
	this.x = circle.x;
	this.y = circle.y;
	this.maxHeight = circle.y;
	this.vx = 2;
	this.vy = 0;
	//this.mass = Math.round(circle.radius * circle.radius * Math.PI);
	this.radius = circle.radius;
	this.color = color;
};

Ball.prototype.getCurrentCircle = function (){
	return new Circle(this.x, this.y, this.radius);
};

Ball.prototype.draw = function (ctx) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fillStyle = this.color;
	ctx.fill();
};
