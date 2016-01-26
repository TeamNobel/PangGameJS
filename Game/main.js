var canvas = document.getElementById('canvas-main'),
    ctx = canvas.getContext('2d'),
    raf,
    background = new Image();
background.src = 'grass.jpg';
background.onload = function () {
    ctx.drawImage(background, 0, 0);
};

var rectangles = [];
var balls = [
    new ball(10, 250, 6, 'blue'),
    new ball(100, 150, 15, 'red'),
    new ball(100, 100, 30, 'pink'),
    //new ball(100, 50, 45, 'gold')
],
    player = player = new Player(canvas.width / 2, canvas.height - 33);

var input = new Input();
attachListeners(input);


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
    rectangles.forEach(function(rectangle){rectangle.draw()});
    balls.forEach(function (ball) {
        checkForCanvasColide(ball);
        ball.draw();

        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vy += 0.1;
        if (ball.maxHeight > ball.y) {
            ball.y = ball.maxHeight;
        }

    });

    tick();
    player.render(ctx);
    raf = window.requestAnimationFrame(draw);
}

function tick() {
    player.movement.right = !!input.right;
    player.movement.left = !!input.left;
    if (input.space){
        createHook(player.position.x + player.width/2);
    }

    player.updateAnimationSettings();
}

function update() {
    this.tick();
    this.render(ctx);
    requestAnimationFrame(update);
}

function createHook(x){
    if (rectangles.length===0){
        rectangles.push(new rectangle(x));
    }
}

    //
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
