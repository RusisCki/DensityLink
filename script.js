
const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');


let questionCount = 0; // index in selectedQuestions
let questionNumb = 1;  // display number 1–10

let countKa = 0;
let countKha = 0;
let countGa = 0;
let countGha = 0;

let selectedQuestions = []; // global array of 10 random questions

let music = new Audio("Cafe_in_Memory(256k).mp3");

function handleMusic(select) {
    const value = select.value;

    if (value === "on") {
        MusicON();
    } else if (value === "off") {
        MusicOFF();
    }
}

function MusicON() {
    music.loop = true; // Optional: repeat the music
    music.play();
}

function MusicOFF() {
    music.pause();
    music.currentTime = 0; // reset to start
}

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    initQuiz(); // initialize 10 random questions
}


function initQuiz() {
    // Shuffle and pick 10 questions
    let shuffled = questions.sort(() => Math.random() - 0.5);
    selectedQuestions = shuffled.slice(0, 10);
    selectedQuestions.forEach((q, i) => q.numb = i + 1);

    // Reset counters
    questionCount = 0;
    questionNumb = 1;
    countKa = 0;
    countKha = 0;
    countGa = 0;
    countGha = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
    nextBtn.classList.remove('active');
}


function showQuestions(index) {
    const questionText = document.querySelector('.question-text');

    questionText.textContent = `${selectedQuestions[index].numb}. ${selectedQuestions[index].question}`;

    let optionTag = selectedQuestions[index].options
        .map(opt => `<div class="option"><span>${opt}</span></div>`)
        .join('');
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    option.forEach(opt => opt.setAttribute('onclick', 'optionSelected(this)'));
}


function optionSelected(answer) {
    let userAnswer = answer.textContent;
    answer.classList.add('selected');

    let allOptions = optionList.children.length;

    if (userAnswer.startsWith("က")) countKa++;
    else if (userAnswer.startsWith("ခ")) countKha++;
    else if (userAnswer.startsWith("ဂ")) countGa++;
    else if (userAnswer.startsWith("ဃ")) countGha++;

    // Disable all options
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}


function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${selectedQuestions.length} Questions`;
}


nextBtn.onclick = () => {
    if (questionCount < selectedQuestions.length - 1) {
        questionCount++;
        questionNumb++;
        showQuestions(questionCount);
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    } else {
        showResultBox();
    }
}


tryAgainBtn.onclick = () => {
    initQuiz();
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');
}



function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    let personality = "";
    let sumKaKha = countKa + countKha;
    let sumKaGa = countKa + countGa;
    let sumKaGha = countKa + countGha;
    let sumKhaGa = countKha + countGa;
    let sumKhaGha = countKha + countGha;
    let sumGaGha = countGa + countGha;
    let maxPair = Math.max(sumKaKha, sumKaGa, sumKaGha, sumKhaGa, sumKhaGha, sumGaGha);
    if (countKa == 6) {
        personality = "မင်းက စိန်ခေါ်မှုတွေကို ဦးဆောင်၊ ရင်ဆိုင်တတ်တယ်။ မင်းရဲ့ သတ္တိက အခြားလူတွေကို အားရှိစေပြီး မင်းက မင်းယုံကြည်တာကို ဘယ်တော့မှ လက်မလွှတ်ဘူး။ မင်းက မင်းရဲ့ စိတ်အားထက်သန်မှုနှင့် ဗီဇအပေါ် အခြေခံပြီး မင်းအတွက် အရေးအကြီးဆုံးလူကို ကာကွယ်ပေးတယ်။ မင်းက ကြောက်နေရင်တောင် ရှေ့ကို ဆက်သွားတယ်။ ဘာလို့လဲဆိုတော့ တွန့်ဆုတ်နေတာက မင်းရဲ့ သဘာဝမဟုတ်လို့ပဲ။ မင်းက ဒုက္ခတွေကြားထဲ ရောက်သွားတတ်ပေမယ့် အမြဲတမ်း မားမားမတ်မတ် ရပ်ပြီး ရင်ဆိုင်တယ်။";
    } else if (countKha == 6) {
        personality = "မင်းက ဘာဖြစ်ဖြစ် အမြဲတမ်း ကိုယ့်ကိုယ်ကို ထိန်းချုပ်ပြီးနေတယ်။ မင်းရဲ့ စိတ်ရှည်မှုနှင့် မျှော်အမြင်ရှိမှုက အခက်အခဲတွေကြားထဲမှာ ရှင်သန်နိုင်အောင် ထိန်းပေးတယ်။ မင်းက ပြဿနာတွေထက် အေးဆေးနေရတာပိုကြိုက်တယ်။ မင်းက မလုပ်ခင်မှာ အရင်စဉ်းစားတတ်တယ်။ ပြီးတော့ မင်းက ရည်ရွယ်ချက်နှင့် နားလည်မှုရှိမှ လှုပ်ရှားတယ်။ မင်းက မြစ်ကြီးတစ်စင်းလို၊ မင်းရဲ့ ငြိမ်သက်မှုက မင်းရဲ့ အစွမ်းပဲ။";
    } else if (countGa == 6) {
        personality = "မင်းက ဘယ်ကိုသွားသွား ခွန်အားအပြည့်ပဲ။ လူတွေက မင်းရဲ့ အနားမှာရှိနေရင် ပျော်ကြတယ်။ မင်းရဲ့ ရယ်သံတွေက အခြားလူတွေရဲ့ မကောင်းတဲ့နေ့ကိုတောင် ကောင်းအောင် လုပ်ပေးတယ်။ မင်းက ကမ္ဘာကြီးက ပျော်စရာတွေ ပြည့်နေတဲ့နေရာလို့ မြင်တယ်။ မင်းက အမှားတွေ ဖြစ်နေတဲ့အချိန်မှာတောင် ကြိုးစားပြီး ပြုံးပြုံးနေတတ်တယ်။ ဘဝကြီးက တိုလွန်းပြီး ပျော်ပျော်နေသေချင်တယ်ဆိုတာကို မင်းဘေးနားက လူတွေက မင်းကို ကြည့်ရင် အမြဲတမ်း အမှတ်ရနေတယ်။";
    } else if (countGha == 6) {
        personality = "မင်းက စိတ်သဘောထားကောင်းပြီး အမြဲ စိတ်ကူးယဉ်ဆန်တယ်။ မင်းက အခြားလူတွေကို နက်နက်နဲနဲ ဂရုစိုက်တတ်တယ်။ မင်းက စိတ်သဘောထားကောင်းတာက အားအင်တစ်ခုလို့ ယုံကြည်တယ်။ ဒါကြောင့် မင်းရဲ့ မသိစိတ်က လူတစ်ယောက်ကို အပေါ်ယံကြည့်လိုက်တာနဲ့ သူတို့ဘာတွေ ခံစားနေရလဲဆိုတာကို နားလည်တတ်တယ်။ မင်းက တစ်ယောက်ယောက် စိတ်ညစ်နေရင် အရင်ဆုံးသိတတ်ပြီး တိတ်ဆိတ်ခြင်းဖြင့် သော်လည်းကောင်း အရင်ဆုံး ကူညီတတ်တယ်။";
    } else if (maxPair === sumKaKha) {
        personality = "မင်းက ဘာတွေဘယ်လောက် ခက်ခဲနေပါစေ ဘယ်တော့မှ အရှုံးမပေးတတ်ဘူး။ မင်းက အားကိုးရတယ်၊ မားမားမတ်မတ် ရပ်တည်နိုင်တယ်။ မင်းက ဇွဲက ပါရမီထက်ပိုစွမ်းတယ်ဆိုတာကို ကောင်းကောင်းနားလည်ပြီး အမြဲတမ်း ကိုယ့်ကိုယ်ကို ထူးချွန်အောင် အားသွန်ခွန်စိုက် ကြိုးစားနေတယ်။ မင်းရဲ့ စွမ်းရည်က ဇွဲကောင်းလို့ ရတယ်ဆိုတာကို အခြားလူတွေက နားလည်မှုလွဲနေတတ်တယ်။ မင်းက အခြားလူတွေအတွက် မှီခိုရာနေရာတစ်နေရာ ဖြစ်တယ်။";
    } else if (maxPair === sumKaGa) {
        personality = "မင်းက ပေါင်းရ သင်းရတာကောင်းတယ်၊ အဖွဲ့လိုက် ဆောင်ရွက်တတ်တယ်။ မင်းက ငြိမ်းချမ်းမှုနှင့် မလိုအပ်တဲ့ သဘောထားကွဲလွဲမှုကို ရှောင်တတ်တယ်။ မင်းက အခြားလူတွေ မင်းကို စိတ်ဝင်စားလာအောင် မလုပ်တတ်ဘူး။ ဒါပေမယ့် မင်းရဲ့ နွေးထွေးမှုနှင့် အားထားစရာကောင်းမှုကြောင့် လူတွေက မင်းကို လွယ်လွယ်နဲ့ ယုံကြည်ကြတယ်။ မင်းက အပျော်၊ ကြင်နာမှုနှင့် စိတ်ချမ်းသာမှုကို ရှာရင်း ဘဝကို ရိုးရိုးရှင်းရှင်း အသက်ရှင်တယ်။";
    } else if (maxPair === sumKaGha) {
        personality = "မင်းက ဂရုစိုက်တတ်တယ်၊ သတိထားတတ်တယ်၊ သိမ်မွေ့တယ်။ မင်းက တစ်ခုခုကို ဖွင့်ပြောဖို့ အချိန်ယူတတ်တယ်၊ ဒါပေမယ့် ဖွင့်ပြောပြီးရင် သစ္စာရှိပြီး ဟန်မဆောင်တတ်ဘူး။ မင်းက ဆူညံတဲ့ အဖွဲ့တွေထက် အေးချမ်းတဲ့ အဖွဲ့ကို ပိုကြိုက်တယ်။ မင်းက အသေးစိတ်က အစ ဂရုစိုက်တတ်ပြီး အခြားလူတွေရဲ့ အတွင်းစိတ်ကို အပေါ်ယံကြည့်ရုံနဲ့ နားလည်တတ်တယ်။ မင်းကိုယ်ကို မင်းသံသယဖြစ်နေရင်တောင် မင်းရဲ့ စိတ်သဘောထားကောင်းမှုက ထင်ပေါ်နေတတ်တယ်။";
    } else if (maxPair === sumKhaGa) {
        personality = "မင်းက ယုံကြည်မှုရှိတယ်၊ ရယ်စရာပြောတတ်တယ်၊ အနည်းငယ် ခန့်မှန်းရခက်တယ်။ မင်းက ကြိုးစားစရာမလိုဘဲ သာမန်လို ထင်ပေါ်နေတတ်တယ်။ မင်းရဲ့ ဩဇာကြောင့် လူတွေက မင်းကို ခင်ချင်ကြတယ်။ မင်းရဲ့ ဉာဏ်ရည်ရွှင်ပျမှုကြောင့် လူတိုင်းကို ပျော်စေတယ်။ အခြားလူတွေ မပြောရဲရင်တောင် မင်းက မင်းပြောချင်တဲ့အရာကို ပြောရဲတယ်။";
    } else if (maxPair === sumKhaGha) {
        personality = "မင်းက တစ်ခုခုကို မလုပ်ခင်မှာ သေချာစဉ်းစားတတ်တယ်။ မင်းက တစ်ယောက်တည်းနေရတဲ့ အဓိပ္ပာယ်ကို တန်ဖိုးထားပြီး အခြားလူတွေ မသိနိုင်တဲ့ အရာတွေကို သိတတ်တယ်။ မင်းက တိတ်ဆိတ်နေရတဲ့အချိန်ကို ပိုသဘောကျပြီး မင်းရဲ့ စိတ်ကူးယဉ်ဆန်မှုက အရမ်းများတယ်။ မင်းက စကားအရမ်းမပြောတတ်ဘူး၊ ဒါပေမယ့် ပြောရင် လေးနက်တဲ့ စကားတွေ ပြောတတ်တယ်။";
    } else if (maxPair === sumGaGha) {
        personality = "မင်းက တစ်ခုခုကို မလုပ်ခင်မှာ သေချာစဉ်းစားတတ်တယ်။ အေးချမ်းသိမ်မွေ့သူဆိုတာ အကြီးအကျယ် တုန်လှုပ်တာမရှိဘဲ စိတ်သွက်သွက်လပ်လပ်နဲ့ လူတွေနဲ့ သက်တောင့်သက်သာနေရသူ ဖြစ်ပါတယ်။ သူ့မှာ သဘောထားပြေပြစ်ပြီး တခြားသူတွေအပေါ် သနားမြတ်နိုးမှုရှိတယ်။ မကြာခဏ စိတ်မညစ်ဘဲ ပြဿနာတစ်ခုခုကို အေးအေးချမ်းချမ်း ဖြေရှင်းနိုင်တဲ့သူပါ။";
    }
    

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = personality;
}

