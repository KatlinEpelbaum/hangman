const guessedWordDiv = document.getElementById('word');
const scoreSpan = document.getElementById('score');
const alphabetDiv = document.getElementById('alphabet');

const alphabet = 'abcdefghijklmnopqrsšzžtuvwõäöüxy';
for (letter of alphabet) {
    let letterSpan = document.createElement('span');
    letterSpan.id = letter;
    letterSpan.innerText = letter.toUpperCase();

    alphabetDiv.appendChild(letterSpan);
}

let score = 10;
scoreSpan.innerText = score;

let word = 'I love cats <3';
let guessedWord = '';

for (let char of word) {
    if (char.toUpperCase() !== char.toLowerCase()) {
        guessedWord += '_';
    } else {
        guessedWord += char;
    }
}

guessedWordDiv.innerText = guessedWord;

console.log(guessedWord);
