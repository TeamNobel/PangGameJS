var canvas = document.getElementById('canvas-main'),
	ctx = canvas.getContext('2d'),
	raf,
	background = new Image();

background.src = 'grass.jpg';
background.onload = function () {
	ctx.drawImage(background, 0, 0);
};

var input = new Input();
attachListeners(input);

var balls = [
	new Ball(new Circle(10, 250, 6), 'blue'),
	new Ball(new Circle(500, 150, 15), 'red'),
	new Ball(new Circle(100, 100, 30), 'pink'),
	new Ball(new Circle(100, 50, 45), 'gold')
];

var rectangles = [];

var player = player = new Player(canvas.width / 2, canvas.height - 33);

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

	var playerBox = player.getCurrentBoundingBox();
	ctx.strokeRect(playerBox.x, playerBox.y, playerBox.width, playerBox.height);

	balls.forEach(function (ball) {
		ball.draw(ctx);

		//draw boxes around balls and player
		var ballCircle = ball.getCurrentCircle();
		ctx.arc(ballCircle.x, ballCircle.y, ballCircle.radius, 0, 0, true);
		ctx.stroke();
		//
	});

	rectangles.forEach(function (rectangle) {
		rectangle.draw()
	});

	tick();
	player.render(ctx);
	window.requestAnimationFrame(draw);
}

function tick() {
	balls.forEach(function (ball) {
		checkForCanvasColide(ball);

		ball.x += ball.vx;
		ball.y += ball.vy;
		ball.vy += 0.1;
		if (ball.maxHeight > ball.y) {
			ball.y = ball.maxHeight;
		}
	});

	if (input.space) {
		createHook(player.position.x + player.width / 2);
	}

	player.movement.right = !!input.right;
	player.movement.left = !!input.left;

	var playerBox = player.getCurrentBoundingBox();
	balls.forEach(function (ball) {
		var ballCircle = ball.getCurrentCircle();
		if (circleRectangleCollision(ballCircle, playerBox)) {
			console.log("Player collides with the " + ball.color + " ball");
		}
	});

	player.updateAnimationSettings();
}

function createHook(x) {
	if (rectangles.length === 0) {
		rectangles.push(new rectangle(x));
	}
}

//function update() {
//	this.tick();
//	this.render(ctx);
//	requestAnimationFrame(update);
//}

//function changeDirection(ball, rect) {
//    if (ball.y + ball.radius === rect.y || ball.y - ball.radius === rect.y + rect.height) {
//        ball.vy *= -1;
//    } else if (ball.x + ball.radius === rect.x || ball.x - ball.radius === rect.x + rect.width) {
//        ball.vx *= -1;
//    } else {
//        if (ball.y >= rect.y && ball.y <= rect.y + rect.height) {
//            ball.vx *= -1;
//        } else if (ball.x >= rect.x && ball.x <= rect.x + rect.width) {
//            ball.vy *= -1;
//        } else {
//            ball.vy *= -1;
//            ball.vx *= -1;
//        }
//    }
//}