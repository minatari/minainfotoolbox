//js for cat finding food game
//my cat: bucky
//his reign: terror

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var canvas = document.getElementById('game-canvas');
    var ctx = canvas.getContext('2d');
    var gameState;

    function newGameState() {
        return {
            bucky: {
                //start position
                left: 10,
                top: 10,

                //size
                width: 10,
                height: 10,

                //direction, velocity
                vectorX: 1,
                vectorY: 1
            },
            lastTimestamp: performance.now()
        };
    } //newGameState

    function render() {
        //clears entire canvas (get re(k)ct)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var bucky = gameState.bucky;

        //begins the path
        ctx.beginPath();

        //draws the arc
        //takes in center coordinates of circle
        ctx.arc(ball.left + (ball.width / 2),
            ball.top + (ball.height / 2),
            ball.width / 2, 0, 2 * Math.PI);

        //fills in the circle
        ctx.fill();

    }

    function step() {
        render();
    }


    //WSAD (up,down,left,right) --> (87, 83, 65, 68)

gameState = newGameState();
    requestAnimationFrame(animate);
});