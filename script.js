const quizData = {
    "Berlin": "Deutschland",
    "Paris": "Frankreich",
    "Madrid": "Spanien",
    "Rom": "Italien",
    "Tokio": "Japan",
    "Ottawa": "Kanada",
    "Canberra": "Australien",
    "Lissabon": "Portugal",
    "Stockholm": "Schweden",
    "Wien": "Österreich"
};

let cities = Object.keys(quizData);
let currentIndex = 0;
let score = 0;


cities.sort(() => Math.random() - 0.5);


const questionText = document.getElementById('question-text');
const userInput = document.getElementById('user-input');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const currentNumDisplay = document.getElementById('current-num');
const submitBtn = document.getElementById('submit-btn');

function loadQuestion() {
    if (currentIndex < cities.length) {
        questionText.innerText = `In welchem Land liegt ${cities[currentIndex]}?`;
        userInput.value = '';
        userInput.focus();
        currentNumDisplay.innerText = currentIndex + 1;
    } else {
        showResults();
    }
}

function checkAnswer() {
    const answer = userInput.value.trim().toLowerCase();
    const correctAnswer = quizData[cities[currentIndex]].toLowerCase();

    if (answer === "") return; 

    if (answer === correctAnswer) {
        score++;
        feedback.innerText = "Richtig! ✅";
        feedback.className = "correct";
    } else {
        feedback.innerText = `Falsch! Richtig war: ${quizData[cities[currentIndex]]} ❌`;
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
    const percent = (score / cities.length) * 100;
    document.getElementById('final-score').innerText = `Du hast ${score} von ${cities.length} Punkten erreicht (${percent}%).`;
}


submitBtn.addEventListener('click', checkAnswer);

userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkAnswer();
    }
});


loadQuestion();
