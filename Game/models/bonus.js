var Bonus = function (x, y, type) {
    this.position = new Vector2(x, y);
    this.falling = true;
    this.width = 32;
    this.height = 33;
    this.row = 10;
    this.col = 0;
    this.numberOfFrames = 7;
    this.animation = new Animation(this.width, this.height, this.row, this.col, this.numberOfFrames, 'sprites.png', 10, 23, 1);
}

Bonus.prototype.getCurrentBoundingBox = function () {
    return new Rectangle(this.position.x, this.position.y, this.width, this.height);
};

Bonus.prototype.draw = function (ctx) {
    this.animation.draw(ctx);
};

Bonus.prototype.update = function () {
    //if (this.movement.left) {
    //    if ((this.position.x - this.velocity) > 0) {
    //        this.position.x -= this.velocity;
    //    }
    //} else if (this.movement.right) {
    //    if (this.position.x + this.velocity < canvas.width - this.width) {
    //        this.position.x += this.velocity;
    //    }
    //}

    if (this.position.y + this.height < canvas.height) {
        this.position.y += 2;
    }
    //this.destroy = (this.position.y + this.height > canvas.height);

    this.animation.position.set(this.position.x, this.position.y);

    this.animation.update();
};