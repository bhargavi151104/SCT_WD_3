let currentQuestions = [];
let current = 0;
let score = 0;
let timer;
let timeLeft = 30;

function startQuiz() {
    const category = document.getElementById("category").value;

    currentQuestions = [...questions[category]]
        .sort(() => Math.random() - 0.5);

    current = 0;
    score = 0;

    document.getElementById("quizBox").classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    clearInterval(timer);

    timeLeft = 30;
    document.getElementById("timer").innerText =
        "Time: " + timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText =
            "Time: " + timeLeft;

        if (timeLeft === 0) {
            nextQuestion();
        }
    }, 1000);

    const q = currentQuestions[current];

    document.getElementById("question").innerText =
        q.question;

    const answers = document.getElementById("answers");
    answers.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;

        btn.onclick = () => {
            if (option === q.answer) {
                score++;
            }

            nextQuestion();
        };

        answers.appendChild(btn);
    });
}

function nextQuestion() {
    clearInterval(timer);

    current++;

    if (current < currentQuestions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    document.getElementById("quizBox")
        .classList.add("hidden");

    document.getElementById("result").innerHTML =
        `<h2>Your Score: ${score}</h2>`;

    let history =
        JSON.parse(localStorage.getItem("scores")) || [];

    history.push(score);

    localStorage.setItem(
        "scores",
        JSON.stringify(history)
    );

    loadHistory();
}

function loadHistory() {
    const history =
        JSON.parse(localStorage.getItem("scores")) || [];

    const list = document.getElementById("history");

    list.innerHTML = "";

    history.forEach((score, index) => {
        list.innerHTML +=
            `<li>Attempt ${index + 1}: ${score}</li>`;
    });
}

loadHistory();