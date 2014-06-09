var enemyLayer = new Kinetic.Layer();
var mushroom;
var enemyImageObj = new Image();

enemyImageObj.onload = function () {
    mushroom = new Kinetic.Sprite({
        x: 550,
        y: 512,
        image: enemyImageObj,
        animation: 'stay',
        animations: {
            stay: [
              // x, y, width, height (2 frames)
              0, 6, 28, 29,
              52, 6, 28, 29,
            ],
            smashed: [
                103, 6, 27, 31
            ]
        },
        frameRate: 7,
        frameIndex: 0
    });

    // add the shape to the layer
    enemyLayer.add(mushroom);

    // add the layer to the stage
    stage.add(enemyLayer);

    // start sprite animation
    mushroom.start();

    mushroomMoving();

    function mushroomMoving() {
        var boundary = 670;
        var timer = 0;
        var isPassed = false;

        timer = setInterval(function () {
            if (mushroom.animation() === 'smashed') {
                clearInterval(timer);
            }
            if (mushroom.getAttr('x') < boundary) {
                mushroom.move({
                    x: 10
                })
                if (mushroom.getAttr('x') === boundary - 10) {
                    boundary = 0;
                }
                if (mushroom.getAttr('x') === mario.getAttr('x') - 10) {
                    clearInterval(timer);
                }
            } else {
                mushroom.move({
                    x: -10
                })
                if (mushroom.getAttr('x') === boundary + 10) {
                    boundary = 700;
                }
            }
            if (mushroom.getAttr('x') === mario.getAttr('x') + 40 && isPassed === false) {
                clearInterval(timer);
            }
            if (mushroom.getAttr('x') < mario.getAttr('x')) {
                isPassed = true;
            }

        }, 300)
    }
};
enemyImageObj.src = 'Images/mushroom-new.png';
