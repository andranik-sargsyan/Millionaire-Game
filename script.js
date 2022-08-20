let divHelps = document.querySelectorAll("#help > div");
let divQuestion = document.getElementById("question");
let divAnswers = document.querySelectorAll("#answers > div");
let divRight = document.getElementById("right");

let level = 0;
let currentQuestion;
let isFiftyUsed = false;

let helps = {
    "audience": () => {
        let correctPercent = getRandomInt(84 - 6 * level, 100 - 6 * level + 1);

        let correctAnwerDiv = document.querySelector(`#answers > div[data-answer='${currentQuestion.answers[0]}']`);
        correctAnwerDiv.innerText += ` (${correctPercent}%)`;

        let rem = 100 - correctPercent;
        for (let i = 0; i < 4; i++) {
            if (divAnswers[i] == correctAnwerDiv || divAnswers[i].style.visibility == "hidden") {
                continue;
            }

            if (isFiftyUsed) {
                divAnswers[i].innerText += ` (${rem}%)`;
            }
            else {
                let percent = getRandomInt(rem + 1);

                divAnswers[i].innerText += ` (${percent}%)`;

                rem -= percent;
            }
        }
    },
    "fifty": () => {
        let wrongAnswers = currentQuestion.answers.slice(1);

        while (wrongAnswers.length > 1) {
            let index = getRandomInt(wrongAnswers.length);

            let wrongAnswer = wrongAnswers.splice(index, 1)[0];
            for (let div of divAnswers) {
                if (div.getAttribute("data-answer") == wrongAnswer) {
                    div.style.visibility = "hidden";
                    break;
                }
            }
        }

        isFiftyUsed = true;
    },
    "call": () => {
        let isCorrect = isProbable(100 - 4 * level);

        let correctDiv = document.querySelector(`#answers > div[data-answer='${currentQuestion.answers[0]}']`);
        let currentDiv = correctDiv;

        if (!isCorrect) {
            do {
                let index = getRandomInt(4);
                currentDiv = divAnswers[index];
            } while (currentDiv == correctDiv || currentDiv.style.visibility == "hidden");
        }

        currentDiv.innerText += " (📞)";
    },
    "change": () => {
        fillQuestion(currentQuestion.text);
    }
};

function fillQuestion(currentText) {
    let levelQuestions = questions[level];
    isFiftyUsed = false;

    //set question
    let index = getRandomInt(levelQuestions.length);
    currentQuestion = levelQuestions[index];

    while (currentText && currentQuestion.text == currentText) {
        index = getRandomInt(levelQuestions.length);
        currentQuestion = levelQuestions[index];
    }

    //set text
    divQuestion.innerHTML = `<span class='question-level'>${level + 1}.</span> ${currentQuestion.text}`;

    //set level
    let current = divRight.querySelector(".current");
    current && current.classList.remove("current");
    divRight.querySelectorAll("div")[14 - level].classList.add("current");

    //set answers
    let answers = [...currentQuestion.answers];
    for (let i = 0; i < 4; i++) {
        index = getRandomInt(answers.length);

        divAnswers[i].style.visibility = "visible";
        divAnswers[i].innerText = answers[index];
        divAnswers[i].setAttribute("data-answer", answers[index]);

        answers.splice(index, 1);
    }
}

function reset() {
    for (let div of divHelps) {
        div.classList.remove("used");
    }

    level = 0;

    fillQuestion();
}

function playSound(source) {
    let element = document.getElementById(`sound-${source}`);
    element.pause();
    element.currentTime = 0;
    element.play();
}

fillQuestion();

//help click
for (let div of divHelps) {
    div.addEventListener("click", e => {
        if (e.target.classList.contains("used")) {
            return;
        }

        e.target.classList.add("used");

        let type = e.target.getAttribute("data-type");

        helps[type]();
    });
}

//answer click
for (let div of divAnswers) {
    div.addEventListener("click", e => {
        if (e.target.getAttribute("data-answer") == currentQuestion.answers[0]) {
            if (level < 14) {
                playSound("correct-answer");

                level++;
                fillQuestion();

                if (level % 5 == 0) {
                    setTimeout(() => playSound("new-game"), 1500);
                }
            }
            else {
                playSound("new-game");

                reset();
            }
        }
        else {
            playSound("wrong-answer");

            reset();
        }
    });
}

//window.addEventListener("load", () => {
//    playSound("intro");
//});
