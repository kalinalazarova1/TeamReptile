var enemyLayer = new Kinetic.Layer();

var enemyImageObj = new Image();
enemyImageObj.onload = function () {
    var mushroom = new Kinetic.Sprite({
        x: 960,
        y: 512,
        image: enemyImageObj,
        animation: 'stay',
        animations: {
            stay: [
              // x, y, width, height (2 frames)
              0, 6, 29, 26,
              55, 6, 29, 26, 
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
};
enemyImageObj.src = 'Images/smb_enemies_sheet.png';
