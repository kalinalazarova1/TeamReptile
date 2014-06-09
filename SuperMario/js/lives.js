/// <reference path="D:\Documents\GitHub\TeamReptile\SuperMario\Lib/kinetic.min.js" />
var startLiveCount = 3;
var remainingLives = startLiveCount;

var lives = new Kinetic.Layer();

var livesTextField = new Kinetic.Text({
    x: 580,
    y: 10,
    text: "LIVES",
    fontSize: 20,
    fontFamily: 'Arial Black',
    fill: 'white'
});

var remainingLivesField = new Kinetic.Text({
    x: 605,
    y: 30,
    text: remainingLives,
    fontSize: 20,
    fontFamily: 'Arial Black',
    fill: 'white'
});

lives.add(livesTextField);
lives.add(remainingLivesField);

stage.add(lives);

function die() {
    //TODO
    remainingLives -= 1;
}

function dieThreeTimes() {
    //TODO
    //GAME OVER
}