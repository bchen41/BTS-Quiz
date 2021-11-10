// element selectors
var startScreenEl = document.getElementById("start-screen");
var questionsScreenEl = document.getElementById("questions-screen");
var endScreenEl = document.getElementById("end-screen");
var highscoreScreenEl = document.getElementById("highscore-screen");

var questionsEl = document.querySelector(".questions");
var answerContainer = document.getElementById("answer-choices");
var isCorrect = document.getElementById("correct-wrong");

var timerEl = document.getElementById("time");

var initialsEl = document.querySelector("#initials");
var finalScore = document.getElementById("final-scores");
var viewScores = document.getElementById("view-scores");

var startButton = document.getElementById("start");
var submitButton = document.querySelector("#submit");
var answerButtons = document.querySelectorAll("li > button");
var backButton = document.getElementById("go-back");
var clearButton = document.getElementById("clear-score");

// global states
var timeLeft;
var timeInterval;
var scoreCount = 0;

// event listeners
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", displayHighscores);
backButton.addEventListener("click", startOver);

function startQuiz() {
  startScreenEl.setAttribute("class", "hide");
  timeLeft = 10;
  countdown();
  displayQuestions();
}

function countdown() {
  timeInterval = setInterval(function () {
    timerEl.textContent = timeLeft;
    timeLeft--;

    if (timeLeft >= 0) {
      if (isWin && timeLeft > 0) {
        timerEl.textContent = timeLeft;
        clearInterval(timeInterval);
      }
    }
    if (timeLeft <= 0) {
      timerEl.textContent = "0";
      displayDonePage();
      clearInterval(timeInterval);
    } else {
      clearInterval(timeInterval);
    }
  }, 1000);
}

function displayQuestions() {
  questionsScreenEl.removeAttribute("class", "hide");
  var firstQuestion = listOfQuestions[0];
  firstQuestion();
}

var listOfQuestions = [
  youngestMember,
  oldestMember,
  incorrectSong,
  howManyMembers,
];
var listOfCorrectAnswer = ["JK", "Jin", "Peter Pan", "7"];

function youngestMember() {
  questionsEl.textContent = "Who is the youngest member?";
  var answers = ["Jin", "RM", "JK", "JM"];
  for (var i = 0; i < answers.length; i++) {
    answerButtons[i].textContent = answers[i];
  }
}

function oldestMember() {
  questionsEl.textContent = "Who is the oldest member?";
  var answers = ["V", "J-Hope", "Suga", "Jin"];
  for (var i = 0; i < answers.length; i++) {
    answerButtons[i].textContent = answers[i];
  }
}

function incorrectSong() {
  questionsEl.textContent = "Which song is not by BTS?";
  var answers = ["I NEED U", "Peter Pan", "Euphoria", "Danger"];
  for (var i = 0; i < answers.length; i++) {
    answerButtons[i].textContent = answers[i];
  }
}

function howManyMembers() {
  questionsEl.textContent = "How many members are there total?";
  var answers = ["7", "8", "12", "5"];
  for (var i = 0; i < answers.length; i++) {
    answerButtons[i].textContent = answers[i];
  }
}
// For event listener after clicking answer button to display next question (calling next function)
var questionIndex = 0;
var currentQuestion;

function navigate(direction) {
  questionIndex = questionIndex + direction;

  if (questionIndex >= listOfQuestions.length) {
    timerEl.textContent = timeLeft;
    clearInterval(timeInterval);
    displayDonePage();
    return;
  }
  currentQuestion = listOfQuestions[questionIndex]();
}

function displayDonePage() {
  questionsScreenEl.setAttribute("class", "hide");
  endScreenEl.removeAttribute("class", "hide");
  finalScore.textContent = scoreCount;
}

function displayHighscores() {
  questionsScreenEl.setAttribute("class", "hide");
  endScreenEl.setAttribute("class", "hide");
  highscoreScreenEl.removeAttribute("class", "hide");
  let initials = initialsEl.value.trim();
  viewScores.textContent = initials + ": " + scoreCount;
}

answerContainer.addEventListener("click", function (event) {
  var element = event.target;

  if (element.matches("button")) {
    if (element.textContent === listOfCorrectAnswer[questionIndex]) {
      // increase score
      isCorrect.textContent = "Correct!";
      scoreCount++;
    } else {
      // decrease score
      timeLeft -= 10;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      isCorrect.textContent = "Incorrect!";
      if (scoreCount > 0) {
        scoreCount--;
      } else {
        scoreCount = 0;
      }
    }
    navigate(1);
    setTimeout(function () {
      isCorrect.textContent = "";
    }, 750);
  }
});

function startOver() {
  location.reload();
}

/**
 * TO DO
 */

// The winGame function is called when the win condition is met

// setWins();

// The loseGame function is called when timer reaches 0

// setLosses();

var localHighScore = localStorage.getItem("scoreCount");

// sets win count to client storage
function setWins() {
  localStorage.setItem("scoreCount", scoreCount);
}
// These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  var storedScores = localStorage.getItem("scoreCount");
  // If stored value doesn't exist, set counter to 0
  if (storedScores === null) {
    scoreCount = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    scoreCount = storedScores;
  }
  //Render win count to page
  win.textContent = scoreCount;
}

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  scoreCount = 0;
  // Renders win and loss counts and sets them into client storage
  setWins();
}
