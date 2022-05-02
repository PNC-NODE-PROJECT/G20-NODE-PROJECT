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

let currentQuestionIndex = 0
let questions = [];
let score = 0;

// FUNCTION  ---------------------------------------------------------

//my procress abar 
let progress_width = 0;
dom_prgress.style.width= '0%';
function progressBar(){
  let width_question =100/storedQuestion.length;
  progress_width+=width_question ;  
  dom_prgress.style.width= progress_width+'%';
  console.log( progress_width);

}

function loadQuestions() {

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
  // progressBar();
  let URL = "http://localhost/api/quiz";
  axios.get(URL).then((result)=>{
    questions = result.data;
    let question = questions[currentQuestionIndex];
    dom_question.textContent = question.question;
    let choice = question.answer;

      dom_choiceA.textContent = choice.answer_a;
      dom_choiceB.textContent = choice.answer_b;
      dom_choiceC.textContent = choice.answer_c;
      dom_choiceD.textContent = choice.answer_d;
    
  })
}

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
  let question = questions[currentQuestionIndex];
  if (choice === question.correctAnswer) {
    score += 1;
    console.log(score)
  }

  if (currentQuestionIndex < questions.length - 1) {
    // Go to the next question
    currentQuestionIndex += 1;
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
    comment = "HUMM !";
    image += "20.png";
  } else if (scorePerCent <= 40) {
    comment = "YOU CAN IMPROVE !";
    image += "40.png";
  } else if (scorePerCent <= 60) {
    comment = "NOT BAD BUT... !";
    image += "60.png";
  } else if (scorePerCent <= 80) {
    comment = " GOOD !";
    image += "80.png";
  } else {
    comment = "CRAZY AMAZING !";
    image += "100.png";
  }

  dom_score_p.textContent = comment + " : " + scorePerCent + " %";
  dom_score_img.src = image;
}
