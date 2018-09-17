$(document).ready(function() {
// create question bank with question, answer values, correct answer, and 2 hints

const questionBank = [
    {
        question: "What country flies the world's only national flag that consists solely of four horizontal color bands?",
        values: [
            "Mauritius", "France", "Brunei", "Burma"
        ],
        correctAnswer: "Mauritius",
    }, {
        question: "What country has a unique biota with about 90% of its plants and animals found nowhere else on earth?",
        values: [
            "Brazil", "Japan", "Madagascar", "Australia"
        ],
        correctAnswer: "Madagascar",
    }, {
        question: "The four countries that make up the Horn of Africa in eastern Africa are Somalia, Ethiopia, Eritrea, and ____________.",
        values: [
            "Uganda", "Zambia", "Sudan", "Djibouti"
        ],
        correctAnswer: "Djibouti",
    }, {
        question: "In what country does the Amazon River originate?",
        values: [
            "Brazil", "Peru", "Colombia", "Bolivia"
        ],
        correctAnswer: "Peru",
    }, {
        question: "How many countries are in the Arabian Peninsula?",
        values: [
            "5", "7", "9", "11"
        ],
        correctAnswer: "9",
    }, {
        question: "What country, with 37 languages recorded in its 2009 constitution, has the record for the most official languages?",
        values: [
            "Bolivia", "India", "China", "South Africa"
        ],
        correctAnswer: "Bolivia",
    }, {
        question: "What is the tallest waterfall in the world?",
        values: [
            "Niagara Falls", "Angel Falls", "Yosemite Falls", "Ramnefjellfossen"
        ],
        correctAnswer: "Angel Falls",
    }, {
        question: "If it is 3 PM in Washington DC, what time is it in Tokyo, Japan?",
        values: [
            "3 AM", "4 AM", "5 AM", "6 AM"
        ],
        correctAnswer: "4 AM",
    }, {
        question: "What is the name of the world's saltiest sea?",
        values: [
            "Red Sea", "Black Sea", "Adriatic Sea", "Mediterranean Sea"
        ],
        correctAnswer: "Red Sea",
    }, {
        question: "What country is the smallest country in Asia?",
        values: [
            "Lebanon", "Nepal", "South Korea", "Sri Lanka"
        ],
        correctAnswer: "Lebanon",
    }, {
        question: "What country has the highest life expectancy at birth?",
        values: [
            "United States", "Switzerland", "Singapore", "Japan"
        ],
        correctAnswer: "Japan",
    }, {
        question: "How many countries have coastline on the Mediterranean Sea?",
        values: [
            "17", "21", "24", "29"
        ],
        correctAnswer: "21",
    },
]

// setup game variables
let correct = 0;
let incorrect = 0;
let unanswered = 0;
let timer = 0;
let timerInterval;
let timePerQuestion = 5;

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
};

function startTimer() {
    timer = questionBank.length * timePerQuestion;
    clearInterval(timerInterval);
    timerInterval = setInterval(decrement, 1000);
};

function decrement() {
    // decrease timer by 1
    timer--;
    // display timer value
    gameTimer.text(`Timer: ${timer} seconds`);

    // when time hits 10
    if (timer === 10) {
        gameMsg.text("Hurry up!!");
    }
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

        // if the answer selected equals the correct answer, tally a correct score
        if (answer == questionBank[countQ].correctAnswer) {
            correct++;

        // if the answer is undefined, tally an unanswered question
        } else if (answer == undefined) {
            unanswered++;
        }

        // otherwise, tally an incorrect score
        else {
            incorrect++;
        }

        // increment the index value of the questionBank array
        countQ++;        
    };
    // run function to show score
    showScore();
};

function showScore () {
    // clear the questions and submit button from the screen
    questionView.empty();
    submitBtn.hide();

    // show the start button to reset the game
    startBtn.show();

    // show a game message according to the percentage correct
    if (correct/questionBank.length === 1) {
        gameMsg.text("Perfect score!");
    } else if (correct/questionBank.length >= 0.8) {
        gameMsg.text("Great job!");
    } else {
        gameMsg.text("Better luck next time!");
    }
    // show score stats
    scoreView.append (
        `
            <h3>Correct: ${correct}</h3>
            <h3>Incorrect: ${incorrect}</h3>
            <h3>Unanswered: ${unanswered}</h3>
            <h4>You got ${(correct/questionBank.length*100).toFixed(0)}% right!</h4>
            <p>Visit the <a href="https://www.cia.gov/library/publications/the-world-factbook/">CIA World Factbook</a> to learn facts about 267 countries</p>
        `
    )
};
});