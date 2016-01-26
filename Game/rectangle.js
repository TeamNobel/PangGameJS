var rectangle =function(x){
    this.x = x;
    this.y = canvas.height;
    this.height = 0;
    this.width = 3;
    this.draw = function(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "silver";
        ctx.fill();
        ctx.closePath();
        this.height-=2;
    }

};