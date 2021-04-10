// variables to reference DOM elements
var startBtn = document.getElementById("start");
var questionEl = document.getElementById("question");
var timerEl = document.getElementById("time");
var optionsEl = document.getElementById("options");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var submitBtn = document.getElementById("btn-submit");

// variables to keep track of coding quiz 
var currentQuestionIndex = 0;
var time = question.length * 15;
var timerId;

// sounds when choices are made
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  questionEl.removeAttribute("class");

  // show the start time
  timerEl.textContent = time;
  
  // start timer
  timerId = setInterval(clockTick, 1000);


  getQuestion();
}

function getQuestion() {
  // get recent question object from array
  var currentQuestion = question[currentQuestionIndex];

  // update title with recent question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear out old question options
  optionsEl.innerHTML = "";

  // loop over options
  currentQuestion.options.forEach(function(options, i) {
    // create new button for each options
    var optionsNode = document.createElement("button");
    optionsNode.setAttribute("class", "options");
    optionsNode.setAttribute("value", options);

    optionsNode.textContent = i + 1 + ". " + options;

    // attach click event listener to each choice
    optionsNode.onclick = questionClick;

    // display on the page
    optionsEl.appendChild(optionsNode);
  });
}

function questionClick() {
  // check if user guessed wrong
  if (this.value !== question[currentQuestionIndex].answer) {
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // display new time on page
    timerEl.textContent = time;

    // play "wrong" sound effect
    sfxWrong.play();

    feedbackEl.textContent = "Wrong!";
    
  } else {
    // play "right" sound effect
    sfxRight.play();

    feedbackEl.textContent = "Correct!";
  }

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // go to next question
  currentQuestionIndex++;

  // check if questions are done
  if (currentQuestionIndex === question.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}
function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}
function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionEl.setAttribute("class", "hide");
}

function saveTopscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value isn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var topscores =
      JSON.parse(window.localStorage.getItem("topscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to topscores to localstorage
    topscores.push(newScore);
    window.localStorage.setItem("topscores", JSON.stringify(topscores));

    
    window.location.href = "topscores.html";
  }
}

function checkForEnter(event) {
  // represents the enter key
  if (event.key === "Enter") {
    saveTopscore();
  }
}

// submit initials button
submitBtn.onclick = saveTopscore;

// button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
