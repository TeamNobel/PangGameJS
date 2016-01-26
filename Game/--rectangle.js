var rectangle =function(x, y, width, height){
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.draw = function(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "lightgray";
        ctx.fill();
        ctx.closePath();
    }

};