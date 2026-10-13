// Questions
let quiz = [
  { q: "HTML stands for?", a: ["Hyper Text Markup Language", "High Text Machine Language", "Home Tool Markup Language"], c: 0 },
  { q: "CSS is used for?", a: ["Styling", "Programming", "Database"], c: 0 },
  { q: "JavaScript is?", a: ["Markup", "Programming Language", "Style Sheet"], c: 1 }
];

// Variables
let i = 0;
let score = 0;

// Elements
let question = document.getElementById("question");
let answers = document.getElementById("answers");
let result = document.getElementById("result");

// Show question
function show() {

  question.innerText = quiz[i].q;

  answers.innerHTML = "";

  for (let optionIndex = 0; optionIndex < quiz[i].a.length; optionIndex++) {
    answers.innerHTML += `
      <label class="option">
        <input type="radio" name="opt" value="${optionIndex}">
        <span>${quiz[i].a[optionIndex]}</span>
      </label>
    `;
  }
}

// Next button
function nextQuestion() {

  let selected = document.querySelector('input[name="opt"]:checked');

  if (!selected || i >= quiz.length) return;

  if (Number(selected.value) === quiz[i].c) {
    score++;
  }

  i++;

  if (i < quiz.length) {
    show();
  } else {
    question.innerText = "Quiz Completed";
    answers.innerHTML = "";
    result.innerText = "Score: " + score + "/" + quiz.length;
  }
}

function submitQuiz() {
  if (i >= quiz.length) {
    result.innerText = "Final Score: " + score + "/" + quiz.length;
    return;
  }

  let selected = document.querySelector('input[name="opt"]:checked');

  if (!selected) {
    result.innerText = "Select an option before submitting.";
    return;
  }

  let previewScore = score + (Number(selected.value) === quiz[i].c ? 1 : 0);
  result.innerText = "Current Score: " + previewScore + "/" + quiz.length;
}

// Start
show();
