/// <reference path="Lib/kinetic.min.js" />
/// <reference path="timer.js" />
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

scoreboardStage.add(lives);

function die() {
    remainingLives -= 1;
    if (remainingLives == 0) {
        gameOver();
    }
    //TODO
    //define die
}

//function gameOver() {

//    //highscores
//    var userName = prompt('Enter your name: ', 'unnamed');
//    var currentScores = localStorage.getItem('scores');
//    if (!currentScores) {
//        currentScores = [];
//    } else {
//        currentScores = JSON.parse(currentScores);
//    }

//    if (currentScores.length == 0) {
//        currentScores.push({ name: userName, score: mario.score });
//    } else {
//        if (mario.score < currentScores[currentScores.length - 1].score) {
//            currentScores.push({ name: userName, score: mario.score });
//        } else {
//            for (var i = 0; i < currentScores.length; i++) {
//                if (currentScores[i].score < mario.score) {
//                    currentScores.splice(i, 0, { name: userName, score: mario.score });
//                    break;
//                }
//            }
//        }
//    }
//    //TODO
//    //get the mario scores and write highscores on the screen 
//}