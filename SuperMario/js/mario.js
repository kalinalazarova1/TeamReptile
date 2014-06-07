var layer = new Kinetic.Layer();

var imageObj = new Image();
imageObj.onload = function () {
    var mario = new Kinetic.Sprite({
        x: 10,
        y: 390,
        image: imageObj,
        animation: 'stay',
        animations: {
            walk: [
              // x, y, width, height (2 frames)
              0, 0, 50, 150,
              50, 0, 50, 150
            ],
            stay: [
                0, 0, 50, 150
            ],
            jump: [
                100, 70, 50, 150
            ]
        },
        frameRate: 7,
        frameIndex: 0
    });

    layer.add(mario);

    stage.add(layer);

    mario.start();

    var frameCount = 0;

    mario.on('frameIndexChange', function (evt) {
        if ((mario.animation() === 'walk') && ++frameCount > 2) {
            mario.animation('stay');
            frameCount = 0;
        }
        else if ((mario.animation() === 'jump') && ++frameCount > 2) {
            mario.animation('stay');
            frameCount = 0;
        }
    });

    function onKeyDown(ev) {
        if (ev.keyCode === 39) {
            mario.animation('walk');
        } else if (ev.keyCode === 38) {
            mario.animation('jump');
        } else if (ev.keyCode === 40) {
            mario.animation('stay');
        }
    }

    document.body.addEventListener('keydown', onKeyDown, false);

};
imageObj.src = 'Images/mario1.png';