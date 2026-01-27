let quizType=null;
let level=1;
let questions=[];
let index=0;
let timer=null;
let sec=0;

const titleScreen=document.getElementById("title-screen");
const levelScreen=document.getElementById("level-screen");
const quizScreen=document.getElementById("quiz-screen");

function selectQuiz(type){
    quizType=type;
    titleScreen.classList.add("hidden");
    levelScreen.classList.remove("hidden");
}

function backToTitle(){
    levelScreen.classList.add("hidden");
    quizScreen.classList.add("hidden");
    titleScreen.classList.remove("hidden");
}

function returnToLevel(){
    quizScreen.classList.add("hidden");
    levelScreen.classList.remove("hidden");
}

function startGame(lv){
    level=lv;
    index=0;
    sec=0;

    questions = quizData["level"+level];

    levelScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    startTimer();
    showQuestion();
}

function startTimer(){
    clearInterval(timer);
    timer=setInterval(()=>{
        sec++;
        document.getElementById("timer").textContent=sec+"秒";
    },1000);
}

function showQuestion(){
    const q=questions[index];
    document.getElementById("country-name").textContent=q.name;

    const options=document.getElementById("flag-options");
    options.innerHTML="";
    options.classList.remove("hidden");

    const flags=[q.code,...q.wrong];
    shuffle(flags);

    flags.forEach(code=>{
        const img=document.createElement("img");
        img.src="https://flagcdn.com/h120/"+code+".png";
        img.className="flag-choice";
        img.onclick=()=>answer(code,q.code);
        options.appendChild(img);
    });

    document.getElementById("result-mark").textContent="";
}

function answer(chosen,correct){
    const mark=document.getElementById("result-mark");

    if(chosen===correct){
        mark.textContent="⭕";
        new Audio("correct.wav").play();
        index++;
        if(index>=questions.length){
            clearInterval(timer);
            mark.textContent="クリア！ "+sec+"秒";
        }else{
            setTimeout(showQuestion,800);
        }
    }else{
        mark.textContent="❌";
        new Audio("wrong.wav").play();
    }
}

function shuffle(a){
    for(let i=a.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [a[i],a[j]]=[a[j],a[i]];
    }
}
