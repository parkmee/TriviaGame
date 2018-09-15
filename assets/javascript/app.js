const questions = [
    {
        question: "What country flies the world's only national flag that consists solely of four horizontal color bands?",
        values: [
            "Mauritius", "France", "Brunei", "Burma"
        ],
        correctAnswer: "Mauritius"
    }, {

    },
]
var x = 0;

console.log(questions[x].values[1]);
console.log(questions[x].values.length);
console.log(questions[x].correctAnswer);

function findAnswer (x) {
    for (var i = 0; i < questions[x].values.length; i++) {
        if (questions[x].values[i] === questions[x].correctAnswer) {
        console.log(questions[x].values[i]);
        }
    }
}

findAnswer(0);