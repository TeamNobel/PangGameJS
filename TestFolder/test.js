var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';

var input = new Input();
attachListeners(input);

var player = new Player(canvas.width / 2, canvas.height - 33, 0, 11);

function update() {
    this.tick();
    this.render(ctx);
    requestAnimationFrame(update);
}

function render(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.render(ctx);
}

function tick() {
    player.movement.right = !!input.right;
    player.movement.left = !!input.left;

    player.updateAnimationSettings();
}

update();

