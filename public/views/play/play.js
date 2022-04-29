// DOMS ELEMENTS  ---------------------------------------------------------
const dom_start = document.getElementById("start");
const dom_quiz = document.getElementById("quiz");
const dom_question = document.getElementById("question");
const dom_choiceA = document.getElementById("A");
const dom_choiceB = document.getElementById("B");
const dom_choiceC = document.getElementById("C");
const dom_choiceD = document.getElementById("D");

const dom_score = document.getElementById("score");
const dom_score_p = document.getElementById("score_p");
const dom_score_img = document.getElementById("score_img");
const dom_prgress = document.getElementById('progress');
const dom_play_view = document.getElementById('play-view');

// DATA  ---------------------------------------------------------

// FUNCTION  ---------------------------------------------------------

//my procress abar 
let progress_width = 0;
dom_prgress.style.width= '0%';
function progressBar(){
   
  // let storedQuestion = JSON.parse(localStorage.getItem("questions"));
  let width_question =100/storedQuestion.length;
  progress_width+=width_question ;  
  dom_prgress.style.width= progress_width+'%';
  console.log( progress_width);
}


// Hide a given element
function hide(element) {
  element.style.display = "none";
}

// Show a given element
function show(element) {
  element.style.display = "block";
}

function renderQuestion() {
  let question =questions[currentQuestionIndex];
  dom_question.textContent = question.title;
  dom_choiceA.textContent = question.choiceA;
  dom_choiceB.textContent = question.choiceB;
  dom_choiceC.textContent = question.choiceC;
  dom_choiceD.textContent = question.choiceD;
  progressBar();
}
axios.get("/api/quiz").then((res)=>{
  renderQuestion(res.data);
  console.log(res.data);
})

dom_start.addEventListener("click", (event) => {
  hide(dom_start);
  show(dom_quiz);

  // 1 - load the questions from local storage
  loadQuestions();

  // 2- Reet the question index to 0
  currentQuestionIndex = 0;

  // 2 - Render the first question
  renderQuestion();
});

function checkAnswer(choice) {
  let question = question[currentQuestionIndex];
  if (choice === question.correct) {
    score += 1;
  }

  if (currentQuestionIndex < questions.length - 1) {
    // Go to the next question
    currentQuestionIndex += 1;

    // Render the nex quesiton
    renderQuestion();
  } else {
    // display score
    showScore();
  }
}

function showScore() {
  hide(dom_quiz);
  show(dom_score);

  // calculate the amount of question percent answered by the user
  const scorePerCent = Math.round((100 * score) / questions.length);

  // choose the image based on the scorePerCent
  let comment = "";
  let image = "../../img/";

  if (scorePerCent <= 20) {
    comment = "BE CAREFULL !";
    image += "20.png";
  } else if (scorePerCent <= 40) {
    comment = "YOU CAN IMPROVE !";
    image += "40.png";
  } else if (scorePerCent <= 60) {
    comment = "NOT BAD BUT... !";
    image += "60.png";
  } else if (scorePerCent <= 80) {
    comment = " NICER !";
    image += "80.png";
  } else {
    comment = "WELL DONE !";
    image += "100.png";
  }

  dom_score_p.textContent = comment + " : " + scorePerCent + " %";
  dom_score_img.src = image;
}

// localStorage.setItem('questions', JSON.stringify(questions));
 