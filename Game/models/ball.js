var Ball = function (circle, color, baseVy) {
	this.x = circle.x;
	this.y = circle.y;
	this.vx = 2;
	this.vy = 0;
	this.radius = circle.radius;
	this.color = color;
	this.baseVy = baseVy; //Controls max height of the ball
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
