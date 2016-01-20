/*###########################################################################
  # Code created by Adam Brookes for adambrookesprojects.co.uk - 06/10/2013 #
  #  It is unencumbered by copyrights and patents and we can use it freely, #
  # but we can only assert our own Intellectual Property rights on derived  #
  #  works: the original work remains free for public use                   #
  ########################################################################### 

 #######################################################
 # Class used to manage Canvas Renderer and Simulation #
 #######################################################*/
if (window.addEventListener) window.addEventListener('load', onLoad, false);

function onLoad() {
    var canvas;
    var context;
    
    var renderer = new Renderer('#CAE1FF'); // takes colour for canvas.
    var simulation;
    var ballArray = new Array();

    // frameRate Variables.
    var frameRate = 60;
    var frameTimer = 1000 / frameRate;

    // DeltaTime variables.
    var lastTime = Date.now(); // inistalise lastTime.
    var thisTime;
    var deltaTime;
    
    function initialiseCanvas() {
        //find the canvas element using its id attribute.
        canvas = document.getElementById('canvas');
        //once canvas is created, create the simulation passing the width and height of canvas
        simulation = new Simulation(canvas.width,canvas.height);

        /*########## Error checking to see if canvas is supported ############## */
        if (!canvas) {
            alert('Error: cannot find the canvas element!');
            return;
        }
        if (!canvas.getContext) {
            alert('Error: no canvas.getContent!');
            return;
        }
        context = canvas.getContext('2d');
        if (!context) {
            alert('Error: failed to getContent');
            return;
        }
        createBalls();
        mainLoop(); // enter the main loop.
    }
    function createBalls() {
        /* Ball takes X | Y | radius | Mass| vX | vY | colour */

        ballArray.push(new ball(50, 100, 20, 20, 2, 0, '#8B6969'));
        ballArray.push(new ball(500, 100, 15, 15, -2, 0, '#8B1A1A'));
        ballArray.push(new ball(300, 10, 12, 12, 0, 5, '#FFFFFF'));
        ballArray.push(new ball(400, 250, 17, 17, -2, -4, '#FFE303'));
        ballArray.push(new ball(430, 20,18, 18, -2, 5, '#9ACD32'));
        ballArray.push(new ball(100, 200, 30,5, 2, 2, 'pink'));
    }

    function mainLoop() {
        thisTime = Date.now();
        deltaTime = thisTime - lastTime;

        renderer.draw(context, ballArray);
        simulation.update(deltaTime, ballArray);

        lastTime = thisTime;

        setTimeout(mainLoop, frameTimer);
    }

    initialiseCanvas();
}