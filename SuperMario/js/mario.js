var marioLayer = new Kinetic.Layer();
var canvas = document.getElementById('container');
var mario;
var marioImageObj = new Image();
marioImageObj.onload = function () {
    mario = new Kinetic.Sprite({
        x: 10,
        y: 388,
        image: marioImageObj,
        animation: 'stay',
        animations: {
            walk: [
              // x, y, width, height (2 frames)
              //0, 0, 50, 150,
              50, 0, 50, 150
            ],
            stay: [
                0, 0, 50, 150
            ],
            jump: [
                100, 0, 50, 150
            ],
            bigjump: [
                100, 30, 50, 150
            ]
        },
        frameRate: 7,
        frameIndex: 0
    });

    marioLayer.add(mario);

    stage.add(marioLayer);

    mario.start();

    var frameCount = 0;

    mario.on('frameIndexChange', function (evt) {
        if (!isElevated && elevation !== 0 && !nextIsFlat()) {
            var next = gameObjects.filter(function (o) {
                return (o.y - mario.getAttr('y') - 150) > 0 && // bottom of mario higher than top of obstacle
                    mario.getAttr('x') + 32 + 50 >= o.x &&      // right side of mario compared to left side of obstacle
                    mario.getAttr('x') + 32 < o.x + o.width - 5;
            })[0];
            if (next) {     // if next to mario there is an obstacle
                var old = mario.getAttr('y');
                mario.move({
                    x: 10,
                    y: next.y - mario.getAttr('y') - 150
                });
                elevation -= (mario.getAttr('y') - old) / 32;
            } else {        // if nexto to mario there is no obstacle
                mario.move({
                    x: 10,
                    y: 32 * elevation
                });
                elevation = 0;
            }   
        }
        if ((mario.animation() === 'walk') && ++frameCount > 2) {
            if (!isStuck) {
                mario.move({
                    x: 10,
                    y: 0
                });
            }
            mario.animation('stay');
            frameCount = 0;
        } else if ((mario.animation() === 'jump' || mario.animation() === 'bigjump') && ++frameCount > 2) {
            mario.move({
                x: 35,
                y: 0
            });
            if (isElevated) {
                mario.move({
                    x: 0,
                    y: -32
                });
                elevation++;
            } 
            mario.animation('stay');
            frameCount = 0;
        }
    });

    function onKeyDown(ev) {
        if (ev.keyCode === 39 && mario.getAttr('x') <= canvas.getAttribute('width') - 70) {
            mario.animation('walk');
        } else if (ev.keyCode === 38 && mario.getAttr('x') <= canvas.getAttribute('width') - 70) {
            mario.animation('jump');
        } else if (ev.keyCode === 17 && mario.getAttr('x') <= canvas.getAttribute('width') - 70) {
            mario.animation('bigjump');
        }
        collisionDispatcher();
    }

    var isStuck = false;
    var elevation = 0;
    var isElevated = false;

    function nextIsHigher() {  // if next to mario is higher obstacle
        return gameObjects.some(function (o) {
            return (o.y + 32 - mario.getAttr('y') - 150) === 0 && // bottom of mario equal to bottom of obstacle
                mario.getAttr('x') + 32 + 50 >= o.x &&      // right side of mario compared to left side of obstacle
                mario.getAttr('x') + 32 < o.x + o.width - 5; // left side of mario compared to right side of obstacle
        });
    }

    function nextIsFlat() {  // if next to mario is flat obstacle
        return gameObjects.some(function (o) {
            return (o.y - mario.getAttr('y') - 150) === 0 && // bottom of mario equal to top of obstacle
                mario.getAttr('x') + 32 + 50 >= o.x &&      // right side of mario compared to left side of obstacle
                mario.getAttr('x') + 32 < o.x + o.width - 5; // left side of mario compared to right side of obstacle
        });
    }

    function nextIsLower() {  // if next to mario is lower obstacle
        return gameObjects.some(function (o) {
            return (o.y - mario.getAttr('y') - 150) > 0 && // bottom of mario equal to top of obstacle
                mario.getAttr('x') + 32 + 50 >= o.x &&      // right side of mario compared to left side of obstacle
                mario.getAttr('x') + 32 < o.x + o.width - 5; // left side of mario compared to right side of obstacle
        });
    }

    function isMarioXInObstacle(obstacle) {
        return mario.getAttr('x') + 50 >= obstacle.x && mario.getAttr('x') < obstacle.x + obstacle.width - 5;
    }

    function collisionDispatcher() {
        var k;
        for (k = 0; k < gameObjects.length; k++) {
            if (isMarioXInObstacle(gameObjects[k])) {
                if ((mario.animation() === 'jump' || mario.animation() === 'bigjump') && nextIsHigher()) { // trying to jump over obstacle
                    isElevated = true;
                    return;
                } else if (nextIsHigher()) {
                    isStuck = true;                     // trying to enter obstacle
                    return;
                } else if (mario.animation() === 'bigjump') {
                    if (mario.getAttr('y') - gameObjects[k].y + 32 < 105 &&
                        Math.abs(mario.getAttr('x') + 25 - gameObjects[k].x) < 16 &&
                        gameObjects[k].type === 'bonusBlock') {

                        bonusAnimation(gameObjects[k].x, gameObjects[k].y);
                        console.log('hit bonus!');
                                                        // TODO: Write a function to modify the behaviour of the hit bonus block
                    }                                   // TODO: Add coins and scoring - calculation and display
                }                                       // TODO: Save 5 best scores starting and closing texts
            }
            isStuck = false;
            isElevated = false;
        }
                                                        // TODO: Make the mushroom move left and right 
        if (mario.getAttr('x') + 50 >= mushroom.getAttr('x') &&
            mario.getAttr('x') + 20 < mushroom.getAttr('x') &&
            (mario.animation() === 'jump' || mario.animation() === 'bigjump')) {
            mushroom.animation('smashed');            // TODO: Write a function to modify the behaviour of smashed mushroom
        } else if (mario.getAttr('x') + 50 >= mushroom.getAttr('x') &&
            mario.getAttr('x') + 40 < mushroom.getAttr('x') &&
            !(mario.animation() === 'jump' || mario.animation() === 'bigjump')) {
            console.log('Mario is eaten!');             // TODO: Write a function to reduce the lifes of Mario and modify the behaviour of Mario
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