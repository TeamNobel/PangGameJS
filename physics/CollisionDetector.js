function circleRectangleCollision(circle, rectangle) {
	var circleDistanceX = abs(circle.x - rect.x);
	var circleDistanceY = abs(circle.y - rect.y);

	if (circleDistanceX > (rectangle.width / 2 + circle.r)) {
		return false;
	}
	if (circleDistanceY > (rectangle.height / 2 + circle.r)) {
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

	return (cornerDistance_sq <= Math.pow(circle.r, 2));
}

function circleCircleCollision(circle1, circle2) {
	return Math.pow((circle2.x - circle1.x), 2) +
		Math.pow((circle1.y - circle2.y), 2) <=
		Math.pow((circle1.radius + circle2.radius), 2)
}