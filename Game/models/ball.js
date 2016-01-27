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
	var gradient = ctx.createRadialGradient(this.x-this.radius/2,this.y,this.radius/8,this.x,this.y,this.radius);
	gradient.addColorStop(1,this.color);
	gradient.addColorStop(0,"white");
	ctx.fillStyle = gradient;
	ctx.fill();
};