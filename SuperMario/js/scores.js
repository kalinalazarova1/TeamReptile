var startGameScores = 0;
var currentScores = startGameScores;

var score = new Kinetic.Layer();

var scoresTextField = new Kinetic.Text({
    x: 440,
    y: 10,
    text: "SCORES",
    fontSize: 20,
    fontFamily: 'Arial Black',
    fill: 'white'
});

if (true) {

}

var currentScoresField = new Kinetic.Text({
    x: 480,
    y: 30,
    text: currentScores,
    fontSize: 20,
    fontFamily: 'Arial Black',
    fill: 'white'
});
score.add(scoresTextField);
score.add(currentScoresField);

scoreboardStage.add(score);