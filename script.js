// element selectors
var startScreenEl = document.getElementById("start-screen");
var questionsScreenEl = document.getElementById("questions-screen");
var endScreenEl = document.getElementById("end-screen");
var highScoreScreenEl = document.getElementById("highscore-screen");

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
var clearButton = document.getElementById("clear-scores");

// global states
var timeLeft;
var timeInterval;
var scoreCounter = 0;

// event listeners
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", displayHighscores);
backButton.addEventListener("click", startOver);
clearButton.addEventListener("click", clearScore);

if (localStorage.getItem("scoreCount")) {
  document
    .querySelector("#view-highscore-screen a")
    .setAttribute("href", "highscores.html");
}

function startQuiz() {
  startScreenEl.setAttribute("class", "hide");
  timeLeft = 15 * 10;
  countdown();
  displayQuestions();
}

function countdown() {
  timerEl.textContent = timeLeft;
  timeLeft--;
  timeInterval = setInterval(function () {
    timerEl.textContent = timeLeft;
    timeLeft--;

    if (timeLeft <= 0) {
      timerEl.textContent = "0";
      displayDonePage();
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
  breedOfJKDog,
  formerCompanyName,
  debutYear,
  rapperWho,
  collabWho,
  billionViews,
];
var listOfCorrectAnswer = [
  "JK",
  "Jin",
  "Peter Pan",
  "7",
  "Doberman",
  "Big Hit Entertainment",
  "2013",
  "Kim Namjoon",
  "All of the above",
  "DNA",
];

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

function breedOfJKDog() {
  questionsEl.textContent = "What breed is JK's dog?";
  var answers = ["Shih Tzu", "Toy Poodle", "America Eskimo", "Doberman"];
  for (var i = 0; i < answers.length; i++) {
    answerButtons[i].textContent = answers[i];
  }
}

function formerCompanyName() {
  questionsEl.textContent = "What was the former name of BTS' company label?";
  var answers = ["JYP", "Big Hit Entertainment", "HYBE", "SM"];
  for (var i = 0; i < answers.length; i++) {
    answerButtons[i].textContent = answers[i];
  }
}

function debutYear() {
  questionsEl.textContent = "In what year did BTS debut?";
  var answers = ["2013", "2011", "2015", "2008"];
  for (var i = 0; i < answers.length; i++) {
    answerButtons[i].textContent = answers[i];
  }
}

function rapperWho() {
  questionsEl.textContent = "Who is a rapper out of the given choices?";
  var answers = ["Kim Taehyung", "Jung Hoseok", "Kim Seokjin", "Kim Namjoon"];
  for (var i = 0; i < answers.length; i++) {
    answerButtons[i].textContent = answers[i];
  }
}

function collabWho() {
  questionsEl.textContent =
    "Which of the person(s)/group have BTS collabed with?";
  var answers = [
    "Megan Thee Stallion",
    "Coldplay",
    "Halsey",
    "All of the above",
  ];
  for (var i = 0; i < answers.length; i++) {
    answerButtons[i].textContent = answers[i];
  }
}

function billionViews() {
  questionsEl.textContent =
    "Which BTS music video reached 1 billion views first out of these choices?";
  var answers = ["DNA", "Fake Love", "Boy With Luv", "Mic Drop"];
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

answerContainer.addEventListener("click", function (event) {
  var element = event.target;

  if (element.matches("button")) {
    if (element.textContent === listOfCorrectAnswer[questionIndex]) {
      // increase score
      isCorrect.textContent = "Correct!";
      scoreCounter++;
    } else {
      // decrease score
      timeLeft -= 10;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      isCorrect.textContent = "Incorrect!";
      if (scoreCounter > 0) {
        scoreCounter--;
      } else {
        scoreCounter = 0;
      }
    }
    navigate(1);
    setTimeout(function () {
      isCorrect.textContent = "";
    }, 750);
  }
});

function displayDonePage() {
  questionsScreenEl.setAttribute("class", "hide");
  endScreenEl.removeAttribute("class", "hide");
  finalScore.textContent = scoreCounter;
}

function setScores(newScore) {
  const storedScore = localStorage.getItem("scoreCount");
  if (storedScore === null) {
    localStorage.setItem("scoreCount", JSON.stringify([newScore]));
    var viewHighScoreLink = document.querySelector("#view-highscore-screen a");
    viewHighScoreLink.setAttribute("href", "highscores.html");
  } else {
    const storedScoreArr = JSON.parse(storedScore);
    storedScoreArr.push(newScore);
    storedScoreArr.sort(function (a, b) {
      const aNum = parseInt(a.split("-")[1].trim());
      const bNum = parseInt(b.split("-")[1].trim());
      return bNum - aNum;
    });
    localStorage.setItem("scoreCount", JSON.stringify(storedScoreArr));
  }
}

function displayHighscores() {
  questionsScreenEl.setAttribute("class", "hide");
  endScreenEl.setAttribute("class", "hide");
  highScoreScreenEl.removeAttribute("class", "hide");
  let initials = initialsEl.value.trim();
  viewScores.textContent = initials + " - " + scoreCounter;
  const newScore = initials + " - " + scoreCounter;
  setScores(newScore);
}

function startOver() {
  location.reload();
}

function clearScore() {
  scoreCounter = 0;
  localStorage.clear();
}
