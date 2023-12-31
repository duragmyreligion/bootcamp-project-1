const start_btn = document.querySelector(".start-btn button");
const main_page = document.querySelector(".main-page");
const quiz_page = document.querySelector(".quiz-page");
const result_page = document.querySelector(".result-page");
const options = document.querySelector(".options");
const timeLeft = document.querySelector(".timer .time-left");
const countdown = document.querySelector(".timer .countdown");

start_btn.addEventListener('click', (event) => {
    event.preventDefault();

    main_page.style.display = "none";
    quiz_page.style.display = "block";
    showQuestions(0);
});

let index = 0;
let timeValue = 60;
let GeneralCompanyInductionuserScore = 0;
let counter;
let counterLine;

function showQuestions(index) {
    const que_text = document.querySelector(".question-txt");

    let que_tag = '<span>'+ questions[index].question +'</span>';
    let choice_tag = '<div class="choice"><button>'+ questions[index].choices[0] +'</button></div>'
    + '<div class="choice"><button>'+ questions[index].choices[1] +'</button></div>'
    + '<div class="choice"><button>'+ questions[index].choices[2] +'</button></div>'
    + '<div class="choice"><button>'+ questions[index].choices[3] +'</button></div>';
    que_text.innerHTML = que_tag;
    options.innerHTML = choice_tag;

    const choice = options.querySelectorAll(".choice");

    for(i=0; i < choice.length; i++) {
        choice[i].setAttribute("onclick", "choiceSelected(this, " + index + ")");
    }
}

function choiceSelected(answer, index) {
    let userAns = answer.textContent;
    let correctAns = questions[index].answer;
    const allOptions = options.children.length;

    if(userAns == correctAns) {
        GeneralCompanyInductionuserScore += 10;
        answer.classList.add("correct");
        console.log("Correct Answer");
    
        
    } else {
        answer.classList.add("incorrect");
        console.log("Wrong Answer");
        
        timeValue -= 10;

    if  (timeValue < 0) {
        timeValue = 0;
    }

    }

        for(i=0; i < allOptions; i++) {
            if(options.children[i].textContent == correctAns) {
                options.children[i].setAttribute("class", "choice correct");

            }
        }
    
    index++;
    
    if (index < questions.length) {
        setTimeout(function() {
            showQuestions(index);
        }, 1000);
    } else {
        setTimeout(function() {
            showResults();
            clearInterval(counter);
        }, 1000);
    }
    for(let i = 0; i < allOptions; i++) {
        options.children[i].classList.add("disabled");
        options.children[i].setAttribute("onclick", "");

    }

}

function showResults() {
    quiz_page.style.display = "none";
    result_page.style.display = "block";

    const scoreText = document.querySelector(".result-page .final-score");
    scoreText.textContent = "Your score: " + GeneralCompanyInductionuserScore +"%";
    if (userscore=100){
        localStorage.setItem("GeneralCompanyInductionuserscore" ,GeneralCompanyInductionuserScore);
    }

}

document.addEventListener("DOMContentLoaded", function() {
    const submitBtn = document.getElementById("submit-btn");

    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();

    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    highscores.push(score);

    localStorage.setItem("highscores", JSON.stringify(highscores));

    const url = "./highscores.html";
    window.location.href = url;

    });

});