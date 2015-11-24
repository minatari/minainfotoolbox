
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //initial state of world
    function initial() {
        // Matter.js module aliases
        var Engine = Matter.Engine,
            World = Matter.World,
            Bodies = Matter.Bodies,
            MouseConstraint = Matter.MouseConstraint;

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
        engine.world.gravity.x = 0.5;
        engine.world.gravity.y = 0.7;

        //create offset for walls
        var offset = 10,
            options = {
                isStatic: true,
                render: {
                    visible: false
                }
            };

        engine.world.bodies = [];

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


        // create bucky objects
        //pos(x, y), width, height
        var buckyA = Bodies.rectangle(400, 200, 80, 80);
        var buckyB = Bodies.rectangle(450, 50, 80, 180);
        var buckyC = Bodies.rectangle(450, 150, 180, 80);
        var buckyD = Bodies.rectangle(70, 70, 200, 200);

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

        // add all of the bodies to the world
        World.add(engine.world, [buckyA, buckyB, buckyC, buckyD, ground]);

        // run the engine
        Engine.run(engine);
    }
    initial();
});