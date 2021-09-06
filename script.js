const hsStorage = "codingquiz";
const lastPage = 6;

var timerVal = 65;
var highScores = [];
var interval;

getHighScores();
setAnswerButtons();

// Click event listeners were added to the click event buttons
document
  .getElementById("highScoresBtn")
  .addEventListener("click", displayHighScores);
document.getElementById("BackBtn").addEventListener("click", goBack);
document
  .getElementById("clearScores")
  .addEventListener("click", clearHighscores);
document.getElementById("startBtn").addEventListener("click", startQuiz);
document.getElementById("initialsBtn").addEventListener("click", saveInitials);

function displayHighScores() {
  var highscoresSection = document.getElementById("highscores");
  var highscoresList = document.getElementById("highscoreList");

  clearInterval(interval);
  clearHighscoresList();
  // Created a high scorer list for the list items
  for (var i = 0; i < highScores.length; i++) {
    var newListItem = document.createElement("li");
    newListItem.textContent = highScores[i];
    highscoresList.appendChild(newListItem);
  }
  // Section hides the navbar and the highscores section at the end of quiz page
  hideAll();
  document.querySelector("nav").hidden = true;
  highscoresSection.hidden = false;
}
// Click event for the "back to main page" button on highscores section
function goBack() {
  timerVal = 65;
  document.getElementById("timerValue").textContent = timerVal.toString();

  // sections will be hidden, then unhides navigation bar and welcome section
  hideAll();
  document.querySelector("nav").hidden = false;
  document.getElementById("welcome").hidden = false;
}
// Click event for the "clear highscore" button at the end of quiz page
function clearHighscores() {
  clearHighscoresList();

  highScores = [];
  setHighScores();
}
// Click event for "start the quiz" button on the main section
// Sections will be hidden, and will then unhide the first page
function startQuiz() {
  hideAll();
  document.getElementById("page1").hidden = false;

  // Timer section of the main page nav bar
  timerVal = 65;
  clearInterval(interval);
  interval = setInterval(updateTimer, 1000);
}
// Click event for all buttons containing the answer
function answerButtons(event) {
  var currentPage = event.target.parentElement.getAttribute("name");
  var nextPage = parseInt(currentPage) + 1;
  var correctAnswer = event.target.parentElement.getAttribute("value");
  var userAnswer = event.target.value;

  if (timerVal <= 0) {
    nextPage = lastPage;
  }

  // Goes to the next page after selecting answer from each question
  goToPage(nextPage);

  // Displays if the user chooses the correct or wrong answer
  // If user chooses the wrong answer timer deducts 10 seconds off the clock
  if (userAnswer === correctAnswer) {
    document.getElementById("correct").hidden = false;
  }
  document.getElementById("incorrect").hidden = false;
  timerVal = timerVal - 10;
}
// Click event for the "submit" button at the very end of page
function saveInitials() {
  var initialsInput = document.getElementById("initials");
  var score = 0;
  var newIndex = 0;
  // Section evaluates where each new initials with high or low scores belong in the scores list
  for (newIndex = 0; newIndex < highScores.length; newIndex++) {
    score = parseInt(highScores[newIndex].substr(-2));
    if (timerVal > score) {
      break;
    }
  }
  highScores.splice(
    newIndex,
    0,
    initialsInput.value + " - " + timerVal.toString()
  );
  initialsInput.value = "";
  setHighScores();
  displayHighScores();
}
// Added click event to every answer button containing questions
function setAnswerButtons() {
  var answerBtns = document.getElementsByClassName("answerBtn");
  for (var i = 0; i < answerBtns.length; i++) {
    answerBtns[i].addEventListener("click", answerButtons);
  }
}
// Hides sections used before displaying the most current section
function hideAll() {
  var sections = document.getElementsByTagName("section");
  for (var i = 0; i < sections.length; i++) {
    sections[i].hidden = true;
  }
}
// Gets the highscore list from the localstorage.
function getHighScores() {
  var hsList = JSON.parse(localStorage.getItem(hsStorage));
  if (hsList) {
    highScores = hsList;
  }
}
// Stores highscore list
// Removes any listed items from the scores section
// Deletes items untill nothing is remaining
function setHighScores() {
  localStorage.setItem(hsStorage, JSON.stringify(highScores));
}
function clearHighscoresList() {
  var highscoresList = document.getElementById("highscoreList");
  while (highscoresList.childNodes.length > 0) {
    highscoresList.removeChild(highscoresList.childNodes[0]);
  }
}
function goToPage(nextPg) {
  if (nextPg === lastPage) {
    clearInterval(interval);
    document.getElementById("finalScore").textContent = timerVal.toString();
  }
  hideAll();
  document.getElementsByName(nextPg.toString())[0].hidden = false;
}
