$(document).ready(function () {
    // Initialize variables
    var x = 150; // Initial position on X
    var y = 150; // Initial position on Y
    var dx = 2; // Velocity on X
    var dy = 4; // Velocity on Y
    var WIDTH; // Width of the frame
    var HEIGHT; // Height of the frame
    var ctx;

    function init() {
        ctx = $('#canvas')[0].getContext("2d"); // Obtain the context from the canvas
        WIDTH = $("#canvas").width(); // Assign the size to the variables
        HEIGHT = $("#canvas").height();
        return setInterval(paint, 10); // Call paint() every 10 ms
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

    function paint() {
        clear();
        circle(x, y, 10, "black");

        if (x + dx > WIDTH || x + dx < 0)
        dx = -dx;
        if (y + dy > HEIGHT || y + dy < 0)
        dy = -dy;

        x += dx;
        y += dy;
    }

    init();
})