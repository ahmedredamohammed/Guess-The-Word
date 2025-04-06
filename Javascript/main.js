const inputs = document.querySelector("#inputs"), 
  hint = document.querySelector(".hint"), 
  counter = document.querySelector(".counter"),
  resetButton = document.querySelector("#btn"),
  input = document.querySelector(".typing"),
  winnerAnimation = document.querySelector(".winner");


// All Words 
const words = [
  {
    word: "react",
    hint: "Javascript Library"
  },
  {
    word: "vue",
    hint: "Javascript Framework"
  },
  {
    word: "angular",
    hint: "Javascript MVW Framework"
  },
  {
    word: "nodejs",
    hint: "Javascript runtime environment"
  },
  {
    word: "php",
    hint: "general-purpose scripting language"
  },
  {
    word: "ruby",
    hint: "open source programming language"
  },
  {
    word: "python",
    hint: "programming language"
  },
  {
    word: "tailwind",
    hint: "A utility-first CSS framework"
  },
  {
    word: "bootstrap",
    hint: "World's most famous free CSS framework"
  }
];
let word;
let maxGues = 12;
let countToWin = [];
// Focus input after keydown 
document.addEventListener('keydown', () => {
  input.focus();
});
// Start Game After Keydown
input.addEventListener("input", startGame);

// Get random Word
function getRandomWord() {
  let randomObj = words[Math.floor(Math.random() * words.length)];
  hint.innerText = randomObj.hint;
  word = randomObj.word;
  counter.innerText = maxGues;
  // Create Inputs
  let theInputs = "";
  for(let i = 0; i < randomObj.word.length; i++){
    theInputs += `<input type="text" disabled></input>`;
  }
  inputs.innerHTML = theInputs;
};
getRandomWord();

// Start Game
function startGame(e) { // e.target.value is the value of the input typing when user keydown a char
  let char = e.target.value;
  if(!char.match(/[a-z]/i)) {
    input.value = "";
    return;
  };
  if(word.includes(char)) {
    for(let i = 0; i < word.length; i++){
      if (word[i] === char && !inputs.querySelectorAll('input')[i].value) {
        inputs.querySelectorAll('input')[i].value = char;
        // indexes full
        countToWin.push(char);
      }
    }
  } else {
    maxGues--;
  }
  counter.innerText = maxGues;
  input.value = "";

  // Winner
  if(countToWin.length === word.length) {
    countToWin = [];
    winnerAnimation.classList.remove("hidden");
    // Audio
  }
    // Loser
  setTimeout(() => {
    if(maxGues <= 0) {
      alert("OPPS! It was easy, You need to try again");
      for(let i = 0; i < word.length; i++){
        inputs.querySelectorAll('input')[i].value = word[i];
      }
    }
  })
};
// Restart Game
resetButton.addEventListener('click', () => {
  countToWin = [];
  maxGues = 12;
  winnerAnimation.classList.add("hidden");
  getRandomWord();
});