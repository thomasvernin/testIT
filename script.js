const quizData = [
    {
        question: "Que signifie HTML ?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Multi Language"],
        correct: 0
    },
    {
        question: "Quelle propriété CSS est utilisée pour changer la couleur du texte ?",
        options: ["font-color", "text-color", "color", "font-style"],
        correct: 2
    },
    {
        question: "Que signifie 'DOM' en JavaScript ?",
        options: ["Document Object Model", "Data Object Method", "Digital Object Management", "Dynamic Output Model"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer; // Pour stocker le minuteur
let timeLeft = 60; // Temps restant en secondes

function startQuiz() {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    startTimer(); // Lance le chronomètre
    loadQuestion();
}

function updateCounter() {
    document.getElementById('question-counter').innerText = `Question ${currentQuestionIndex + 1} sur ${quizData.length}`;
}

function loadQuestion() {
    updateCounter();
    const currentQuestion = quizData[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correct) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.innerText = `Temps restant : ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Temps restant : ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer); // Arrête le minuteur
            endQuiz(); // Termine le quiz
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer); // S'assure que le minuteur est arrêté
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').innerText = `Vous avez obtenu ${score} sur ${quizData.length}`;
    document.getElementById('retry').style.display = 'block';
}

function retryQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60; // Réinitialise le chronomètre
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('result').innerText = '';
    document.getElementById('retry').style.display = 'none';
    startTimer(); // Redémarre le chronomètre
    loadQuestion();
}


