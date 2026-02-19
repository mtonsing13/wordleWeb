import './style.css'
import { words } from './wordlist.js';
import { pickWord } from './wordlefunctions.js';
import validWordsText from './wordle-allowed-guesses.txt?raw';
//import javascriptLogo from './javascript.svg'
//import viteLogo from '/vite.svg'
//import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <h1>Wordle Practice</h1>
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

//will choose word
const chosenWord = pickWord(words);
console.log(chosenWord);

//changes wordle-allowed-guesses into list 
const VALID_GUESSES = validWordsText
  .split('\n')
  .map(word => word.trim().toLowerCase())
  .filter(word => word.length === 5);


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
        word += input.value;
      });
      if (word.length!=5){
        console.log("To short")
        return
      }
      if (!VALID_GUESSES.includes(word)) {
        console.log("word does not exist");
        return;
      }
      console.log(word)
      if (word===chosenWord){
        console.log("You won")
      }
      else{
        setRowEnabled(activeRow, false)
        activeRow +=1
        if (activeRow>=rows.length){
          console.log("Game Over")
        }
        setRowEnabled(activeRow, true)

      }
        // Prevent the default form submission behavior (if the input is in a form)
        //event.preventDefault();
        
        // Print to the console
        console.log("Enter key was pressed!");
        
        // Optionally, log the value of the input field
        console.log("Input value:", event.target.value);
    }
});

