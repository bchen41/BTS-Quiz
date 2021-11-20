const storedScore = localStorage.getItem("scoreCount");

const storedScoreArr = JSON.parse(storedScore);

var highScoreListEl = document.getElementById("highscore-list");

for (var i = 0; i < storedScoreArr.length; i++) {
  var li = document.createElement("li");
  li.textContent = storedScoreArr[i];
  highScoreListEl.appendChild(li);
}
