var Hook2 = function (x){
    this.x = x;
    this.y = canvas.height;
    this.destroy = false;
    this.image = new Image();
    this.image.src = '../sprites/pang3.png';
};

Hook2.prototype.draw = function(ctx){
    ctx.drawImage(this.image, this.x, this. y);
    this.y-=4;

    this.destroy = (this.y < 75);
};
