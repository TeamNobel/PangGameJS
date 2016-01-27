var canvas = document.getElementById('canvas-main');
var ctx = canvas.getContext('2d');
var background = new Image();

background.src = 'images/grass.jpg';

background.onload = function () {
	ctx.drawImage(background, 0, 0);
};

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

var isRunning = false;

var ballsMovementPauseTime = 0;
var playerBallCollisionPauseTime = 0;
var hooksMaxCount = 1;

function getRandomInt(max) {
	return Math.floor(Math.random() * max) + 1;
}

function resetGame() {
	balls = startBalls();
	bonuses = [];
}

function tryToSpawnBonus(x, y) {
	var rnd = getRandomInt(10);
	if (rnd !== 1) {
		return;
	}

	switch (getRandomInt(3)) {
		case 1:
			// add hook
			bonuses.push(new Bonus(x, y, 1));
			//console.log("x " + x + " y " + y);
			break;

		case 2:
			// invincible for a time
			bonuses.push(new Bonus(x, y, 2));
			//console.log("x " + x + " y " + y);
			break;

		case 3:
			// freeze time
			bonuses.push(new Bonus(x, y, 3));
			//console.log("x " + x + " y " + y);
			break;
	}
}

function updateBonuses() {
	if (ballsMovementPauseTime > 0) {
		ballsMovementPauseTime -= 1;
	}

	if (playerBallCollisionPauseTime > 0) {
		playerBallCollisionPauseTime -= 1;
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	balls.forEach(function (ball) {
		ball.draw(ctx);
	});

	hooks.forEach(function (hook) {
		hook.draw(ctx);
	});

	bonuses.forEach(function (bonus) {
		bonus.draw(ctx);
	});

	tick();

	player.render(ctx);
	DrawHUD();
}

function tick() {
	updateBonuses();
	var playerBox = player.getCurrentBoundingBox();

	balls.forEach(function (ball) {
		checkForCanvasCollision(ball);

		if (ballsMovementPauseTime <= 0 && player.isAlive) {
			updateBallPosition(ball);
		}

		var ballCircle = ball.getCurrentCircle();
		if (playerBallCollisionPauseTime <= 0 && circleRectangleCollision(ballCircle, playerBox)) {
			console.log("Player collides with the " + ball.color + " ball");

			player.removeLife();

			if (!player.isAlive) {
				//isRunning = false;
				player.playDieAnimation();
				resetGame();
				player.reset();
				return;
			}
		}

		// check for collision with hooks
		hooks.forEach(function (hook) {
			if (ballHookCollision(ball, hook)) {
				sound.play();
				hook.destroy = true;
				player.score += 100;
				console.log(player.score);

				tryToSpawnBonus(ball.x, ball.y);

				var index = balls.indexOf(ball);
				ballResponse(index);
			}
		});
	});

	player.movement.right = !!input.right;
	player.movement.left = !!input.left;

	player.updateAnimationSettings();

	// revome hooks that hit a ball or are outside the canvas
	hooks = hooks.filter(function (r) {
		return !r.destroy;
	});

	// update bonuses
	bonuses = bonuses.filter(function (bonus) {
		return !bonus.destroy;
	});

	bonuses.forEach(function (bonus) {
		var bonusBox = bonus.getCurrentBoundingBox();
		if (rectangleRectangleCollision(playerBox, bonusBox)) {
			switch (bonus.type) {
				case 1:
					hooksMaxCount++;
					console.log("max hooks " + hooksMaxCount);
					break;

				case 2:
					ballsMovementPauseTime += 2000;
					playerBallCollisionPauseTime += 2000;
					console.log("frozen time " + ballsMovementPauseTime);
					break;

				default:
					playerBallCollisionPauseTime += 2000;
					console.log("invincibility " + playerBallCollisionPauseTime);
					break;
			}

			bonus.destroy = true;
		}

		bonus.update();
	});
}

function updateBallPosition(ball) {
	ball.x += ball.vx;
	ball.y += ball.vy;
	ball.vy += 0.1;
}

function createHook(x) {
	if (hooks.length < hooksMaxCount) {
		hooks.push(new Hook(x));
		console.log("added hook");
	}
}

function ballResponse(index) {
	if (!balls[index]) {
		return;
	}

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
	handleInput();
	if (isRunning) {
		draw();
		tick();
	} else {
		if (input.enter) {
			isRunning = true;
			backgroundSound.play();
		}
	}

	requestAnimationFrame(run);
}

run();
