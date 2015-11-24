document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var canvas = document.getElementById('game-canvas');

    //2D rendering context
    var ctx = canvas.getContext('2d');

    //current game state
    var gameState;

    var blocks = [];
    var numOfBlocks = 1; //Math.random() * 10;
    for (var i = 0; i < numOfBlocks; i++) {
        //fix math
        blocks.push ({
            left: 70 + (Math.random() * 350), //(canvas.width)),
            top: 70 + (Math.random() * 350), //(canvas.height)),
            width: 70, //Math.random() * 100,
            height: 20 //Math.random() * 100
        } )
    }

    //create a new game state object and return it
    function newGameState() {
        //creates new object to return
        return {
            //create bucky object
            bucky: {
                left: 50,
                top: 50,
                width: 50,
                height: 50,
                img: new Image()
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

        var bucky = gameState.bucky;
        ctx.drawImage('buckydown.png', bucky.left, bucky.top, bucky.width, bucky.height);


        //shows me coordinates
        var idx;
        for(idx = 0; idx < canvas.width + 20; idx += 20) {
            //print, x-coord, y-coord
            ctx.fillText(idx, idx, 10);
        }

        for(idx = 0; idx < canvas.height + 20; idx += 20) {
            ctx.fillText(idx, 0, idx);
        }

        //draw roadblocks
        var blocks = gameState.blocks;
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            ctx.fillRect(block.left, block.top, block.width, block.height);
        }
    } //render()

    //advance the animation and redraw
    function animate(timestamp) {
        render();
        requestAnimationFrame(animate);
    } //animate()

    //add movement by arrow keys
    document.addEventListener("keydown", function moveChar(evt) {
        var bucky = gameState.bucky;
        var blocks = gameState.blocks;
        var movement = 10;
        //if top left corner of bucky is not at block
        //if (bucky.left + bucky.width <= blocks.left) {
        //    //if bottom of bucky does is not at block
        //    if (bucky.top + bucky.height >= blocks.height
        //        //if top of bucky is not at block
        //        && bucky.top <= blocks.top + blocks.height) {
        //       // move
        switch (evt.keyCode) {
            //WSAD (up,down,left,right) --> (87, 83, 65, 68)
            case 37:
                // left key pressed
                var img = new Image();
                bucky.img.src = "img/buckyleft.png";
                bucky.left -= movement;
                //check position to al
                //dont hit walls
                if (bucky.left + bucky.width <= bucky.width) {
                    bucky.left = 0;
                }
                break;

            case 38:
                // up key pressed
                bucky.top -= movement;
                bucky.img.src = "img/buckyup.png";

                //dont hit walls
                if (bucky.top <= 0) {
                    bucky.top = 0;
                }
                break;

            case 39:
                // right key pressed
                bucky.left += movement;
                bucky.img.src = "img/buckyright.png";

                //dont hit walls
                if (bucky.left + bucky.width >= canvas.width) {
                    bucky.left = canvas.width - bucky.width;
                }
                break;
            case 40:
                // down key pressed
                bucky.top += movement;
                bucky.img.src = "img/buckydown.png";

                //dont hit walls
                if (bucky.top + bucky.height >= canvas.height) {
                    bucky.top = canvas.height - bucky.height;
                }

                break;

            case 32:
                //space bar pressed
                //do an animation?
                //meow?
                break;
            //    }
            //}
        } //else

    }); //moveChar()

    //create a new game state
    gameState = newGameState();

    //ask browser to animate ask quickly as possible (global function)
    requestAnimationFrame(animate);
});

////js for cat finding food game
////my cat: bucky
////his reign: terror
//
//document.addEventListener('DOMContentLoaded', function() {
//    'use strict';
//
//    var canvas = document.getElementById('game-canvas');
//    var ctx = canvas.getContext('2d');
//    var gameState;
//
//    function newGameState() {
//        return {
//            bucky: {
//                //start position
//                left: 10,
//                top: 10,
//
//                //size
//                width: 10,
//                height: 10,
//
//                //direction, velocity
//                vectorX: 1,
//                vectorY: 1
//            },
//            lastTimestamp: performance.now()
//        };
//    } //newGameState
//
//    function render() {
//        //clears entire canvas (get re(k)ct)
//        ctx.clearRect(0, 0, canvas.width, canvas.height);
//        var bucky = gameState.bucky;
//
//        //begins the path
//        ctx.beginPath();
//
//        //draws the arc
//        //takes in center coordinates of circle
//        ctx.arc(ball.left + (ball.width / 2),
//            ball.top + (ball.height / 2),
//            ball.width / 2, 0, 2 * Math.PI);
//
//        //fills in the circle
//        ctx.fill();
//
//    }
//
//    function step() {
//        render();
//    }
//
//
//    //WSAD (up,down,left,right) --> (87, 83, 65, 68)
//
//gameState = newGameState();
//    requestAnimationFrame(animate);
//});