// =======================================
// 画面要素
// =======================================
const titleScreen = document.getElementById("title-screen");
const levelScreen = document.getElementById("level-screen");
const quizScreen = document.getElementById("quiz-screen");

const countryName = document.getElementById("country-name");
const flagOptions = document.getElementById("flag-options");
const resultMark = document.getElementById("result-mark");
const timerDisplay = document.getElementById("timer");
const currentLevelLabel = document.getElementById("current-level");

// =======================================
// 変数
// =======================================
let currentQuizType = null;      // "location" or "flag"
let level = 1;
let questions = [];
let questionIndex = 0;

let timer = null;
let timeSec = 0;

const correctSound = new Audio("correct.wav");
const wrongSound = new Audio("wrong.wav");

// =======================================
// 画面遷移
// =======================================
function selectQuiz(type) {
    currentQuizType = type;

    // タイトルを消してレベル選択へ
    titleScreen.classList.add("hidden");
    levelScreen.classList.remove("hidden");
}

function backToTitle() {
    levelScreen.classList.add("hidden");
    quizScreen.classList.add("hidden");
    titleScreen.classList.remove("hidden");
}

function returnToLevel() {
    quizScreen.classList.add("hidden");
    levelScreen.classList.remove("hidden");
}

// =======================================
// ゲーム開始
// =======================================
function startGame(selectedLevel) {
    level = selectedLevel;
    questionIndex = 0;
    timeSec = 0;

    currentLevelLabel.textContent = "レベル " + level;

    // レベルに応じたデータを取得
    questions = quizData["level" + level];

    // 画面遷移
    levelScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    startTimer();
    showQuestion();
}

// =======================================
// タイマー
// =======================================
function startTimer() {
    if (timer) clearInterval(timer);

    timer = setInterval(() => {
        timeSec++;
        const m = String(Math.floor(timeSec / 60)).padStart(2, "0");
        const s = String(timeSec % 60).padStart(2, "0");
        timerDisplay.textContent = `${m}:${s}`;
    }, 1000);
}

function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
}

// =======================================
// 問題表示
// =======================================
function showQuestion() {
    const q = questions[questionIndex];

    resultMark.textContent = "";
    countryName.textContent = q.name;

    // 「場所をさがす」は国名だけ出す
    if (currentQuizType === "location") {
        flagOptions.classList.add("hidden");
        return;
    }

    // 「国旗３択クイズ」
    createFlagChoices(q);
}

// =======================================
// 国旗３択生成
// =======================================
function createFlagChoices(q) {
    flagOptions.innerHTML = "";
    flagOptions.classList.remove("hidden");

    let choices = shuffle([q.correctFlag, q.wrongFlag1, q.wrongFlag2]);

    for (let imgSrc of choices) {
        let img = document.createElement("img");
        img.src = imgSrc;
        img.className = "flag-option";

        img.onclick = () => checkFlagAnswer(imgSrc, q.correctFlag);
        flagOptions.appendChild(img);
    }
}

// =======================================
// 正誤判定
// =======================================
function checkFlagAnswer(selected, correct) {
    if (selected === correct) {
        resultMark.textContent = "〇";
        resultMark.className = "correct";
        correctSound.play();

        setTimeout(() => {
            nextQuestion();
        }, 700);
    } else {
        resultMark.textContent = "×";
        resultMark.className = "wrong";
        wrongSound.play();
    }
}

// =======================================
// 次の問題
// =======================================
function nextQuestion() {
    questionIndex++;

    if (questionIndex >= questions.length) {
        // 終了
        stopTimer();
        countryName.textContent = "おわり！";
        flagOptions.classList.add("hidden");
        return;
    }

    showQuestion();
}

// =======================================
// シャッフル関数
// =======================================
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
