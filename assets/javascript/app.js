$(document).ready(function() {
// create question bank with question, answer values, correct answer, and 2 hints

const questionBank = [
    {
        question: "What country flies the world's only national flag that consists solely of four horizontal color bands?",
        values: [
            "Mauritius", "France", "Brunei", "Burma"
        ],
        correctAnswer: "Mauritius",
        hint1: "Located in the Indian Ocean",
        hint2: "This is an island country",
    }, {
        question: "What country has a unique biota with about 90% of its plants and animals found nowhere else on earth?",
        values: [
            "Brazil", "Japan", "Madagascar", "Australia"
        ],
        correctAnswer: "Madagascar",
        hint1: "Located in the southern hemisphere",
        hint2: "This is the fourth largest island",
    }, {
        question: "Question 3",
        values: [
            "a", "b", "c", "d"
        ],
        correctAnswer: "b",
        hint1: "hint 1",
        hint2: "hint 2",
    },

]

// setup game variables
let correct = 0;
let incorrect = 0;
let unanswered = 0;
let timer = 60;
let timerInterval;

// establish references to document
let gameTimer = $("#game-timer");
let gameMsg = $("#game-msg");
let startBtn = $("#start-btn");
let questionView = $(".question-view");
let scoreView = $(".score-view");
let submitBtn = $("#submit-btn");

// on click of start button, start game
startBtn.on("click", function() {
    
    // hide start button
    startBtn.hide();

    // show submit button
    submitBtn.show();

    // reset and start timer;
    startTimer();

    // hide score from previous game
    scoreView.empty();

    // set game message
    gameMsg.text("Think fast!");

    // populate questions and answers on screen
    showQuestions();
});

// give hints upon request
// decrement score by quarter point each hint

submitBtn.on("click", function() {
    tally();
});

function showQuestions() {

    // reset count for the index position of the questions array
    let countQ = 0;

    // for each question in the question bank
    for (let i of questionBank) {

        // set q to equal the question
        const q = questionBank[countQ].question;

        // reset count for the index position of the values array
        let countV = 0;

        // append question and answer choices to screen
        questionView.append(`<div class="question-text text-left"><strong>Question ${countQ+1}:</strong> ${q}</div>`);

        // for every value of the question
        for (let j of questionBank[countQ].values) {

            // set v equal to the value
            const v = questionBank[countQ].values[countV];

            // append each value to the question
            questionView.append(
                `
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="q${countQ}-options" id="q${countQ}-v${countV}" value="${v}">
                        <label class="form-check-label" for="q${countQ}-v${countV}"> ${v}</label>
                    </div>
                `
            )      
            countV++;
        }
        countQ++;
    }
}

function startTimer() {
    timer = 60;
    clearInterval(timerInterval);
    timerInterval = setInterval(decrement, 1000);
};

function decrement() {
    // decrease timer by 1
    timer--;
    // display timer value
    gameTimer.text(`Timer: ${timer} seconds`);

    // when timer hits 0
    if (timer === 0) {
        // end the game and tally score
        tally();
    };
};

function stop() {
    clearInterval(timerInterval);
};

function tally() {
    // stop timer
    stop();

    // reset score to 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;

    // reset count for index position of questionBank array
    let countQ = 0;

    // for every question
    for (let i in questionBank) {

        // set name of input to new value
        let name = `q${countQ}-options`;

        // store answer of checked value for that question
        var answer = $("input[name="+name+"]:checked").val();
        console.log(answer);
        console.log(questionBank[countQ].correctAnswer);
        if (answer == questionBank[countQ].correctAnswer) {
            correct++;
        } else if (answer == undefined) {
            unanswered++;
        }
        else {
            incorrect++;
        }
        countQ++;        
    };
    console.log(correct, incorrect);
    showScore();
};

function showScore () {
    questionView.empty();
    submitBtn.hide();
    startBtn.show();
    if (correct/questionBank.length === 1) {
        gameMsg.text("Perfect score! You'd make an excellent spy!");
    } else if (correct/questionBank.length >= 0.8) {
        gameMsg.text("Great job!");
    } else {
        gameMsg.text("Better luck next time!");
    }
    scoreView.append (
        `
            <h3>Correct: ${correct}</h3>
            <h3>Incorrect: ${incorrect}</h3>
            <h3>Unanswered: ${unanswered}</h3>
            <h>You got ${(correct/questionBank.length*100).toFixed(0)}% right!</h4>
        `
    )

};


});