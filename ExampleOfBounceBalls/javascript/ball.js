/*############################################################
 # Class is a ball object, only contains getters and setters #
 #############################################################*/

var ball = (function (context) {

    var position;
    var lastGoodPosition
    var velocity;
    var radius;
    var mass;
    var colour;
    var x;
    var y;

    function ball(inX,inY,inRadius,inMass,inVelX,inVelY, inColour) { // constructor
        this.position = new vector();
        this.position.setX(inX);        this.position.setY(inY);

        this.velocity = new vector();
        this.velocity.setX(inVelX);     this.velocity.setY(inVelY);

        this.setRadius(inRadius);
        this.setMass(inMass);
        this.setColour(inColour);
    }

    /* #######################
       # Getters and Setters #
       ####################### */

    ball.prototype.setX = function (inX) { this.position.setX(inX);}
    ball.prototype.setY = function (inY) { this.position.setY(inY);}

    ball.prototype.getX = function () {return this.position.getX();}
    ball.prototype.getY = function () {return this.position.getY();}

    ball.prototype.setRadius = function (inRadius) { this.radius = inRadius;}
    ball.prototype.getRadius = function () { return this.radius;}

    ball.prototype.setMass = function (inMass) { this.mass = inMass;}
    ball.prototype.getMass = function () { return this.mass;}
    ball.prototype.setColour = function (inColour) { this.colour = inColour;}
    ball.prototype.getColour = function () { return this.colour;}
    return ball;
})();