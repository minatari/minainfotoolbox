document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var canvas = document.getElementById('game-canvas');

    //2D rendering context
    var ctx = canvas.getContext('2d');

    //current game state
    var gameState;

    //create a new game state object and return it
    function newGameState() {
        //creates new object to return
        return {
            //create yet another object for object property
            ball: {
                //coordinates, size
                //left: 10,
                //random is between 0 or 1, good for a percentage
                left: 240,
                top: 20,
                width: 10,
                height: 10,

                //direction, velocity
                //always moves right one pixel, down one pixel
                vectorX: 3,
                vectorY: 0,
                velocity: 0
            },
            //gives microsecond accurate value for timestamp
            lastTimestamp: performance.now()
        };
    } //newGameState()

    //render current game state to canvas element
    function render() {
        //clears entire canvas
        //get rekt (rect)
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var ball = gameState.ball;

        //begins the path
        ctx.beginPath();

        //draws the arc
        //takes in center coordinates of circle
        ctx.arc(ball.left + (ball.width / 2),
            ball.top + (ball.height / 2),
            ball.width / 2, 0, 2 * Math.PI);

        //fills in the circle
        ctx.fill();
    } //render()

    //advance the animation and redraw
    function animate() {
        render();
        requestAnimationFrame(animate);
    }

    window.addEventListener("keydown", moveChar, false);

    function moveChar(evt) {
        var ball = gameState.ball;
        var movement = 30;
        switch(evt.keyCode) {
            //WSAD (up,down,left,right) --> (87, 83, 65, 68)
            case 37:
                // left key pressed
                ball.left -= movement;
                if (ball.left + ball.width <= ball.width) {
                    ball.left = 0;
                }
                break;

            case 38:
                // up key pressed
                ball.height -= movement;
                //if (ball.top <= 0) {
                //    ball.top = ball.height;
                //}
                break;

            case 39:
                // right key pressed
                ball.left += movement;
                if (ball.left + ball.width >= canvas.width) {
                    ball.left = canvas.width - ball.width;
                }
                break;
            case 40:
                // down key pressed
                ball.height += movement;
                if (ball.top >= canvas.height) {
                    alert("BLERG");
                }
                break;

            case 32:
                //space bar pressed
                ball.height += movement * 5;
                break;
        }
    }


    //create a new game state
    gameState = newGameState();

    //ask browser to animate ask quickly as possible
    //global function
    requestAnimationFrame(animate);

});