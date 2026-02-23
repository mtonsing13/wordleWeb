import './style.css'
//import { words } from './wordlist.js';
import { pickWord } from './wordlefunctions.js';
//import validWordsText from './wordle-answers-alphabetical.txt?raw';
import validWordsText from './WORDS.txt?raw';
import AnswerText from './wordle-answers-alphabetical.txt?raw';
import confetti from "canvas-confetti";
import ScrabbleText from "./SCRABBLEWORDS.txt?raw";

document.querySelector('#app').innerHTML = `
  <h1>Wordle Practice</h1>
  <div id="message" class="message"></div>
  <div id="alphabet" class="alphabet"></div>
  <div class="letter-box-row" id="firstguess">
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
  </div>
  <div class="letter-box-row" id="secondguess">
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
  </div>
  <div class="letter-box-row" id="thirdguess">
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
  </div>
  <div class="letter-box-row" id="fourthguess">
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
  </div>
  <div class="letter-box-row" id="fifthguess">
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
  </div>
  <div class="letter-box-row" id="sixthguess">
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
    <input class="letter-input" maxlength="1" />
  </div>
`

//change AnswerText into array of words to choose for answer
const ANSWERS = AnswerText
  .split('\n')
  .map(word => word.trim().toLowerCase())
  .filter(word => word.length === 5);
//will choose word
const chosenWord = pickWord(ANSWERS);
console.log(chosenWord);

//will now set of alpha 
const alphabet = document.getElementById("alphabet");
export const alpha = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))
alpha.forEach(item => {
    const newDiv = document.createElement("div"); // Create a new div for each item
    newDiv.innerText = item; // Set the text content

    alphabet.appendChild(newDiv); // Append the new div to the container
  });

//messageview
function showMessage(text) {
  const message = document.getElementById("message");
  message.textContent = text;
  message.classList.add("show");

  setTimeout(() => {
    message.classList.remove("show");
  }, 2000); // 2 seconds
}

//confetti launch
function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 }
  });
}

//changes validWordsText into all the possible guesses
const VALID_GUESSES = ScrabbleText
  .split('\n')
  .map(word => word.trim().toLowerCase())
  .filter(word => word.length === 5);

const VALID_SET = new Set(VALID_GUESSES);


//disable all rows but first row
const rows = document.querySelectorAll('.letter-box-row');
rows.forEach((row, i) => {
  row.querySelectorAll('input').forEach(inp => {
    inp.disabled = i !== 0;   // only row 0 is enabled
  });
});

//function to endable a row
function setRowEnabled(rowIndex, enabled) {
  const row = rows[rowIndex];
  row.querySelectorAll('input').forEach(inp => {
    inp.disabled = !enabled;
  });
}

//current active row is row 0
let activeRow = 0

//set up row so the user can type in answer so they can type smoothly
function setupRow() {
  const currentRow = rows[activeRow];
  const inputs = currentRow.querySelectorAll('input');

  inputs.forEach((inp, i) => {
  inp.addEventListener('input', () => {
    inp.value = inp.value.slice(-1).toUpperCase();

    // if a character was entered, go to next box
    if (inp.value && i < inputs.length - 1) {
      inputs[i + 1].focus();
    }
  });

  inp.addEventListener('keydown', (e) => {
    // backspace: if empty, go back
    if (e.key === 'Backspace' && !inp.value && i > 0) {
      inputs[i - 1].focus();
    }
  });
});
}
setupRow()


//Every time user presses enter 
  //get word from activeRow
    //check if word equals chosenWord
      //if yes game is over
  //lock that row
  //unlock next row'

  document.addEventListener("keydown", function(event) {
    // Check if the pressed key is the 'Enter' key
    if (event.key === "Enter") {
      const currentRow = rows[activeRow];
      const inputs = currentRow.querySelectorAll('input');

      let word = '';
      inputs.forEach(input => {
        word += input.value.toLowerCase();
      });
      if (word.length!=5){
        showMessage("TO SHORT");
        console.log("TO SHORT")
        return
      }
      if (!VALID_SET.has(word)){ 
        console.log(word);
        showMessage("WORD DOES NOT EXIST");
        console.log("word does not exist");
        return;
      }
      console.log(word)
      //here we will change the input boxes
      const alphabetLetters = document.querySelectorAll("#alphabet div");
      for (let i=0; i<5;i++){
        const box = inputs[i];
        const letter = word[i].toUpperCase();
        if(chosenWord[i] == word[i]){
          //turn that box green
          box.classList.add("correct");
          //find i in alpha and turn inword
          alphabetLetters.forEach(div => {
            if (div.innerText === letter) {
              div.classList.add("present");
            }
          });
        }
        else if(chosenWord.includes(word[i])){
          //turn that box yellow
          //go to alpha turn that letter yellow
          box.classList.add("present");
          alphabetLetters.forEach(div => {
            if (div.innerText === letter) {
              div.classList.add("present");
            }
          });
        }
        else{
          //go to alpha that letter red 
          box.classList.add("incorrect");
          alphabetLetters.forEach(div => {
            if (div.innerText === letter) {
              div.classList.add("incorrect");
            }
          });
        }
      }
      //was a correct guess
      if (word===chosenWord){
        setRowEnabled(activeRow, false)
        showMessage("YOU WON");
        launchConfetti()
        console.log("You won")
      }
      //wasn't correct so go to next guess
      else{
        setRowEnabled(activeRow, false)
        activeRow +=1
        if (activeRow>=rows.length){
          showMessage("Game Over word is " + chosenWord );
          //showMessage(chosenWord);
          //console.log("Game Over")
        }

        setRowEnabled(activeRow, true)
        setupRow()
        rows[activeRow].querySelector('input').focus(); 
      }
    }
});

