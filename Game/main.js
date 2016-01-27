var canvas = document.getElementById('canvas-main'),
	ctx = canvas.getContext('2d'),
	raf,
	background = new Image();

background.src = 'grass.jpg';
background.onload = function () {
	ctx.drawImage(background, 0, 0);
};

var addedHook = false;

var input = new Input();
attachListeners(input);

var balls = [
	
	new Ball(new Circle(100, 50, 45), 'gold')
];

var testRectangle = new Rectangle(200, 200, 100, 100);

var hooks = [];

var player = player = new Player(canvas.width / 2, canvas.height - 33);

var bonuses = [new Bonus(5, 5, 1)];

var sound = new Audio('sounds/pop.wav');

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	var playerBox = player.getCurrentBoundingBox();
	ctx.strokeRect(playerBox.x, playerBox.y, playerBox.width, playerBox.height);

	ctx.strokeRect(testRectangle.x, testRectangle.y, testRectangle.width, testRectangle.height);

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
	window.requestAnimationFrame(draw);
}

function tick() {

	var playerBox = player.getCurrentBoundingBox();
	balls.forEach(function (ball) {
		checkForCanvasCollision(ball);
		updateBallPosition(ball);

		var ballCircle = ball.getCurrentCircle();
		if (circleRectangleCollision(ballCircle, playerBox)) {
			console.log("Player collides with the " + ball.color + " ball");
		}

		// check for collision with hooks
		hooks.forEach(function (hook) {
			if (ballHookCollision(ball, hook)) {
				sound.play();
				hook.destroy = true;
				var index= balls.indexOf(ball);
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

	if (rectangleRectangleCollision(playerBox, testRectangle)) {
		console.log("Player collides with rectangle.");
	}
}

function updateBallPosition(ball){
	ball.x += ball.vx;
	ball.y += ball.vy;
	ball.vy += 0.1;
	//if (ball.maxHeight > ball.y&&ball.vy<0) {
	//	ball.y = ball.maxHeight;
	//}
}

function createHook(x) {
	if (hooks.length === 0) {

		hooks.push(new Hook(x));
		console.log("added hook");
	}
}

function ballResponse(index){
	var color = balls[index].color;
	switch (color){
		case 'gold':
			balls.push(new Ball(new Circle(balls[index].x, balls[index].y,30), 'pink', 6));
			balls.push(new Ball(new Circle(balls[index].x, balls[index].y,30), 'pink', 6));
			balls[balls.length-1].vx*=-1;
			balls.removeAt(index);
			break;
		case 'pink':
			balls.push(new Ball(new Circle(balls[index].x, balls[index].y,15), 'red', 5));
			balls.push(new Ball(new Circle(balls[index].x, balls[index].y,15), 'red', 5));
			balls[balls.length-1].vx*=-1;
			balls.removeAt(index);
			break;
		case 'red':
			balls.push(new Ball(new Circle(balls[index].x, balls[index].y,6), 'blue', 3.5));
			balls.push(new Ball(new Circle(balls[index].x, balls[index].y,6), 'blue', 3.5));
			balls[balls.length-1].vx*=-1;
			balls.removeAt(index);
			break;
		default:
			balls.removeAt(index);
			break;
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