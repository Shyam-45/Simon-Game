var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern =[];

var start = false;
var level = 0;
var buttonCount = 0;

var maxScore = 0;

//Check for any key press on keyboard
$(document).keypress( function() {
    
    if( !start) {
        $("h1").text("Level 0");
        nextSequence();
        start = true;
    }
});

//Look for button pressed by user
$(".btn").click( function(ele) {

    buttonCount++;
    var userChosenColor = ele.target.id;
    //var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    var res = checkAnswer(buttonCount);   
    if(res) {

        console.log("Success");

        if(buttonCount === level) {
            
            buttonCount = 0;
            userClickedPattern = [];

            setTimeout( function() {
                nextSequence();
            }, 1000);
        }
            
    }
    else {

        maxScore = Math.max(maxScore, buttonCount);
        $("h3").text(maxScore);

        buttonCount = 0;
        //play Wrong Sound
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout( function() {
            $("body").removeClass("game-over");
        }, 200);

        //Game Over
        console.log("Error");
        startOver();
        
        $("h1").text("Game Over, Press Any Key to Start");

    }
})

function startOver() {

    start = false;
    level = 0;

    //update gamePattern 
    gamePattern = [];
    userClickedPattern = [];
}

function checkAnswer(buttonCount) {

    if(gamePattern[buttonCount - 1] !== userClickedPattern[buttonCount - 1]) {
        return false;
    }

    return true;
}

function nextSequence() {
    
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];    
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(50).fadeIn(50);

    playSound(randomChosenColor);

}

/*function playAudio(color) {

    // switch(color) {
        
    //     case "red" : 
    //         var red = new Audio("./sounds/red.mp3");
    //         red.play();
    //     break;

    //     case "blue" : 
    //         var blue = new Audio("./sounds/blue.mp3");
    //         blue.play();
    //     break;

    //     case "green" : 
    //         var green = new Audio("./sounds/green.mp3");
    //         green.play();
    //     break;

    //     case "yellow" : 
    //         var yellow = new Audio("./sounds/yellow.mp3");
    //         yellow.play();
    //     break;

    //     default :
    //         alert("Error");
    //         var error = new Audio("./sounds/wrong.mp3");
    //         error.play();
    // }

}*/


//Play Audio for req. button
function playSound(name) {
    
    var soundFile = "./sounds/" + name + ".mp3";
    var sound = new Audio (soundFile);
    sound.play();
}

//Add Animation to user clicks
function animatePress(currentColor) {
    
    $("." + currentColor).addClass("pressed");
    setTimeout( function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}
