
var buttonColours = ["green","red","yellow","blue"];
var randomChoosenColour;
var gamePattern=[];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(document).keydown(function(){
if(!gameStarted){
  $(".header").text("Level "+level);
  nextSequence();
  gameStarted=true;
}
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $(".header").text("Level "+level);
  var randomNumber = Math.random();
  randomNumber = randomNumber*4;
  randomNumber = Math.floor(randomNumber);
  randomChoosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);
  console.log(randomChoosenColour);
  $("#"+randomChoosenColour).fadeOut(100).fadeIn(100);
  var fileName = "sounds/"+randomChoosenColour+".mp3";
  var audio = new Audio(fileName);
  audio.play();
}

$(document).click(function(event){
  userClickedPattern.push(event.target.id)
  var fileName = "sounds/"+event.target.id+".mp3";
  $("#"+event.target.id).addClass("pressed");
  setTimeout(function(){$("#"+event.target.id).removeClass("pressed");}, 100);
  var audio = new Audio(fileName);
  audio.play();
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function(){$("body").removeClass("game-over");}, 200);
      $(".header").text("Game Over! Press any key to Restart");
      restart();
    }
}

function restart(){
  gamePattern=[];
  gameStarted=false;
  level=0;
  userClickedPattern=[];
}
