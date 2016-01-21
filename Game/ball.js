/**
 * Created by Ivan on 17.1.2016 г..
 */

var ball = function(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.maxHeight = y;
    this.vx = 2;
    this.vy = 0;
    this.mass = Math.round(radius*radius*Math.PI);
    this.radius = radius;
    this.color = color;
    //var gradient = ctx.createRadialGradient(100,100,100,100,100,0);
    //gradient.addColorStop(0,"white");
    //gradient.addColorStop(1,"green");
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();}
};
