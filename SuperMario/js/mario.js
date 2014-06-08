var gameObjects = [{
    type: 'singleBlock',
    x: 200,
    y: 400,
    width: 32,
    height: 32
}, {
    type: 'bonusBlock',
    x: 232,
    y: 400,
    width: 32,
    height: 32
}, {
    type: 'singleBlock',
    x: 264,
    y: 400,
    width: 32,
    height: 32
}, {
    type: 'staticBlock',
    x: 750 - 32,
    y: 410 + 32 * 3,
    width: 32,
    height: 32
}, {
    type: 'staticBlock',
    x: 782 - 32,
    y: 378 + 32 * 3,
    width: 32,
    height: 32
}, {
    type: 'staticBlock',
    x: 814 - 32,
    y: 346 + 32 * 3,
    width: 32,
    height: 32
}, {
    type: 'staticBlock',
    x: 846 - 32,
    y: 314 + 32 * 3,
    width: 32,
    height: 32
}, {
    type: 'staticBlock',
    x: 846,
    y: 314 + 32 * 3,
    width: 32,
    height: 32
}
];

var marioLayer = new Kinetic.Layer();
var canvas = document.getElementById('container');
var marioImageObj = new Image();
marioImageObj.onload = function () {
    var mario = new Kinetic.Sprite({
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
        if (!isElevated && elevation != 0 && !nextIsFlat()) {
            mario.move({
                x: 32,
                y: 32 * elevation
            });
            elevation = 0;
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
        } else if ((mario.animation() === 'jump') && ++frameCount > 2) {
            mario.move({
                x: 35,
                y: 0
            });
            if (isElevated) {
                mario.move({
                    x: 0,
                    y: -32
                });
                console.log(mario.getAttr('x') + " " + mario.getAttr('y'));
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
                mario.getAttr('x') + 32 < o.x + o.width - 5 // left side of mario compared to right side of obstacle
        });
    }

    function nextIsFlat() {  // if next to mario is higher obstacle
        return gameObjects.some(function (o) {
            return (o.y - mario.getAttr('y') - 150) === 0 && // bottom of mario equal to top of obstacle
                mario.getAttr('x') + 32 + 50 >= o.x &&      // right side of mario compared to left side of obstacle
                mario.getAttr('x') + 32 < o.x + o.width - 5 // left side of mario compared to right side of obstacle
        });
    }

    function collisionDispatcher() {
        var k;
        for (k = 0; k < gameObjects.length; k++) {

            if (mario.getAttr('x') + 50 >= gameObjects[k].x && mario.getAttr('x') < gameObjects[k].x + gameObjects[k].width - 5) {
                if (mario.animation() === 'jump' && nextIsHigher()) { // trying to jump over obstacle
                    isElevated = true;
                    return;
                } else if (nextIsHigher()) {
                    isStuck = true;                     // trying to enter obstacle
                    return;
                }
            }
            isStuck = false;
            isElevated = false;
        }
    }

    document.body.addEventListener('keydown', onKeyDown, false);

};
marioImageObj.src = 'Images/mario1.png';