var startScreenLayer = new Kinetic.Layer();
var endScreenLayer = new Kinetic.Layer();

var startScreen = new Image();
var endScreen = new Image();

startScreen.onload = function () {
    var start = new Kinetic.Image({
        x: 100,
        y: 30,
        image: startScreen,
        width: 400,
        height: 400
    });

    // add the shape to the layer
    startScreenLayer.add(start);

    // add the layer to the stage
    stage.add(startScreenLayer);

    setInterval(function () {
        startScreenLayer.remove(startScreen);
    }, 4000);
};



var end = new Kinetic.Image({
    x: 400,
    y: 20,
    image: endScreen,
    width: 400,
    height: 400
});
endScreenLayer.add(end);
stage.add(endScreenLayer);

endScreen.src = 'Images/screens/screen-game-over.png';
startScreen.src = 'Images/screens/screen-start.png';