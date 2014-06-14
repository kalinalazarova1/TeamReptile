var enemyLayer = new Kinetic.Layer(),
    firstMushroom,
    SecondMushroom,
    thirdMushroom,
    fourthMushroom,
    fifthMushroom,
    imageSrc = 'Images/mushroom-new.png',
    enemies = [];

var firstMushroomImage = new Image(),
    SecondMushroomImage = new Image(),
    thirdMushroomImage = new Image(),
    fourthMushroomImage = new Image(),
    fifthMushroomImage = new Image();

firstMushroomImage.onload = function () {
    firstMushroom = new Kinetic.Sprite({
        x: 410,
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
    
    enemies.push(firstMushroom);

    // add the shape to the layer
    enemyLayer.add(firstMushroom);

    // add the layer to the stage
    stage.add(enemyLayer);

    // start sprite animation
    firstMushroom.start();

    Move(firstMushroom, 410, 670);
};
firstMushroomImage.src = imageSrc;

SecondMushroomImage.onload = function () {
    SecondMushroom = new Kinetic.Sprite({
        x: 1245,
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

    enemies.push(SecondMushroom);

    // add the shape to the layer
    enemyLayer.add(SecondMushroom);

    // add the layer to the stage
    stage.add(enemyLayer);

    // start sprite animation
    SecondMushroom.start();

    Move(SecondMushroom, 940, 1280);
};
SecondMushroomImage.src = imageSrc;

thirdMushroomImage.onload = function () {
    thirdMushroom = new Kinetic.Sprite({
        x: 1010,
        y: 512,
        image: thirdMushroomImage,
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

    enemies.push(thirdMushroom);

    // add the shape to the layer
    enemyLayer.add(thirdMushroom);

    // add the layer to the stage
    stage.add(enemyLayer);

    // start sprite animation
    thirdMushroom.start();

    Move(thirdMushroom, 940, 1280);
};
thirdMushroomImage.src = imageSrc;

fourthMushroomImage.onload = function () {
    fourthMushroom = new Kinetic.Sprite({
        x: 1410,
        y: 512,
        image: fourthMushroomImage,
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

    enemies.push(fourthMushroom);

    // add the shape to the layer
    enemyLayer.add(fourthMushroom);

    // add the layer to the stage
    stage.add(enemyLayer);

    // start sprite animation
    fourthMushroom.start();

    Move(fourthMushroom, 1410, 1530);
};
fourthMushroomImage.src = imageSrc;

fifthMushroomImage.onload = function () {
    fifthMushroom = new Kinetic.Sprite({
        x: 1860,
        y: 512,
        image: fifthMushroomImage,
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

    enemies.push(fifthMushroom);

    // add the shape to the layer
    enemyLayer.add(fifthMushroom);

    // add the layer to the stage
    stage.add(enemyLayer);

    // start sprite animation
    fifthMushroom.start();

    Move(fifthMushroom, 1800, 1955);
};
fifthMushroomImage.src = imageSrc;

function Move(mushroom, startBorder, endBorder) {
    var timer = 0;
    //var isPassed = false;
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
            //if ((mushroom.getAttr('x') === mario.getAttr('x') - 10) && (mushroom.getAttr('y') === mario.getAttr('y') + 124))  {
            //    clearInterval(timer);
            //}
        } else {
            mushroom.move({
                x: -5
            })
            if (mushroom.getAttr('x') === startBorder + 10) {
                boundary = endBorder;
            }
        }
        //if (mushroom.getAttr('x') === mario.getAttr('x') + 40 && (mushroom.getAttr('y') === mario.getAttr('y') + 124) && isPassed === false) {
        //    clearInterval(timer);
        //}
        //if (mushroom.getAttr('x') < mario.getAttr('x')) {
        //    isPassed = true;
        //}
    }, 50)
}

