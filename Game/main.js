var canvas = document.getElementById('canvas-main');
var ctx = canvas.getContext('2d');
var background = new Image();

background.src = 'grass.jpg';

background.onload = function () {
	ctx.drawImage(background, 0, 0);
};

var addedHook = false;
var input = new Input();
attachListeners(input);

var startBalls = function () {
	return [new Ball(new Circle(100, 50, 45), 'gold', 6)];
};
var balls = startBalls();
var hooks = [];
var bonuses = [];
var player = new Player(canvas.width / 2, canvas.height - 33);
var sound = new Audio('sounds/pop.wav');
var backgroundSound = new Audio('sounds/background-blade.mp3');
backgroundSound.play();
var isRunning = false;


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

	hooks.forEach(function (rectangle) {
		rectangle.draw()
	});

	bonuses.forEach(function (bonus) {
		bonus.draw(ctx);
	});

	tick();
	player.render(ctx);
}

function tick() {

	var playerBox = player.getCurrentBoundingBox();

	balls.forEach(function (ball) {
		checkForCanvasCollision(ball);

		if (player.isAlive) {
			updateBallPosition(ball);
		}

		var ballCircle = ball.getCurrentCircle();
		if (circleRectangleCollision(ballCircle, playerBox)) {
			console.log("Player collides with the " + ball.color + " ball");
			player.removeLife();

			if (!player.isAlive) {
				//isRunning = false;
				balls = startBalls();
				player.reset();
			}
		}

		// check for collision with hooks
		hooks.forEach(function (hook) {
			if (ballHookCollision(ball, hook)) {
				sound.play();
				hook.destroy = true;
				player.score += 100;
				console.log(player.score);

				var index = balls.indexOf(ball);
				ballResponse(index);
			}
		});
	});


	if (input.space) {
		createHook(player.position.x + player.width / 2);
	}

	player.movement.right = !!input.right;
	player.movement.left = !!input.left;

	player.updateAnimationSettings();

	// revome hooks that hit a ball or are outside the canvas
	hooks = hooks.filter(function (r) {
		return !r.destroy;
	});

	// update bonuses
	bonuses = bonuses.filter(function (b) {
		return !b.destroy;
	});

	bonuses.forEach(function (bonus) {
		bonus.update();
	});
}

function updateBallPosition(ball) {
	ball.x += ball.vx;
	ball.y += ball.vy;
	ball.vy += 0.1;
}

function createHook(x) {
	if (hooks.length === 0) {
		hooks.push(new Hook(x));
		console.log("added hook");
	}
}

function ballResponse(index) {
	var color = balls[index].color;
	switch (color) {
		case 'gold':
			balls.push(new Ball(new Circle(balls[index].x, balls[index].y, 30), 'pink', 6));
			balls.push(new Ball(new Circle(balls[index].x, balls[index].y, 30), 'pink', 6));
			balls[balls.length - 1].vx *= -1;
			balls.removeAt(index);
			break;
		case 'pink':
			balls.push(new Ball(new Circle(balls[index].x, balls[index].y, 15), 'red', 5));
			balls.push(new Ball(new Circle(balls[index].x, balls[index].y, 15), 'red', 5));
			balls[balls.length - 1].vx *= -1;
			balls.removeAt(index);
			break;
		case 'red':
			balls.push(new Ball(new Circle(balls[index].x, balls[index].y, 6), 'blue', 3.5));
			balls.push(new Ball(new Circle(balls[index].x, balls[index].y, 6), 'blue', 3.5));
			balls[balls.length - 1].vx *= -1;
			balls.removeAt(index);
			break;
		default:
			balls.removeAt(index);
			break;
	}
}

function resetBalls() {
	balls.forEach(function (ball) {
		ball.x = 100;
		ball.y = 100;
	});
}
function run() {
	if (isRunning) {
		draw();
		tick();
	} else {
		if (input.enter) {
			isRunning = true;
		}
	}

	requestAnimationFrame(run);
}
run();
