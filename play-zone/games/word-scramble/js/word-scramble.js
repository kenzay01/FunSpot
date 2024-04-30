"use strict";

const wordText = document.querySelector(".word");
const wordHint = document.querySelector(".hint-text");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const inputWord = document.querySelector("input");
const hint = document.querySelector(".hint");
const time = document.querySelector(".time");
const timeInterval = document.querySelector(".time b");
const cw = document.querySelector(".corOrWrng");
const alertContainer = document.querySelector(".alert-container");
let correctWord, timer;
let cond = true;
checkBtn.disabled = true;

//Timer
const initTimer = (maxTime, cond) => {
  clearInterval(timer);
  if (cond) {
    timer = setInterval(() => {
      if (maxTime > 0) {
        maxTime--;
        return (timeInterval.textContent = maxTime);
      }
      clearInterval(timer);
      correctOrWrong("Time's up!", "red");
      wordText.innerHTML = `<br>Correct word: <b>${correctWord}</b>`;
      checkBtn.style.pointerEvents = "none";
      inputWord.style.pointerEvents = "none";
    }, 1000);
  } else {
    clearInterval(timer);
    timer = null;
  }
};

//Game
const initGame = () => {
  inputWord.focus();
  cond = true;
  initTimer(30, cond);
  wordText.style.display = "block";
  cw.style.display = "none";
  wordText.style.color = "#1a2c5b";
  wordText.style.letterSpacing = "24px";
  wordText.style.fontSize = "35px";
  wordText.style.marginRight = "-24px";
  refreshBtn.textContent = "Refresh Word";
  checkBtn.disabled = false;
  inputWord.style.pointerEvents = "auto";
  inputWord.placeholder = "Enter the correct word";
  hint.style.display = "block";
  time.style.display = "block";

  let randomObj = words[Math.floor(Math.random() * words.length)];
  correctWord = randomObj.word.toLowerCase();
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.textContent = wordArray.join("");
  wordHint.textContent = randomObj.hint;
  inputWord.value = "";
  inputWord.setAttribute("maxlength", correctWord.length);
};

//Checker
const correctOrWrong = (text, color) => {
  if (text === "Congratulations!") {
    cw.style.fontSize = "35px";
    wordText.style.display = "none";
  }
  cw.style.display = "block";
  wordText.style.letterSpacing = "0";
  wordText.style.marginRight = "0";
  wordText.style.fontSize = "24px";
  cw.textContent = text;
  cw.style.color = color;
};
const checkWord = () => {
  cond = false;
  let userWord = inputWord.value.toLocaleLowerCase();
  if (userWord == "" || userWord == Number(userWord)) {
    showAlert("Please enter a valid word!");
    return;
  }
  initTimer(0, cond);
  if (userWord !== correctWord) {
    correctOrWrong(`Wrong!`, "red");
    wordText.innerHTML = `<br>Correct word: <b>${correctWord}</b>`;
  } else {
    correctOrWrong("Congratulations!", "green");
  }
  checkBtn.style.pointerEvents = "none";
  inputWord.style.pointerEvents = "none";
};

function showAlert(text, duration = 750) {
  const alert = document.createElement("div");
  alert.textContent = text;
  alert.classList.add("alert");
  alertContainer.prepend(alert);
  if (duration == null) return;
  setTimeout(() => {
    alert.classList.add("hidden");
    alert.addEventListener("transitionend", () => {
      alert.remove();
    });
  }, duration);
}
hint.addEventListener("click", () => {
  wordHint.classList.toggle("blurred-text");
});

//Event Listeners
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkWord();
});
