// element selectors
var introQuestions = document.querySelector(".intro-questions");
var introText = document.getElementById("intro-text");
var timerEl = document.getElementById("countdown");
var isCorrect = document.getElementById("correct-wrong");
var startButton = document.getElementById("start-button");
var viewScores = document.getElementById("view-scores");
var answerButtons = document.querySelectorAll("li > button");
var answerContainer = document.getElementById("answer-choices");
var enterInitials = document.querySelector(".hidden");
var initialsEl = document.querySelector("#initials");
var submitButton = document.querySelector("#submit");

// global states
var timeLeft;
var timeInterval;
var scoreCount = 0;

// event listeners
startButton.addEventListener("click", startQuiz);

// Display initial page
introQuestions.textContent = "BTS Quiz Challenge!";
introText.textContent =
  "Try to answer the following BTS-related questions within the time limit. Keep in mind that incorrect answers will penalize your time and score!";
startButton.textContent = "Start Quiz";

// Hides answer choices on initial page
var displayAnswerContainer = document.querySelectorAll("#answer-choices > li");
for (var i = 0; i < displayAnswerContainer.length; i++) {
  displayAnswerContainer[i].setAttribute("style", "display: none");
}
// Hides Initials Form
enterInitials.setAttribute("style", "display: none");

function startQuiz() {
  startButton.style.display = "none";
  timeLeft = 10;
  countdown();
  displayQuestions();
}

function displayQuestions() {
  introText.textContent = "";
  var firstQuestion = listOfQuestions[0];
  firstQuestion();
  var displayAnswerContainer = document.querySelectorAll(
    "#answer-choices > li"
  );
  for (var i = 0; i < displayAnswerContainer.length; i++) {
    displayAnswerContainer[i].removeAttribute("style", "display: none");
  }
}

// For event listener after clicking answer button to display next question (calling next function)
var questionIndex = 0;
var currentQuestion;

function navigate(direction) {
  questionIndex = questionIndex + direction;

  if (questionIndex >= listOfQuestions.length) {
    displayDonePage();
    return;
  }
  currentQuestion = listOfQuestions[questionIndex]();
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
    }, 500);
  }
});

var listOfQuestions = [
  youngestMember,
  oldestMember,
  incorrectSong,
  howManyMembers,
];
var listOfCorrectAnswer = ["JK", "Jin", "Peter Pan", "7"];

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
  var answers = ["I NEED U", "Peter Pan", "Euphoria", "Danger"];
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

function displayDonePage() {
  introQuestions.textContent = "All done!!!";
  introText.textContent = "Your final score is: " + scoreCount;

  enterInitials.removeAttribute("style", "display: none");
  var displayAnswerContainer = document.querySelectorAll(
    "#answer-choices > li"
  );
  for (var i = 0; i < displayAnswerContainer.length; i++) {
    displayAnswerContainer[i].setAttribute("style", "display: none");
  }
}

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  enterInitials.setAttribute("style", "display: none");
  displayHighscores();
});

function displayHighscores() {
  let initials = initialsEl.value.trim();
  introQuestions.textContent = "Highscores";
  introText.textContent = initials + ": " + scoreCount;
}

function countdown() {
  timeInterval = setInterval(function () {
    timerEl.textContent = "Time: " + timeLeft;
    timeLeft--;

    if (timeLeft >= 0) {
      if (isWin && timeLeft > 0) {
        timerEl.textContent = "Time: " + timeLeft;
        clearInterval(timeInterval);
      }
    }
    if (timeLeft <= 0) {
      timerEl.textContent = "Time: 0";
      displayDonePage();
      clearInterval(timeInterval);
    } else {
      clearInterval(timeInterval);
    }
  }, 1000);
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
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins();
  setLosses();
}
