const guessedWordDiv = document.getElementById('word');
const scoreSpan = document.getElementById('score');
const alphabetDiv = document.getElementById('alphabet');

const alphabet = 'abcdefghijklmnopqrsšzžtuvwõäöüxy';


let score = 10;
scoreDiv.innerText = score

let word = 'I love cats <3';
let guessedWord = '';

for(let char of word){
    if( char.toUpperCase() != char.toLowerCase() ){
        guessedWord += '_'
    } else{
        guessedWord+= char;
    }
}

guessedWordDiv.innerText = guessedWord

console.log(guessedWord);