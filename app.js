const scoreSpan = document.getElementById('score');
const guessedWordDiv = document.getElementById('word');
const alphabetDiv = document.getElementById('alphabet');

let score = 10;
scoreSpan.innerText = score;

const alphabet = 'abdefghijklmnoprsšzžtuvõäöü';
let guessedLetters = [];
let guessedWord = [];
let word = '';

fetch('hangman.txt')
    .then(res => res.text())
    .then(words => {
        words = words.split(/\r?\n/);
        const i = Math.floor(Math.random() * words.length);
        word = words[i];  

        for (let char of word) {
            if (char.toUpperCase() !== char.toLowerCase()) {
                guessedWord.push('_');
            } else {
                guessedWord.push(char);
            }
        }
        guessedWordDiv.innerText = guessedWord.join('');
    });

document.addEventListener('keydown', (e) => {
    const keyName = e.key.toLowerCase();
    if (alphabet.includes(keyName)) {
        testLetter(keyName);
        updateAlphabetDisplay(keyName);  // Update letter color on key press
    }
});

for (let letter of alphabet) {
    const letterSpan = document.createElement('span');
    letterSpan.id = letter;
    letterSpan.innerText = letter.toUpperCase();

    letterSpan.addEventListener('click', () => {
        if (testLetter(letter)) {
            letterSpan.classList.add('correct');
        } else {
            letterSpan.classList.add('incorrect');
        }
        letterSpan.style.pointerEvents = 'none';
    });

    alphabetDiv.appendChild(letterSpan);
}

// Function to update the alphabet display when the user presses a key
function updateAlphabetDisplay(letter) {
    const letterSpan = document.getElementById(letter);
    if (letterSpan) {
        if (guessedLetters.includes(letter)) {
            if (word.toLowerCase().includes(letter)) {
                letterSpan.classList.add('correct');
            } else {
                letterSpan.classList.add('incorrect');
            }
            letterSpan.style.pointerEvents = 'none'; // Disable further clicks after pressing
        }
    }
}

function testLetter(letter) {
    let isCorrect = false;

    if (score && guessedWord.includes('_')) {
        if (!guessedLetters.includes(letter)) {
            guessedLetters.push(letter);

            if (word.toLowerCase().includes(letter)) {
                let i = word.toLowerCase().indexOf(letter);
                while (i !== -1) {
                    guessedWord[i] = word[i];
                    i = word.toLowerCase().indexOf(letter, i + 1);
                }

                guessedWordDiv.innerText = guessedWord.join('');
                isCorrect = true;
            } else {
                score--;
                scoreSpan.innerText = score;
                isCorrect = false;
            }
        }

        if (score === 0) {
            console.log('Kaotasid, õige sõna:', word);
        } else if (!guessedWord.includes('_')) {
            console.log('Võitsid mängu!');
        }
    }
    return isCorrect;
}
