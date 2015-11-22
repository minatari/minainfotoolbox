document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var canvas = document.getElementById('game-canvas');

    //2D rendering context
    var ctx = canvas.getContext('2d');

    //current game state
    var gameState;

    var blocks = [];
    for (var i = 0; i < 10; i++) {
        blocks.push ({
            left: Math.random() * canvas.width,
            top: Math.random() * canvas.height,
            width: Math.random() * 100,
            height: Math.random() * 100
        })
    }

    //create a new game state object and return it
    function newGameState() {
        //creates new object to return
        return {
            //create yet another object for object property
            ball: {
                //start coordinates
                left: 50,
                top: 50,

                //size
                width: 10,
                height: 10,

                //direction, velocity
                vectorX: 1,
                vectorY: 1,
                velocity: 3
            },
            blocks: blocks,
            lastTimestamp: performance.now()
        };
    } //newGameState()

    //render current game state to canvas element
    function render() {
        //clears entire canvas
        //get rekt (rect)
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //reference
        var ball = gameState.ball;

        //begins the path
        ctx.beginPath();

        //draws the arc
        //takes in center coordinates of circle
        ctx.arc(ball.left + (ball.width / 2),
            ball.top + (ball.height / 2),
            ball.width / 2, 0, 2 * Math.PI);

        //fills in the circle
        ctx.fillStyle = "#DA4453";
        ctx.fill();

        //shows me coordinates
        var idx;
        for(idx = 0; idx < canvas.width + 20; idx += 20) {
            //print, x-coord, y-coord
            ctx.fillText(idx, idx, 10);
        }

        for(idx = 0; idx < canvas.height + 20; idx += 20) {
            ctx.fillText(idx, 0, idx);
        }

        for (var block in blocks) {
            ctx.fill
        }
        //for (var i = 0; i < 30; i++) {
        //    var x = Math.random() * canvas.width;
        //    var y = Math.random() * canvas.height;
        //    var width = Math.random() * 100;
        //    var height = Math.random() * 100;
        //    ctx(x, y, width, height);
        //}
    } //render()

    //advance the animation and redraw
    function animate(timestamp) {
        render();
        requestAnimationFrame(animate);
    }

    //add movement by arrow keys
    document.addEventListener("keydown", function moveChar(evt) {
        var ball = gameState.ball;
        var movement = 10;
        switch(evt.keyCode) {
            //WSAD (up,down,left,right) --> (87, 83, 65, 68)
            case 37:
                // left key pressed
                ball.left -= movement;

                //dont hit walls
                if (ball.left + ball.width <= ball.width) {
                    ball.left = 0;
                }
                break;

            case 38:
                // up key pressed
                ball.top -= movement;

                //dont hit walls
                if (ball.top <= 0) {
                    ball.top = 0;
                }
                break;

            case 39:
                // right key pressed
                ball.left += movement;

                //dont hit walls
                if (ball.left + ball.width >= canvas.width) {
                    ball.left = canvas.width - ball.width;
                }
                break;
            case 40:
                // down key pressed
                ball.top += movement;

                //dont hit walls
                if (ball.top + ball.height >= canvas.height) {
                    ball.top = canvas.height - ball.height;
                }

                break;

            case 32:
                //space bar pressed
                //do an animation
                break;
        }
    });

    //create a new game state
    gameState = newGameState();

    //ask browser to animate ask quickly as possible
    //global function
    requestAnimationFrame(animate);

});