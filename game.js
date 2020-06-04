
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

// for check keyboard Clicked
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
     $("#level-title").text("Level " + level);
     nextSequence();
     started = true;
  }

});

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {
  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1)
})


function nextSequence() {

userClickedPattern = [];

  level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);


  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

//animate a flash to the button selected
  var colorId = "#" + randomChosenColour;
  $(colorId).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

//play the sound for the button colour selected
  playSound(randomChosenColour);
  animatePress(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
   $("#" + currentColor).removeClass("pressed");
 }, 100);
}

function checkAnswer(currentLevel) {

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      },1000);
    }

  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
  $("body").removeClass("game-over");
}, 200);

startOver();
  }

}
