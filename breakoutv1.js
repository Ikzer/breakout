$(document).ready(function () {
    // Initialize variables
    var x = 150; // Initial position on X
    var y = 150; // Initial position on Y
    var dx = 2; // Velocity on X
    var dy = 4; // Velocity on Y
    var WIDTH; // Width of the frame
    var HEIGHT; // Height of the frame
    var ctx;
    var paddlex;
    var paddleh;
    var paddlew;
    var rightDown = false;
    var leftDown = false;
    var canvasMinX;
    var canvasMaxX;

    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);
    $(document).mousemove(onMouseMove);

    function init() {
        ctx = $('#canvas')[0].getContext("2d"); // Obtain the context from the canvas
        WIDTH = $("#canvas").width(); // Assign the size to the variables
        HEIGHT = $("#canvas").height();
        canvasMinX = $("#canvas").offset().left;
        canvasMaxX = canvasMinX + WIDTH;
        init_paddle();
        return setInterval(paint, 10); // Call paint() every 10 ms
    }

    function init_paddle() {
        paddlex = WIDTH / 2;
        paddleh = 10;
        paddlew = 75;
    }

    // Draw a circle with its center on (x,y), radius r and a color

    function circle(x, y, r, color) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.fillStyle = color;
        ctx.closePath();
        ctx.fill();
    }

    // Draw a rectangle of width w, height h and its top left corner on (x,y)
    function rect(x, y, w, h) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.closePath();
        ctx.fill();
    }

    // Clear the canvas
    function clear() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        // Draw the canvas
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, WIDTH, HEIGHT);
    }

    function onKeyDown(evt) {
        if (evt.keyCode == 39) rightDown = true;
        else if (evt.keyCode == 37) leftDown = true;
    }

    function onKeyUp(evt) {
        if (evt.keyCode == 39) rightDown = false;
        else if (evt.keyCode == 37) leftDown = false;
    }

    // Move the paddle if the mouse is inside the canvas:
function onMouseMove(evt) {
    if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = evt.pageX - canvasMinX;
    }
   }
    
    function paint() {
        clear();
        circle(x, y, 10, "black");

        // Move the paddle if left or right are pressed
        if (rightDown) paddlex += 5;
        else if (leftDown) paddlex -= 5;

        // Draw the paddle
        rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);

        // Check boundaries to bounce
        if (x + dx > WIDTH || x + dx < 0) { dx = -dx; }
        if (y + dy < 0) { dy = -dy; }
        else if (y + dy > HEIGHT) {
            if (x > paddlex && x < paddlex + paddlew) {// If it's inside the paddle we change direction
                dy = -dy;
            }
            else {// If its outside the bar, we stop the animation and end the game
                clearInterval(game_loop);
            }
        }

        x += dx;
        y += dy;
    }

    var game_loop = init();
})