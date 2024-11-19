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
let isQuizFinished = false; // Vérifier si le quiz est terminé

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
        if (isQuizFinished) return; // Si le quiz est terminé, on arrête le minuteur
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
    isQuizFinished = true; // Le quiz est maintenant terminé
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').innerText = `Vous avez obtenu ${score} sur ${quizData.length}`;
    document.getElementById('retry').style.display = 'block';
    document.getElementById('corrige-btn').style.display = 'block'; // Affiche le bouton pour accéder au corrigé
}

function retryQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60; // Réinitialise le chronomètre
    isQuizFinished = false; // Réinitialise l'état du quiz
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('result').innerText = '';
    document.getElementById('retry').style.display = 'none';
    document.getElementById('corrige-btn').style.display = 'none'; // Cache le bouton de corrigé
    startTimer(); // Redémarre le chronomètre
    loadQuestion();
}

function showCorrige() {
    const corrigeContainer = document.getElementById('result');
    corrigeContainer.innerHTML = `<h3>Corrigé :</h3>`;
    quizData.forEach((question, index) => {
        const userAnswer = document.querySelector(`#options button:nth-child(${index + 1})`).innerText; // Récupère la réponse de l'utilisateur
        const correctAnswer = question.options[question.correct];
        const correctText = userAnswer === correctAnswer ? "Bonne réponse" : `la bonne réponse était: ${correctAnswer}`; 
        corrigeContainer.innerHTML += `<p><strong>Question ${index + 1} :</strong> ${correctText}</p>`;
    });

    document.getElementById('retry').style.display = 'block'; // Affiche le bouton pour refaire le quiz
}

function goToMenu() {
    // Réinitialisation de l'état du quiz
    document.getElementById('start-container').style.display = 'block'; // Affiche la page de démarrage
    document.getElementById('quiz-container').style.display = 'none'; // Cache la page du quiz
    document.getElementById('quiz').style.display = 'block'; // Assurez-vous que les questions sont visibles quand on revient
    document.getElementById('result').innerText = ''; // Efface les résultats
    document.getElementById('retry').style.display = 'none'; // Cache le bouton "Refaire le quiz"
    document.getElementById('corrige-btn').style.display = 'none'; // Cache le bouton "Accéder au corrigé"
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60; // Réinitialise le chronomètre
    isQuizFinished = false; // Réinitialise l'état du quiz
}





