const keyboard = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const wordHint = document.querySelector(".hint-text b");
const conHint = document.querySelector(".hint-text");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const overlay = document.querySelector(".overlay");
const modalText = document.querySelector(".game-modal p");
const playAgainBtn = document.querySelector(".play-again");
let currentWord,
  wrongGuesses = 0;
const maxGuesses = 6;
let correctLetters = [];
const getRandomWord = function () {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  wordHint.innerHTML = hint;
  wordDisplay.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
};
document.addEventListener("click", handleMouseClick);

function handleMouseClick(e) {
  if (e.target.matches("[data-key]")) {
    pressKey(e.target.dataset.key);
    return;
  }
}
function pressKey(key) {
  const keyBtn = document.querySelector(`[data-key="${key}"]`);
  if (currentWord.includes(key.toLowerCase())) {
    [...currentWord].forEach((letter, index) => {
      if (letter === key.toLowerCase()) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerHTML = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        keyBtn.classList.add("correct-guesses");
      }
    });
  } else {
    wrongGuesses++;
    keyBtn.classList.add("wrong-guesses");
    hangmanImage.src = `./images/hangman-${wrongGuesses}.svg`;
  }
  keyBtn.disabled = true;
  keyBtn.style.pointerEvents = "none";
  guessesText.innerHTML = `${wrongGuesses}/${maxGuesses}`;
  if (wrongGuesses === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
}

const gameOver = function (win) {
  setTimeout(() => {
    const modalText = win ? `You found the word:` : `The correct word was:`;
    gameModal.querySelector("h4").textContent = `${
      win ? "Congratulations!" : "Game Over!"
    }`;
    gameModal.querySelector("img").src = `images/${
      win ? "victory" : "lost"
    }.gif`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
    overlay.classList.add("show");
  }, 300);
};
conHint.addEventListener("click", () => {
  wordHint.classList.toggle("blurred-text");
});
getRandomWord();
playAgainBtn.addEventListener("click", () => {
  window.location.reload();
});
