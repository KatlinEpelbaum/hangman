const guessedWordDiv = document.getElementById('word');
const scoreSpan = document.getElementById('score');
const alphabetDiv = document.getElementById('alphabet');
const message = document.getElementById('message');
const newGameBtn = document.getElementById('try-again');

const alphabet = 'abcdefghijklmnopqrsšzžtuvwõäöüxy';
let guessedLetters = '';

let word = 'Meow';
let guessedWord = '';

for (let letter of word) {
    if (letter.toUpperCase() !== letter.toLowerCase()) {
        guessedWord += '_';
    } else {
        guessedWord += letter;
    }
}

guessedWordDiv.innerText = guessedWord;

let score = 10;
scoreSpan.innerText = score;

let gameOver = false; 

for (let letter of alphabet) {
    let letterSpan = document.createElement('span');
    letterSpan.id = letter;
    letterSpan.innerText = letter.toUpperCase();

    letterSpan.addEventListener('click', e => {
        
        if (gameOver) return;

        if (!guessedLetters.includes(letterSpan.innerText)) {
            guessedLetters += letterSpan.innerText;

            if (word.toLowerCase().includes(letterSpan.innerText.toLowerCase())) {
                letterSpan.classList.add('correct');
                message.innerText = `${letterSpan.innerText} is in the word`;

                let updatedGuessedWord = '';

                for (let i = 0; i < word.length; i++) {
                    if (word[i].toLowerCase() === letterSpan.innerText.toLowerCase()) {
                        updatedGuessedWord += word[i];
                    } else if (guessedLetters.includes(word[i].toLowerCase()) || word[i] === guessedWord[i]) {
                        updatedGuessedWord += word[i];
                    } else {
                        updatedGuessedWord += '_';
                    }
                }

                guessedWord = updatedGuessedWord;
                guessedWordDiv.innerText = guessedWord;

                if (!guessedWord.includes('_')) {
                    message.innerText = "Congratulations! You've guessed the word!";
                    gameOver = true; 
                }
            } else {
                message.innerText = `${letterSpan.innerText} is not in the word`;
                letterSpan.classList.add('uncorrect');

                score -= 1;
                scoreSpan.innerText = score;

                if (score <= 0) {
                    message.innerText = "Game over! You've run out of lives! The word was: "+ word;
                    gameOver = true; 
                }
            }
        } else {
            message.innerText = `You already guessed ${letterSpan.innerText}!`;
        }
    });

    alphabetDiv.appendChild(letterSpan);
}

function disableAllLetters() {
    const letterSpans = alphabetDiv.querySelectorAll('span');
    letterSpans.forEach(letterSpan => {
        letterSpan.removeEventListener('click', letterSpan._handler); 
        letterSpan.style.pointerEvents = 'none'; 
    });
}

if (gameOver) {
    disableAllLetters();
}
