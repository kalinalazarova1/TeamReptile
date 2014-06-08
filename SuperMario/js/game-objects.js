var gameObjectsLayer = new Kinetic.Layer();

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0,
        src;
    for (src in sources) {
        numImages++;
    }

    for (src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

function buildStage(images) {
    for (var i = 0; i < gameObjects.length; i += 1) {
        var currentObj = gameObjects[i];

        if (currentObj.type === 'singleBlock') {
            var singleBlock = new Kinetic.Image({
                                                    x: currentObj.x,
                                                    y: currentObj.y,
                                                    image: images.singleBlock
                                                });
            gameObjectsLayer.add(singleBlock);
        }

        if (currentObj.type === 'bonusBlock') {
            var bonusBlock = new Kinetic.Sprite({
                                                    x: currentObj.x,
                                                    y: currentObj.y,
                                                    image: images.bonusBlock,
                                                    animation:
                                                    'blink',
                                                    animations: {
                                                        blink: [
                                                                // x, y, width, height (2 frames)
                                                                0, 0, 32, 32,
                                                                32, 0, 32, 32,
                                                            ]
                                                    },
                                                    frameRate: 3,
                                                    frameIndex: 0
                                                });
            gameObjectsLayer.add(bonusBlock);
            bonusBlock.start();
        }

        if (currentObj.type === 'staticBlock') {
            var staticBlock = new Kinetic.Image({
                                                    x: currentObj.x,
                                                    y: currentObj.y,
                                                    image: images.staticBlock
                                                });
            gameObjectsLayer.add(staticBlock);
        }

        if (currentObj.type === 'stairs') {
            var stairs = new Kinetic.Image({
                                               x: currentObj.x,
                                               y: currentObj.y,
                                               image: images.stairs
                                           });
            gameObjectsLayer.add(stairs);
        }
    }

    stage.add(gameObjectsLayer);
}

var sources = {
    singleBlock: 'Images/game-objects/single-block.gif',
    bonusBlock: 'Images/game-objects/bonus-block.png',
    staticBlock: 'Images/game-objects/static-block.gif',
    stairs: 'Images/game-objects/stairs.png'
};

loadImages(sources, buildStage);