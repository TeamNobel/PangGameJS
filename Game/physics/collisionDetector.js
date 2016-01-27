function circleRectangleCollision(circle, rectangle) {
	var collisionPoints = {
            // horizontal diameter
            0: {x: circle.x - circle.radius, y: circle.y}, // left
            1: {x: circle.x + circle.radius, y: circle.y}, // right
            //vertical diameter
            2: {x: circle.x, y: circle.y - circle.radius}, // top
            3: {x: circle.x, y: circle.y + circle.radius}, // bottom
            // inner diagonal points
            4: {x: circle.x + circle.radius / 2, y: circle.y - circle.radius / 2}, // top right
            5: {x: circle.x + circle.radius /2 , y: circle.y + circle.radius / 2}, // bottom right
            6: {x: circle.x - circle.radius /2 , y: circle.y + circle.radius / 2}, // bottom left
            7: {x: circle.x - circle.radius /2 , y: circle.y - circle.radius / 2}, // top left
            // center
            8: {x: circle.x, y: circle.y}
        };

    for (var point in collisionPoints) {
        if (PointInsideRectangle(collisionPoints[point], rectangle)) { 
            return true;            
        }
    }

    return false;
}

function checkForCanvasCollision(ball) {
	if (ball.y > canvas.height - ball.radius || ball.y < ball.radius) {
		ball.vy = -ball.baseVy;
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

function PointInsideRectangle(point, rectangle) {
        
    if (point.x >= rectangle.x &&
        point.x <= rectangle.x + rectangle.width &&
        point.y >= rectangle.y &&
        point.y <= rectangle.y + rectangle.height) {

        return true;
    }

    return false;
}