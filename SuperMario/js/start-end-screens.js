var screens = new Kinetic.Layer();

var startScreen = new Image();

startScreen.onload = function () {
    var start = new Kinetic.Image({
        x: 100,
        y: 30,
        image: startScreen,
        width: 400,
        height: 400
    });

    // add the shape to the layer
    screens.add(start);

    // add the layer to the stage
    stage.add(screens);

    setInterval(function () {
        screens.remove(startScreen);
    }, 4000);
};
startScreen.src = 'Images/screens/screen-start.png';