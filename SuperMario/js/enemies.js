var enemyLayer = new Kinetic.Layer(),
    firstMushroom,
    SecondMushroom,
    imageSrc = 'Images/mushroom-new.png';

var firstMushroomImage = new Image();
var SecondMushroomImage = new Image();

firstMushroomImage.onload = function () {
    firstMushroom = new Kinetic.Sprite({
        x: 550,
        y: 512,
        image: firstMushroomImage,
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
    enemyLayer.add(firstMushroom);

    // add the layer to the stage
    stage.add(enemyLayer);

    // start sprite animation
    firstMushroom.start();

    Move(firstMushroom, 0, 670);
};
firstMushroomImage.src = imageSrc;

SecondMushroomImage.onload = function () {
    SecondMushroom = new Kinetic.Sprite({
        x: 360,
        y: 512,
        image: SecondMushroomImage,
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
    enemyLayer.add(SecondMushroom);

    // add the layer to the stage
    stage.add(enemyLayer);

    // start sprite animation
    SecondMushroom.start();

    Move(SecondMushroom, 0, 670);
};
SecondMushroomImage.src = imageSrc;

function Move(mushroom, startBorder, endBorder) {
    var timer = 0;
    var isPassed = false;
    var boundary = endBorder;

    timer = setInterval(function () {
        if (mushroom.animation() === 'smashed') {
            clearInterval(timer);
        }
        if (mushroom.getAttr('x') < boundary) {
            mushroom.move({
                x: 5
            })
            if (mushroom.getAttr('x') === boundary - 10) {
                boundary = startBorder;
            }
            if ((mushroom.getAttr('x') === mario.getAttr('x') - 10) && (mushroom.getAttr('y') === mario.getAttr('y') + 124))  {
                clearInterval(timer);
            }
        } else {
            mushroom.move({
                x: -5
            })
            if (mushroom.getAttr('x') === startBorder + 10) {
                boundary = endBorder;
            }
        }
        if (mushroom.getAttr('x') === mario.getAttr('x') + 40 && (mushroom.getAttr('y') === mario.getAttr('y') + 124) && isPassed === false) {
            clearInterval(timer);
        }
        if (mushroom.getAttr('x') < mario.getAttr('x')) {
            isPassed = true;
        }
    }, 50)
}

var enemies = [{
    type: 'firstMushroom',
    x: 550,
    y: 512,
    widht: 28,
    height: 29
}, {
    type: 'SecondMushroom',
    x: 440,
    y: 512,
    widht: 28,
    height: 29
}]

