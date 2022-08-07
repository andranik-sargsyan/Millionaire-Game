let divQuestion = document.getElementById("question");
let divAnswers = document.querySelectorAll("#answers > div");
let divRight = document.getElementById("right");

let level = 0;
let currentQuestion;

function fillQuestion() {
    let levelQuestions = questions[level];
    let index = getRandomInt(levelQuestions.length);

    //set question
    currentQuestion = levelQuestions[index];

    //set text
    divQuestion.innerText = currentQuestion.text;
    let current = divRight.querySelector(".current");

    //set level
    current && current.classList.remove("current");
    divRight.querySelectorAll("div")[14 - level].classList.add("current");
    //TODO: set question text before

    //set answers
    let answers = [...currentQuestion.answers];
    for (var i = 0; i < 4; i++) {
        index = getRandomInt(answers.length);

        divAnswers[i].innerText = answers[index];

        answers.splice(index, 1);
    }
}

fillQuestion();

for (let div of divAnswers) {
    div.addEventListener("click", e => {
        if (e.target.innerText == currentQuestion.answers[0]) {
            if (level < 14) {
                //TODO: handle | Time | Sound

                level++;
                fillQuestion();
            }
            else {
                //TODO: handle | Time | Sound
            }
        }
        else {
            //TODO: handle | Time | Sound

            level = 0;
            fillQuestion();
        }
    });
}