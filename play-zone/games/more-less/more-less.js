const result = document.querySelector(".result");
const buttonPlay = document.querySelector(".play");
buttonPlay.disabled = true;
const buttonsDifficulty = document.querySelectorAll(".btn");
const numberArray = document.querySelector(".info b span");
const attemps = document.querySelector(".attemps b");
const hint = document.querySelector(".container-result h3");
const alertContainer = document.querySelector(".alert-container");
const inputNumber = document.getElementById("input");
inputNumber.disabled = true;
inputNumber.style.cursor = "default";
const min = 1;
let max;
let attempsValue;
let secretNumber;

const gamePlay = function () {
  const guess = Number(inputNumber.value);
  if (guess > max || guess < min) {
    showAlert("Invalid number!");
    return;
  }
  if (guess !== secretNumber) {
    if (attempsValue > 1) {
      displayMessage(guess > secretNumber ? "Too high!" : "Too low!");
      attempsValue--;
      displayAttemps(attempsValue);
    } else {
      displayMessage("You lost the game!");
      displayAttemps("💀");
      showAlert("Try new game!");
    }
  } else {
    displayMessage("Correct Number!");
    result.textContent = secretNumber;
  }
};

buttonsDifficulty.forEach((button) => {
  button.addEventListener("click", (e) => {
    buttonPlay.disabled = false;
    inputNumber.disabled = false;
    inputNumber.style.cursor = "pointer";
    result.textContent = "?";
    inputNumber.value = "";
    hint.textContent = "Start guessing...";
    button.classList.add("active");
    buttonsDifficulty.forEach((button2) => {
      if (button !== button2) {
        button2.classList.remove("active");
      }
    });
    switch (e.target.textContent) {
      case "Easy":
        attempsValue = 5;
        max = 20;
        numberArray.textContent = String(max);
        attemps.textContent = String(attempsValue);
        break;
      case "Medium":
        attempsValue = 9;
        max = 50;
        numberArray.textContent = String(max);
        attemps.textContent = String(attempsValue);
        break;
      case "Hard":
        attempsValue = 13;
        max = 100;
        numberArray.textContent = String(max);
        attemps.textContent = String(attempsValue);
        break;
      default:
        break;
    }
    inputNumber.focus();
    secretNumber = Math.floor(Math.random() * max) + min;
  });
});
buttonPlay.addEventListener("click", gamePlay);

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
const displayMessage = function (message) {
  hint.textContent = message;
};
const displayAttemps = function (message) {
  attemps.textContent = message;
};
