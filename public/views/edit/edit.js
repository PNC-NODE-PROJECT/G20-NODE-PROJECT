// DOMS ELEMENTS  ---------------------------------------------------------
const dom_questions_view = document.getElementById("questions-view");
const dom_questions_dialog = document.getElementById("questions-dialog");
const dom_createEditButton = document.getElementById("createEditButton");
let questionToEdit = null;

function displayQuestion(){
  let URL ="http://localhost/api/quiz";
  axios.get(URL).then((result) =>{
    let data=result.data;
    renderQuestions(data);
  })
}
// HIDE / SHOW ---------------------------------------------------------
function hide(element) {
  element.style.display = "none";
}

function show(element) {
  element.style.display = "block";
}

//  LOCAL STORAGE ---------------------------------------------------------
function loadQuestions() {

}

function renderQuestions(questions) {
  // Remove the card container and create a new one
  dom_questions_container = document.getElementById("questions-container");
  dom_questions_container.remove();
  dom_questions_container = document.createElement("div");
  dom_questions_container.id = "questions-container";
  dom_questions_view.appendChild(dom_questions_container);
  let question_id =0;
  // 2 - For all questions,  create a new div (class : item), and append it the container
  for (let index = 0; index < questions.length; index++) {
    question_id+=1;
    let add_question = questions[index];
    let card = document.createElement("div");
    card.className = "card";
    card.id=add_question.id;
    let card_header = document.createElement('div');
    card_header.className = 'card-header';

    card.appendChild(card_header);
    dom_questions_container.appendChild(card);

    let questionInfos = document.createElement("div");
    questionInfos.className = "question-info";
    card_header.appendChild(questionInfos);

    let title = document.createElement("spam");
    title.className = "title";
    title.textContent = add_question.question;
    questionInfos.appendChild(title);

    // Create spams for title and author
    let actions = document.createElement("div");
    actions.className = "actions";
    card_header.appendChild(actions);

    let editAction = document.createElement("img");
    editAction.src = "../../img/edit.svg";
    editAction.addEventListener("click", editQuestion);
    actions.appendChild(editAction);

    let trashAction = document.createElement("img");
    trashAction.src = "../../img/trash.png";
    trashAction.addEventListener("click", removeQuestion);
    actions.appendChild(trashAction);
    let answers_container= document.createElement('div');
    answers_container.className ='answer-container';
    answers_container.id=question_id;

    let answer_1 =document.createElement('div');
    answer_1.className = 'answer';
    answer_1.id = 'A';
    let para_1 = document.createElement('p');
    answer_1.appendChild(para_1);
    para_1.textContent =add_question.answer.answer_a;
    let icon_true = document.createElement('i');
    icon_true.className= 'fa fa-check-circle-o';
    

    let answer_2 =document.createElement('div');
    answer_2.className = 'answer';
    answer_2.id ='B';
    let para_2 = document.createElement('p');
    answer_2.appendChild(para_2);
    para_2.textContent =add_question.answer.answer_b;


    let answer_3 =document.createElement('div');
    answer_3.className = 'answer';
    answer_3.id ='C';
    let para_3 = document.createElement('p');
    answer_3.appendChild (para_3);
    para_3 .textContent =add_question.answer.answer_c;


    let answer_4 =document.createElement('div');
    answer_4.className = 'answer';
    answer_4.id ='D';
    let para_4 = document.createElement('p');
    answer_4.appendChild(para_4);
    para_4.textContent =add_question.answer.answer_d;

    answers_container.appendChild(answer_1);
    answers_container.appendChild(answer_2);
    answers_container.appendChild(answer_3);
    answers_container.appendChild(answer_4);


    card.appendChild(answers_container);
    let answers = document.getElementById(question_id);
    console.log(answers.childNodes);
    for(let element of answers.childNodes){
    if( element.id==add_question.correct){
      element.appendChild(icon_true);
      console.log(element);
      }
    };
  }
}

function editQuestion(event) {
  //  Get the question index
  questionToEdit = event.target.parentElement.parentElement.dataset.index;
  // update the dialog with question informatin
  let question = questions[questionToEdit];
  document.getElementById("title").value = question.title;
  document.getElementById("choiceA").value = question.choiceA;
  document.getElementById("choiceB").value = question.choiceB;
  document.getElementById("choiceC").value = question.choiceC;
  document.getElementById("choiceD").value = question.choiceD;

  // Show the dialog
  dom_createEditButton.textContent = "EDIT";
  show(dom_questions_dialog);
}

function getData(){
  axios.get("http://localhost/api/quiz/").then((res)=>{
    renderQuestions(res.data);
    console.log(res.data);
  })
}

function onAddQuestion() {
  show(dom_questions_dialog);
}

function onCancel(e) {
  dom_createEditButton.textContent = "CREATE";
  hide(dom_questions_dialog);
}

function removeQuestion(event) {
  //  Get index
  if (event.target.src="../../img/trash.png"){
    let id = event.target.parentNode.parentNode.parentNode.id;
    // console.log(id);
    axios.delete("http://localhost/api/quiz/"+id);
    getData();
  }
}

function onCreate() {
  hide(dom_questions_dialog);
  let newQuestion = {
   title :document.getElementById("title").value,
   correct : "A",
   choiceA : document.getElementById("choiceA").value,
   choiceB : document.getElementById("choiceB").value,
   choiceC : document.getElementById("choiceC").value,
   choiceD : document.getElementById("choiceD").value,
  };
  axios.post("http://localhost/api/quiz/",newQuestion).then((res)=>{
    console.log(res.data);
    displayQuestion();
    saveQuestions();
    console.log(newQuestion);
  })
}
loadQuestions();
// MAIN  ---------------------------------------------------------
getData();
displayQuestion();



