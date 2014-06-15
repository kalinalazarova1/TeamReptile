/// <reference path="mario.js" />
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

var scoreboardStage = new Kinetic.Stage({
    container: 'scoreboard',
    width: 2000,
    height: 600
});

scoreboardStage.add(timeTextLayer);

setInterval(function () {
    if (totalTimerPerLevel <= 0) {
        timeText.setText('NO TIME LEFT!!!');
    }
    else {
        if (!stopTime) {
            remainingTime--;
        }
        timeText.setText(remainingTime);
        timeTextLayer.draw();
    }
}, 1000);