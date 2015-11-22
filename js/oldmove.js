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
            //create bucky object
            bucky: {
                left: 100,
                top: 100,
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
        bucky.img.src ="img/buckydown.png";
        ctx.drawImage(bucky.img, bucky.left, bucky.top, bucky.width, bucky.height);


        //shows me coordinates
        var idx;
        for(idx = 0; idx < canvas.width + 20; idx += 20) {
            //print, x-coord, y-coord
            ctx.fillText(idx, idx, 10);
        }

        for(idx = 0; idx < canvas.height + 20; idx += 20) {
            ctx.fillText(idx, 0, idx);
        }

        //for (var block in blocks) {
        //    ctx.fill
        //}

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
        //var ball = gameState.ball;
        var bucky = gameState.bucky;
        var movement = 10;
        switch(evt.keyCode) {
            //WSAD (up,down,left,right) --> (87, 83, 65, 68)
            case 37:
                // left key pressed
                var img = new Image();
                bucky.img.src ="img/buckyleft.png";
                bucky.left -= movement;

                //dont hit walls
                if (bucky.left + bucky.width <= bucky.width) {
                    bucky.left = 0;
                }
                break;

            case 38:
                // up key pressed
                bucky.top -= movement;
                bucky.img.src ="img/buckyup.png";

                //dont hit walls
                if (bucky.top <= 0) {
                    bucky.top = 0;
                }
                break;

            case 39:
                // right key pressed
                bucky.left += movement;
                bucky.img.src ="img/buckyright.png";

                //dont hit walls
                if (bucky.left + bucky.width >= canvas.width) {
                    bucky.left = canvas.width - bucky.width;
                }
                break;
            case 40:
                // down key pressed
                bucky.top += movement;
                bucky.img.src ="img/buckydown.png";

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
        }
    });

    //create a new game state
    gameState = newGameState();

    //ask browser to animate ask quickly as possible
    //global function
    requestAnimationFrame(animate);

});