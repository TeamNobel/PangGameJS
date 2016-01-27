function circleRectangleCollision(circle, rectangle) {
	var circleDistanceX = Math.abs(circle.x - rectangle.x);
	var circleDistanceY = Math.abs(circle.y - rectangle.y);

	if (circleDistanceX > (rectangle.width / 2 + circle.radius)) {
		return false;
	}
	if (circleDistanceY > (rectangle.height / 2 + circle.radius)) {
		return false;
	}

	if (circleDistanceX <= (rectangle.width / 2)) {
		return true;
	}
	if (circleDistanceY <= (rectangle.height / 2)) {
		return true;
	}

	var cornerDistance_sq = Math.pow((circleDistanceX - rectangle.width / 2), 2) +
		Math.pow((circleDistanceY - rectangle.height / 2), 2);

	return (cornerDistance_sq <= Math.pow(circle.radius, 2));
}

function checkForCanvasCollision(ball) {
	if (ball.y > canvas.height - ball.radius || ball.y < ball.radius) {
		ball.vy = -ball.vy;
	}
	if (ball.x > canvas.width - ball.radius || ball.x < ball.radius) {
		ball.vx = -ball.vx;
	}
}

function circleCircleCollision(circle1, circle2) {
	return Math.pow((circle2.x - circle1.x), 2) +
		Math.pow((circle1.y - circle2.y), 2) <=
		Math.pow((circle1.radius + circle2.radius), 2)
}

function rectangleRectangleCollision(rect1, rect2) {
	//return !(r1.x + r1.width < r2.x || r1.y + r1.height < r2.y || r1.x > r2.x + r2.width || r1.y > r2.y + r2.height);

	return !(rect1.x + rect1.width < rect2.x ||
	rect1.y + rect1.height < rect2.y ||
	rect1.x > rect2.x + rect2.width ||
	rect1.y > rect2.y + rect2.height);
}

function ballHookCollision(ball, hook){
	return !!(hook.x > ball.x - ball.radius && hook.x < ball.x + ball.radius && hook.y <= ball.y + ball.radius);
}