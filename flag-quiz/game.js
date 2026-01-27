/* ==========================
   共通データ
========================== */

const levelData = {
    1: [
        ["日本", "jp"], ["アメリカ", "us"], ["カナダ", "ca"],
        ["フランス", "fr"], ["ドイツ", "de"], ["イタリア", "it"],
        ["中国", "cn"], ["韓国", "kr"], ["イギリス", "gb"], ["オーストラリア", "au"]
    ],
    2: [
        ["インド", "in"], ["ブラジル", "br"], ["ロシア", "ru"],
        ["メキシコ", "mx"], ["スペイン", "es"], ["トルコ", "tr"],
        ["サウジアラビア", "sa"], ["スウェーデン", "se"], ["インドネシア", "id"], ["アルゼンチン", "ar"]
    ],
    3: [
        ["ノルウェー", "no"], ["フィンランド", "fi"], ["デンマーク", "dk"],
        ["ポーランド", "pl"], ["ウクライナ", "ua"], ["オランダ", "nl"],
        ["ベルギー", "be"], ["スイス", "ch"], ["オーストリア", "at"], ["チェコ", "cz"]
    ],
    4: [
        ["タイ", "th"], ["マレーシア", "my"], ["ベトナム", "vn"],
        ["フィリピン", "ph"], ["シンガポール", "sg"], ["ニュージーランド", "nz"],
        ["南アフリカ", "za"], ["エジプト", "eg"], ["ケニア", "ke"], ["モロッコ", "ma"]
    ],
    5: [
        ["ギリシャ", "gr"], ["ポルトガル", "pt"], ["アイルランド", "ie"],
        ["ハンガリー", "hu"], ["クロアチア", "hr"], ["ルーマニア", "ro"],
        ["ブルガリア", "bg"], ["セルビア", "rs"], ["スロバキア", "sk"], ["リトアニア", "lt"]
    ],
    6: [
        ["チリ", "cl"], ["コロンビア", "co"], ["ペルー", "pe"],
        ["ベネズエラ", "ve"], ["パキスタン", "pk"], ["バングラデシュ", "bd"],
        ["カタール", "qa"], ["アラブ首長国連邦", "ae"], ["イスラエル", "il"], ["ヨルダン", "jo"]
    ]
};

/* ==========================
   変数
========================== */
let gameType = ""; // "flag" or "country"
let currentQuestions = [];
let index = 0;
let startTime = 0;
let timerInterval;

/* 効果音 */
const correctSound = new Audio("correct.wav");
const wrongSound = new Audio("wrong.wav");

/* ==========================
   タイトル画面へ戻る
========================== */
function goTitle() {
    document.getElementById("quizTypeScreen").style.display = "block";
    document.getElementById("levelScreen").style.display = "none";
    document.getElementById("quizScreen").style.display = "none";
    document.getElementById("flagQuizScreen").style.display = "none";
    document.getElementById("resultScreen").style.display = "none";
}

/* ==========================
   クイズの種類を選択
========================== */
function selectGame(type) {
    gameType = type;

    document.getElementById("quizTypeScreen").style.display = "none";
    document.getElementById("levelScreen").style.display = "block";
}

/* ==========================
   レベル開始
========================== */
function startLevel(level) {

    currentQuestions = [...levelData[level]]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

    index = 0;

    document.getElementById("levelScreen").style.display = "none";

    if (gameType === "country") {
        document.getElementById("quizScreen").style.display = "block";
    } else {
        document.getElementById("flagQuizScreen").style.display = "block";
    }

    startTimer();
    showQuestion();
}

/* ==========================
   タイマー
========================== */
function startTimer() {
    startTime = Date.now();
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        const now = Date.now();
        const sec = Math.floor((now - startTime) / 1000);
        document.getElementById("timer").textContent = `タイム: ${sec}秒`;
    }, 200);
}

function stopTimer() {
    clearInterval(timerInterval);
    return Math.floor((Date.now() - startTime) / 1000);
}

/* ==========================
   国名クイズ（地球儀を探す）
========================== */
function showQuestion() {
    const q = currentQuestions[index];

    document.getElementById("questionNum").textContent = `第 ${index + 1} 問`;
    document.getElementById("countryName").textContent = q[0];

    if (gameType === "country") {
        document.getElementById("flagImage").src = `https://flagcdn.com/h240/${q[1]}.png`;
    } else {
        createFlagChoices(q);
    }
}

/* ==========================
   国旗3択クイズを表示
========================== */
function createFlagChoices(correctQ) {
    const correctCode = correctQ[1];

    // 不正解候補を作る
    const others = Object.values(levelData).flat()
        .filter(c => c[1] !== correctCode)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);

    const choices = [
        correctQ,
        ...others
    ].sort(() => Math.random() - 0.5);

    let html = "";
    choices.forEach(ch => {
        html += `
            <div class="flagChoice" onclick="selectFlag('${correctCode}', '${ch[1]}')">
                <img src="https://flagcdn.com/h160/${ch[1]}.png">
            </div>
        `;
    });

    document.getElementById("flagChoices").innerHTML = html;
}

/* ==========================
   国旗の回答チェック
========================== */
function selectFlag(correctCode, selectedCode) {
    const resultBox = document.getElementById("judge");

    if (correctCode === selectedCode) {
        correctSound.play();
        resultBox.textContent = "〇";
        resultBox.style.color = "green";

        setTimeout(() => {
            resultBox.textContent = "";
            nextQuestion();
        }, 800);

    } else {
        wrongSound.play();
        resultBox.textContent = "×";
        resultBox.style.color = "red";

        setTimeout(() => {
            resultBox.textContent = "";
        }, 800);
    }
}

/* ==========================
   次の問題へ
========================== */
function nextQuestion() {
    index++;

    if (index >= 10) {
        finishQuiz();
    } else {
        showQuestion();
    }
}

/* ==========================
   結果表示
========================== */
function finishQuiz() {
    const sec = stopTimer();

    document.getElementById("quizScreen").style.display = "none";
    document.getElementById("flagQuizScreen").style.display = "none";
    document.getElementById("resultScreen").style.display = "block";

    document.getElementById("resultTime").textContent = `タイム：${sec} 秒`;
}
