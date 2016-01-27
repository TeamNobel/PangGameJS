function DrawHUD() {
    DrawScore();
    DrawLives();
}

function DrawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#b40d1e";
    ctx.fillText("Score: " + player.score, 375, 30);
}

function DrawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#b40d1e";
    ctx.fillText("Lives: " + player.lives, 520, 30);
}