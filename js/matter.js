//js for drag through blockers cat game
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //initial state of world
    function initial() {
        // Matter.js module aliases
        var Engine = Matter.Engine,
            World = Matter.World,
            Bodies = Matter.Bodies,
            MouseConstraint = Matter.MouseConstraint,
            Common = Matter.Common,
            Composites = Matter.Composites;


        // create a Matter.js engine
        var engine = Engine.create(document.body, {
            render: {
                options: {
                    showAngleIndicator: false,
                        wireframes: false
                }
            }
        });

        //adjust gravity
        engine.world.gravity.x = 0;
        engine.world.gravity.y = 0;

        //create offset for walls
        var offset = 10,
            options = {
                isStatic: true,
                render: {
                    visible: false
                }
            };

        //create static walls
        World.add(engine.world, [
            Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
            Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, options),
            Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, options),
            Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, options)
        ]);

        // mouse movement of objects
        var mouseConstraint = MouseConstraint.create(engine);
        World.add(engine.world, mouseConstraint);

        //add light distraction objects
        var stacklight = Composites.stack(30, 30, 20, 5, 60, 40, function(x, y, column, row) {
            return Bodies.circle(x, y, Common.random(10, 25), { friction: 0.0001, restitution: 0.5, density: 0.5 });
        });

        //add heavy distraction objects
        var stackheavy = Composites.stack(10, 10, 10, 15, 20, 10, function(x, y, column, row) {
            return Bodies.circle(x, y, Common.random(20, 25), { friction: 0.0001, restitution: 0.5, density: 0.0001 });
        });

        // add distraction objects to the world
        World.add(engine.world, stacklight, stackheavy);

        // create bucky objects
        //pos(x, y), width, height
        var buckyA = Bodies.circle(400, 200, 20, 20);
        var buckyB = Bodies.circle(450, 50, 20, 20);
        var buckyC = Bodies.circle(450, 150, 20, 20);
        var buckyD = Bodies.circle(70, 70, 20, 20);


        //create ground
        var ground = Bodies.rectangle(400, 610, 810, 60, {isStatic: true});

        //add image and resize bucky object
        buckyA.render.sprite.texture = 'img/buckyleft.png';
        buckyA.render.sprite.xScale = 2;
        buckyA.render.sprite.yScale = 2;

        buckyB.render.sprite.texture = 'img/buckyup.png';
        buckyB.render.sprite.xScale = 2;
        buckyB.render.sprite.yScale = 2;

        buckyC.render.sprite.texture = 'img/buckydown.png';
        buckyC.render.sprite.xScale = 2;
        buckyC.render.sprite.yScale = 2;

        buckyD.render.sprite.texture = 'img/buckyright.png';
        buckyD.render.sprite.xScale = 2;
        buckyD.render.sprite.yScale = 2;

        //create blocking rectangles
        var block1 = Bodies.rectangle(610, 250, 200, 20, {
            isStatic: true,
            angle: Math.PI * 0.06,
            render: {
                fillStyle: '#edc51e',
                strokeStyle: '#b5a91c'
            }
        });

        var block2 = Bodies.rectangle(120, 250, 200, 20, {
            isStatic: true,
            angle: Math.PI * -0.06,
            render: {
                fillStyle: '#edc51e',
                strokeStyle: '#b5a91c'
            }
        });

        var block3 = Bodies.rectangle(380, 150, 400, 20, {
            isStatic: true,
            render: {
                fillStyle: '#edc51e',
                strokeStyle: '#b5a91c'
            }
        });

        var block4 = Bodies.rectangle(380, 350, 400, 20, {
            isStatic: true,
            render: {
                fillStyle: '#edc51e',
                strokeStyle: '#b5a91c'
            }
        });

        //create basket
        var basketleft = Bodies.rectangle(450, 460, 20, 100, {
            isStatic: true
        });

        var basketright = Bodies.rectangle(300, 460, 20, 100, {
            isStatic: true
        });

        var baskettop = Bodies.rectangle(375, 410, 150, 20, {
            isStatic: true
        });


        // add all of the bodies to the world
        World.add(engine.world, [buckyA, buckyB, buckyC, buckyD,
            ground, block1, block2, block3, block4,
            basketleft, basketright, baskettop]);

        // run the engine
        Engine.run(engine);
    }
    initial();
});