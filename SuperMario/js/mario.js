﻿/// <reference path="scores.js" />
var marioLayer = new Kinetic.Layer();
var canvas = document.getElementById('container');
var mario;
var marioImageObj = new Image();

marioImageObj.onload = function () {
    mario = new Kinetic.Sprite({
        x: 8,
        y: 388,
        image: marioImageObj,
        animation: 'stayRight',
        animations: {
            walkRight: [
              // x, y, width, height (2 frames)
              //0, 0, 50, 150,
              50, 0, 50, 150
            ],
            stayRight: [
                0, 0, 50, 150
            ],
            jumpRight: [
                100, 0, 50, 150
            ],
            bigJumpRight: [
                100, 30, 50, 150
            ],
            dead: [
                300, 0, 50, 150
            ],
            stayLeft: [
                250, 0, 50, 150
            ],
            walkLeft: [
                200, 0, 50, 150
            ],
            jumpLeft: [
                150, 0, 50, 150
            ],
        },
        frameRate: 7,
        frameIndex: 0,
        direction: 'right'
    });

    marioLayer.add(mario);

    stage.add(marioLayer);

    mario.start();

    var frameCount = 0;

    mario.on('frameIndexChange', function (evt) {
        if (!isElevated && elevation !== 0 && !nextIsFlat()) {
            var next = gameObjects.filter(function (o) {
                return (o.y - mario.getAttr('y') - 150) > 0 && // bottom of mario higher than top of obstacle
                    mario.getAttr('x') + 50 >= o.x &&      // Left side of mario compared to Right side of obstacle
                    mario.getAttr('x') < o.x + o.width;
            })[0];
            if (next) {     // if next to mario there is an obstacle
                var old = mario.getAttr('y');
                mario.move({
                    x: 8,
                    y: next.y - mario.getAttr('y') - 150
                });
                elevation -= (mario.getAttr('y') - old) / 32;
            } else {        // if next to mario there is no obstacle
                mario.move({
                    x: 8,
                    y: 32 * elevation
                });
                elevation = 0;
            }   
        }
        if ((mario.animation() === 'walkRight') && ++frameCount > 2) {
            if (!isStuck) {
                mario.move({
                    x: 8,
                    y: 0
                });
            }
            mario.animation('stayRight');
            frameCount = 0;
        } else if ((mario.animation() === 'walkLeft') && ++frameCount > 2) {
                mario.move({
                    x: -8,
                    y: 0
                });
            mario.animation('stayLeft');
            frameCount = 0;
        }
        else if ((mario.animation() === 'jumpRight' || mario.animation() === 'bigJumpRight') && ++frameCount > 2) {
            mario.move({
                x: 32,
                y: 0
            });
            if (isElevated && nextIsTube()) {
                mario.move({
                    x: 0,
                    y: -64
                });
                elevation += 2;
            } else if (isElevated) {
                mario.move({
                    x: 0,
                    y: -32
                });
                elevation++;
            }
            mario.animation('stayRight');
            frameCount = 0;
            console.log(mario.getAttr('x'));
            console.log(mario.getAttr('y'));
        } else if (mario.animation() === 'jumpLeft' && ++frameCount > 2) {
            mario.move({
                x: -32,
                y: 0
            });
            if (isElevated && nextIsTube()) {
                mario.move({
                    x: 0,
                    y: -64
                });
                elevation += 2;
            } else if (isElevated) {
                mario.move({
                    x: 0,
                    y: -32
                });
                elevation++;
            }
            mario.animation('stayLeft');
            frameCount = 0;
        }
    });

    function onKeyDown(ev) {
        if (ev.keyCode === 39 && mario.getAttr('x') <= canvas.getAttribute('width') - 70) {
            mario.animation('walkRight');
            mario.direction = 'right';
        } else if (ev.keyCode === 34 && mario.getAttr('x') <= canvas.getAttribute('width') - 70) {
            mario.animation('jumpRight');
            mario.direction = 'right';
        } else if (ev.keyCode === 33 && mario.getAttr('x') >= 32) {
            mario.animation('jumpLeft');
            mario.direction = 'left';
        } else if (ev.keyCode === 38 && mario.getAttr('x') <= canvas.getAttribute('width') - 70) {
            mario.animation('bigJumpRight');
            mario.direction = 'right';
        } else if ((ev.keyCode === 37 && mario.getAttr('x') >= 8)) {
            mario.direction = 'left';
            if (mario.animation() !== 'stayLeft') {
                mario.animation('stayLeft');
            } else {
                mario.animation('walkLeft');
            }
        }
        collisionDispatcher();
    }

    var isStuck = false;
    var elevation = 0;
    var isElevated = false;

    function nextIsHigher() {  // if next to mario is higher obstacle
        return gameObjects.some(function (o) {
            return (o.y - mario.getAttr('y') - 150) < 0 && // bottom of mario equal to bottom of obstacle
                (o.y - mario.getAttr('y') - 150) > -65 &&
                mario.getAttr('x') + 50 >= o.x &&      // Left side of mario compared to Right side of obstacle
                mario.getAttr('x') < o.x + o.width - 10; // Right side of mario compared to Left side of obstacle
        });
    }

    function nextIsTube() {  
        return gameObjects.some(function (o) {
            return (o.y - mario.getAttr('y') - 150) < 0 && 
                (o.y - mario.getAttr('y') - 150) > -65 &&
                mario.getAttr('x') + 50 >= o.x &&      
                mario.getAttr('x') < o.x + o.width - 10 &&
                o.type === 'pipeSmall'; 
        });
    }

    function nextIsFlat() {  // if next to mario is flat obstacle
        return gameObjects.some(function (o) {
            return (o.y - mario.getAttr('y') - 150) === 0 && // bottom of mario equal to top of obstacle
                mario.getAttr('x') + 50 >= o.x &&      // Left side of mario compared to Right side of obstacle
                mario.getAttr('x') < o.x + o.width - 20; // Right side of mario compared to Left side of obstacle
        });
    }

    function isMarioXInObstacle(obstacle) {
        return mario.getAttr('x') + 50 >= obstacle.x && mario.getAttr('x') < obstacle.x + obstacle.width - 5;
    }

    function collisionDispatcher() {
        var k;
        for (k = 0; k < gameObjects.length; k++) {
            if (mario.direction === 'right') {
                if (isMarioXInObstacle(gameObjects[k])) {
                    if ((mario.animation() === 'jumpRight' || mario.animation() === 'bigJumpRight') && nextIsHigher()) { // trying to jumpRight over obstacle
                        isElevated = true;
                        return;
                    } else if (nextIsHigher()) {
                        isStuck = true;                     // trying to enter obstacle
                        return;
                    } else if (mario.animation() === 'bigJumpRight') {
                        if (mario.getAttr('y') - gameObjects[k].y + 32 < 105 &&
                            Math.abs(mario.getAttr('x') + 25 - gameObjects[k].x) - 16 < 5 &&
                            gameObjects[k].type === 'bonusBlock') {

                            bonusAnimation(gameObjects[k].x, gameObjects[k].y);
                            console.log('hit bonus!');
                            // TODO: Write a function to modify the behaviour of the hit bonus block
                        }                                   // TODO: Add coins and scoring - calculation and display
                    }                                       // TODO: Save 5 best scores starting and closing texts
                }
                isStuck = false;
                isElevated = false;
            } else {
                // TODO: Collision detection walking left;
            }
        }

        for (k = 0; k < enemies.length; k++) {
            if (mario.getAttr('x') + 50 >= enemies[k].getAttr('x') &&
                mario.getAttr('x') + 20 < enemies[k].getAttr('x') &&
                (mario.animation() === 'jumpRight' || mario.animation() === 'bigJumpRight')) {
                enemies[k].animation('smashed');            // TODO: Write a function to modify the behaviour of smashed enemies[k]
            } else if (mario.getAttr('x') + 50 >= enemies[k].getAttr('x') &&
                mario.getAttr('x') + 30 < enemies[k].getAttr('x') &&
                !(mario.animation() === 'jumpRight' || mario.animation() === 'bigJumpRight')) {
                console.log('Mario is eaten!');
                mario.move({
                    x: - mario.getAttr('x') + 8,
                    y: 0
                });
                // TODO: Write a function to reduce the lifes of Mario and modify the behaviour of Mario
                mario.animation('dead');
            }
        }
    }

    document.body.addEventListener('keydown', onKeyDown, false);

};
marioImageObj.src = 'Images/mario1.png';

function bonusAnimation(bonusX, bonusY) {
    var coinsLayer = new Kinetic.Layer();
    var coinImage = new Image();
    coinImage.src = 'Images/game-objects/coin.png';
    var coin = new Kinetic.Sprite({
        x: bonusX+8,
        y: bonusY - 32,
        image: coinImage,
        animation:
        'rotate',
        animations: {
            rotate: [
                    // x, y, width, height (2 frames)
                    0, 0, 20, 20,
                    25, 0, 20, 20,
                    45, 0, 20, 20,
                    65, 0, 20, 20
            ]
        },
        frameRate: 4,
        frameIndex: 0
    });
    
    coinsLayer.add(coin);
    coin.start();
    stage.add(coinsLayer);
}