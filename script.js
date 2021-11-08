var introQuestions = document.querySelector(".intro-questions");
var introText = document.getElementById("intro-text");
var timerEl = document.getElementById("countdown");
var isCorrect = document.getElementById("correct-wrong");
var startButton = document.getElementById("start-button");
var viewScores = document.getElementById("view-scores");
var answerButtons = document.querySelectorAll("li > button");
var answerContainer = document.getElementById("answer-choices");


var scoreCounter = 0;
var timeLeft;
var timeInterval;



// Display initial page
introQuestions.textContent = "BTS Quiz Challenge!";
introText.textContent = "Try to answer the following BTS-related questions within the time limit. Keep in mind that incorrect answers will penalize your time and score!";
startButton.textContent = "Start Quiz";


// Hides answer choices on initial page
var displayAnswerContainer = document.querySelectorAll("#answer-choices > li");
for (var i = 0; i < displayAnswerContainer.length; i++) {
    displayAnswerContainer[i].setAttribute("style", "display: none");
}

// function init() {
//     getWins();
//     getlosses();
// }


startButton.addEventListener("click", startQuiz);
function startQuiz() {
    startButton.disabled = true;
    startButton.style.display = "none";
    timeLeft = 3
    countdown();
    displayQuestions(); 
    
}

function displayQuestions() {
    introText.textContent = "";
    listOfQuestions[0]();
    var displayAnswerContainer = document.querySelectorAll("#answer-choices > li");
        for (var i = 0; i < displayAnswerContainer.length; i++) {
        displayAnswerContainer[i].removeAttribute("style", "display: none");
    }
}

// For event listener after clicking answer button to display next question (calling next function)
var i = 0;
var currentQuestion;

function navigate(direction) {
    i = i + direction;
    
    if (i >= listOfQuestions.length -1) {
        index = 0;
    }
    currentQuestion = listOfQuestions[i]();
}

answerContainer.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches("button")){
        navigate(1);
    };
});

navigate(0);

var listOfQuestions = [youngestMember, oldestMember, incorrectSong, howManyMembers];

function youngestMember() {
    introQuestions.textContent = "Who is the youngest member?";
    var answers = ["Jin", "RM", "JK", "JM"];
    for (var i = 0; i < answers.length; i++) {
        answerButtons[i].textContent = answers[i];
    }
}

function oldestMember() {
    introQuestions.textContent = "Who is the oldest member?";
    var answers = ["V", "J-Hope", "Suga", "Jin"];
    for (var i = 0; i < answers.length; i++) {
        answerButtons[i].textContent = answers[i];
    }
}

function incorrectSong() {
    introQuestions.textContent = "Which song is not by BTS?";
    var answers = ["I NEED U", "Danger", "Euphoria", "Peter Pan"];
    for (var i = 0; i < answers.length; i++) {
        answerButtons[i].textContent = answers[i];
    } 
}

function howManyMembers() {
    introQuestions.textContent = "How many members are there total?";
    var answers = ["7", "8", "12", "5"];
    for (var i = 0; i < answers.length; i++) {
        answerButtons[i].textContent = answers[i];
    }
}

function countdown() {

    timeInterval = setInterval(function() {
        
        timerEl.textContent = "Time: " + timeLeft;
        timeLeft--;
        if (timeLeft >= 0) {
            if (isWin && timeLeft > 0) {
                clearInterval(timeInterval);
                correctAnswer();
            }
        }
        if (timeLeft === 0) {
            clearInterval(timeInterval);
            incorrectAnswer();
        }
        else {
            clearInterval(timeInterval);
        }    
    }, 1000);
}

// The winGame function is called when the win condition is met
function correctAnswer() {
    isCorrect.textContent = "Correct!";
    scoreCounter++;
    setWins();
}

// The loseGame function is called when timer reaches 0
function incorrectAnswer() {
    isCorrect.textContent = "Incorrect!";
    scoreCounter--;
    setLosses();
}

// Updates win count on screen and sets win count to client storage
function setWins() {
    win.textContent = winCounter;
    localStorage.setItem("scoreCount", winCounter);
  }
  
  // Updates lose count on screen and sets lose count to client storage
  function setLosses() {
    lose.textContent = loseCounter;
    localStorage.setItem("loseCount", loseCounter);
  }

// These functions are used by init
function getWins() {
    // Get stored value from client storage, if it exists
    var storedScores = localStorage.getItem("scoreCount");
    // If stored value doesn't exist, set counter to 0
    if (storedScores === null) {
      scoreCounter = 0;
    } else {
      // If a value is retrieved from client storage set the winCounter to that value
      scoreCounter = storedScores;
    }
    //Render win count to page
    win.textContent = scoreCounter;
  }
  
  function getlosses() {
    var storedLosses = localStorage.getItem("loseCount");
    if (storedLosses === null) {
      loseCounter = 0;
    } else {
      loseCounter = storedLosses;
    }
    lose.textContent = loseCounter;
  }

  // Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()
  setLosses()
}
// Attaches event listener to button
// resetButton.addEventListener("click", resetGame);
