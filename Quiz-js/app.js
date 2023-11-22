
document.addEventListener('DOMContentLoaded', function () {
    const quizContainer = document.getElementById('quiz');
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const progressText = document.getElementById('progress');
    const restartButton = document.getElementById('restartButton');
    
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    function loadQuestions() {
        fetch('data.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            showStartScreen();
        });
    }

    function showStartScreen() {
        questionElement.innerText = 'Click aqui y averigualo';
        choicesElement.innerHTML = '';
        progressText.textContent = '';
        restartButton.style.display = 'none';
        quizContainer.addEventListener('click', startGame);
    }

    function startGame() {
        quizContainer.removeEventListener('click', startGame);
        showQuestion();
    }

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        if (currentQuestion) {
        questionElement.textContent = currentQuestion.question;
        choicesElement.innerHTML = '';

        currentQuestion.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('button');
            button.addEventListener('click', () => checkAnswer(choice === currentQuestion.answer));
            choicesElement.appendChild(button);
        });

        progressText.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
        } else {
        showEndScreen();
        }
    }

    function checkAnswer(isCorrect) {
        if (isCorrect) {
        score++;
        }
        currentQuestionIndex++;
    showQuestion();
    }

    function showEndScreen() {
        quizContainer.innerHTML = `
        <h1>¡Quiz completado!</h1>
        <p>Tu puntuación es: ${score} de ${questions.length}</p>
        <button id="restartButton">Reiniciar Quiz</button>
        `;
        restartButton.style.display = 'block';
        restartButton.addEventListener('click', restartQuiz);
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        loadQuestions();
    }
    loadQuestions();
});
