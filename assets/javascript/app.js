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
let userInput = [];
let score = 0;
let timer = 0;
let timerInterval;

// establish references to document
let gameTimer = $("#game-timer");
let gameMsg = $("#game-msg");
let startBtn = $("#start-btn");
let questionView = $(".question-view");
let scoreView = $(".score-view");

// on click of start button, start game
startBtn.on("click", function() {
    console.log("Hi");

    // reset and start timer;
    startTimer();

    // populate userInput array with length equal to selected question array
    userInput.length = questionBank.length;
    console.log(userInput);

    // populate questions and answers on screen
    showQuestions();
});

// on click of answer choice for question
// replace null value of in userInput array with answer choice

// give hints upon request
// decrement score by quarter point each hint

// if time runs out
// tally score

// if all answers are submitted
// tally score

// tallying score function
// if userInput answer equals correct answer for that question, give point
// calculate percentage correct
// show start button

let x = 0;

console.log(questionBank[x].values[1]);
console.log(questionBank[x].values.length);
console.log(questionBank[x].correctAnswer);

function findAnswer (x) {
    for (var i = 0; i < questionBank[x].values.length; i++) {
        if (questionBank[x].values[i] === questionBank[x].correctAnswer) {
        console.log(questionBank[x].values[i]);
        }
    }
}

findAnswer(1);

function showQuestions() {

    // reset count for the index position of the questions array
    let countQ = 0;

    // for each question in the question bank
    for (let i of questionBank) {

        // set q to equal the question
        const q = questionBank[countQ].question;
        console.log(q);

        // reset count for the index position of the values array
        let countV = 0;

        // append question and answer choices to screen
        questionView.append(`<div class="question-text text-left"><strong>Question ${countQ+1}:</strong> ${q}</div>`);

        // for every value of the question
        for (let j of questionBank[countQ].values) {

            // set v equal to the value
            const v = questionBank[countQ].values[countV];
            questionView.append(
                `
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="q${countQ}-options" id="q${countQ}-v${countV}" value="${v}">
                        <label class="form-check-label" for="q${countQ}-v${countV}"> ${v}</label>
                    </div>
                `
            )
            

            // <div class="form-check form-check-inline">
            //    <input type="radio" id="q${count}-0" value=${questionBank[count].values[0]}>
            //    <label for="q${count}-0">${questionBank[count].values[0]}</label>
            countV++;
            console.log(v);
        }
        countQ++;
    }
}

function startTimer() {
    timer = 60;
    startBtn.animate({ opacity: "0"});
    clearInterval(timerInterval);
    timerInterval = setInterval(decrement, 1000);
}

function decrement() {
    // decrease timer by 1
    timer--;
    // display timer value
    gameTimer.text(`Timer: ${timer} seconds`);

    // when timer hits 0
    if (timer === 0) {
        // end the game
        tally();
    }
}

function tally() {

}

