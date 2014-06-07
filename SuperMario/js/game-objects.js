var gameObjectsLayer = new Kinetic.Layer();

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        numImages++;
    }

    for (var src in sources) {
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
            var bonusBlock = new Kinetic.Image({
                                                   x: currentObj.x,
                                                   y: currentObj.y,
                                                   image: images.bonusBlock
                                               });
            gameObjectsLayer.add(bonusBlock);
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
    // in order to ignore transparent pixels in an image when detecting
    // events, we first need to cache the image
    //bonusBlock.cache();
    // next, we need to redraw the hit graph using the cached image
    //bonusBlock.drawHitFromCache();
    // finally, we need to redraw the layer hit graph
    //gameObjectsLayer.drawHit();
}

var sources = {
    singleBlock: 'Images/game-objects/single-block.gif',
    bonusBlock: 'Images/game-objects/bonus-block.gif',
    staticBlock: 'Images/game-objects/static-block.gif',
    stairs: 'Images/game-objects/stairs.png'
};

loadImages(sources, buildStage);