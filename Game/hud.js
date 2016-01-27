function DrawHUD() {
    DrawScore();
    DrawLives();
}

function DrawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = 'white';//"#b40d1e";
    ctx.fillText("Score: " + player.score, 550, 30);
}

function DrawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = 'white';//"#b40d1e";
    ctx.fillText("Lives: " + player.lives, 700, 30);
}