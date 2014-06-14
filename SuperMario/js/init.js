
    var stage = new Kinetic.Stage({
        container: 'container',
        width: 2000,
        height: 600
    });

    var grassLayer = new Kinetic.Layer();
    var grassImage = new Image();
    grassImage.onload = function () {
        var grass = new Kinetic.Image({
            x: 4,
            y: -31,
            image: grassImage
        });
        grassLayer.add(grass);
        stage.add(grassLayer);
    };
    grassImage.src = 'Images/grass.png';
