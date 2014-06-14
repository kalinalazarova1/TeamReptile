//timer
var totalTimerPerLevel = 999;

var remainingTime = totalTimerPerLevel;
var timeTextLayer = new Kinetic.Layer();

var staticTimeString = new Kinetic.Text({
    x: 710,
    y: 10,
    text: "TIME",
    fontSize: 20,
    fontFamily: 'Arial Black',
    fill: 'white'
});
timeTextLayer.add(staticTimeString);

var timeText = new Kinetic.Text({
    x: 723,
    y: 30,
    text: remainingTime,
    fontSize: 20,
    fontFamily: 'Arial Black',
    fill: 'white'
});
timeTextLayer.add(timeText);

stage.add(timeTextLayer);

setInterval(function () {
    if (totalTimerPerLevel <= 0) {
        //TODO: Call no time left screen
    }
    else {
        remainingTime--;
        timeText.setText(remainingTime);
        timeTextLayer.draw();
    }
}, 1000);