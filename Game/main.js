var canvas = document.getElementById('canvas-main'),
	ctx = canvas.getContext('2d'),
	raf,
	background = new Image();

background.src = 'grass.jpg';
background.onload = function () {
	ctx.drawImage(background, 0, 0);
};

var balls = [
	new Ball(new Circle(10, 250, 6), 'blue'),
	new Ball(new Circle(100, 150, 15), 'red'),
	new Ball(new Circle(100, 100, 30), 'pink'),
	new Ball(new Circle(100, 50, 45), 'gold')
];

//function rectCircleColliding(circle, rect) {
//    var distX = Math.abs(circle.x - rect.x - rect.width / 2);
//    var distY = Math.abs(circle.y - rect.y - rect.height / 2);
//
//    if (distX > (rect.width / 2 + circle.radius)) {
//        return false;
//    }
//    if (distY > (rect.height / 2 + circle.radius)) {
//        return false;
//    }
//
//    if (distX <= (rect.width / 2)) {
//        return true;
//    }
//    if (distY <= (rect.height / 2)) {
//        return true;
//    }
//
//    var dx = distX - rect.width / 2;
//    var dy = distY - rect.height / 2;
//    return (dx * dx + dy * dy <= (circle.radius * circle.radius));
//}

function checkForCanvasColide(ball) {
	if (ball.y > canvas.height - ball.radius || ball.y < ball.radius) {
		ball.vy = -ball.vy;
	}
	if (ball.x > canvas.width - ball.radius || ball.x < ball.radius) {
		ball.vx = -ball.vx;
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	balls.forEach(function (ball) {
		checkForCanvasColide(ball);
		ball.draw(ctx);

		ball.x += ball.vx;
		ball.y += ball.vy;
		ball.vy += 0.1;
		if (ball.maxHeight > ball.y) {
			ball.y = ball.maxHeight;
		}
	});

	raf = window.requestAnimationFrame(draw);
}