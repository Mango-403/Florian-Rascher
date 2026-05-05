const quizData = {
    "Wie nennt man die kleinste Informationseinheit im Computer?": "Bit",
    "Welches Zahlensystem besteht nur aus 0 und 1?": "Binärsystem",
    "Wie heißt das 'Gehirn' des Computers (Abkürzung)?": "CPU",
    "Welches Protokoll wird für das Laden von Webseiten verwendet?": "HTTP",
    "Wie nennt man eine Fehlersuche in einem Programm?": "Debugging",
    "Was ist das binäre Äquivalent zur Dezimalzahl 2?": "10",
    "Wie nennt man die physischen Bauteile eines Computers?": "Hardware",
    "In welcher Sprache schreibt man das Grundgerüst einer Webseite?": "HTML",
    "Welcher Datentyp speichert Wahrheitswerte (True/False)?": "Boolean",
    "Wie nennt man ein abgeschlossenes Regelwerk zur Lösung eines Problems?": "Algorithmus"
};

let questions = Object.keys(quizData);
let currentIndex = 0;
let score = 0;

// Fragen mischen
questions.sort(() => Math.random() - 0.5);

const questionText = document.getElementById('question-text');
const userInput = document.getElementById('user-input');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const currentNumDisplay = document.getElementById('current-num');
const submitBtn = document.getElementById('submit-btn');

function loadQuestion() {
    if (currentIndex < questions.length) {
        questionText.innerText = questions[currentIndex];
        userInput.value = '';
        userInput.focus();
        currentNumDisplay.innerText = currentIndex + 1;
    } else {
        showResults();
    }
}

function checkAnswer() {
    const answer = userInput.value.trim().toLowerCase();
    const correctAnswer = quizData[questions[currentIndex]].toLowerCase();

    if (answer === "") return; 

    if (answer === correctAnswer) {
        score++;
        feedback.innerText = "Richtig! ✅";
        feedback.className = "correct";
    } else {
        feedback.innerText = `Falsch! Richtig war: ${quizData[questions[currentIndex]]} ❌`;
        feedback.className = "wrong";
    }

    scoreDisplay.innerText = score;
    currentIndex++;
    submitBtn.disabled = true;

    setTimeout(() => {
        feedback.innerText = "";
        submitBtn.disabled = false;
        loadQuestion();
    }, 1500);
}

function showResults() {
    document.getElementById('game-ui').classList.add('hidden');
    document.getElementById('result-ui').classList.remove('hidden');
    const percent = (score / questions.length) * 100;
    document.getElementById('final-score').innerText = `Du hast ${score} von ${questions.length} Fragen richtig beantwortet (${percent}%).`;
}

submitBtn.addEventListener('click', checkAnswer);
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") checkAnswer();
});

loadQuestion();
