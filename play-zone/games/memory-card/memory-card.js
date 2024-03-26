const cards = document.querySelectorAll(".card");
const flipsCount = document.querySelector(".score span");
const refreshBtn = document.querySelector(".refresh");
const timeInterval = document.querySelector(".timer b");
const startBtn = document.querySelector(".start-btn");
const title = document.querySelector(".wrapper h2");
let cond;
const gameOver = function (text, color) {
  title.textContent = text;
  title.style.color = color;
};
const game = function () {
  let matched;
  let disableDeck;
  let cardOne, cardTwo;
  let flips = 0;
  let maxTime = 20; // Set the maximum time in seconds
  let timerInterval; // Variable to hold the setInterval reference

  // Function to update the timer display
  const updateTimer = function () {
    timeInterval.textContent = maxTime;
    if (maxTime === 0) {
      clearInterval(timerInterval); // Stop the timer when time runs out
      gameOver("Game Over - You Lose!", "red");
      cards.forEach((card) => card.removeEventListener("click", flipCard));
    }
  };
  // Function to decrement the timer every second
  const startTimer = function (cond) {
    if (cond) {
      timerInterval = setInterval(() => {
        if (maxTime > 0) {
          maxTime--;
          updateTimer(); // Update the timer display
        }
      }, 1000);
    } else {
      clearInterval(timerInterval); // Clear the timerInterval variable
    }
  };

  const flipCard = function ({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
      clickedCard.classList.add("flip");
      flips++;
      if (flips === 1) {
        cond = true;
        startTimer(cond); // Start the timer when the first card is flipped
      }
      flipsCount.textContent = flips;
      if (!cardOne) {
        return (cardOne = clickedCard);
      }

      cardTwo = clickedCard;
      disableDeck = true;
      let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
      matchCards(cardOneImg, cardTwoImg);
    }
  };

  const matchCards = function (img1, img2) {
    if (img1 === img2) {
      matched++;
      if (matched === 6) {
        cond = false;
        startTimer(cond); // Stop the timer when all cards are matched
        gameOver("Congratulations! You Win!", "green");
        cards.forEach((card) => card.removeEventListener("click", flipCard));
      }
      cardOne.removeEventListener("click", flipCard);
      cardTwo.removeEventListener("click", flipCard);
      cardOne = cardTwo = "";
      return (disableDeck = false);
    }
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
      cardOne.classList.remove("flip", "shake");
      cardTwo.classList.remove("flip", "shake");
      cardOne = cardTwo = "";
      disableDeck = false;
    }, 1200);
  };

  const shuffleCard = function () {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
    cards.forEach((card, index) => {
      card.classList.remove("flip");
      let imgTag = card.querySelector(".back-view img");
      imgTag.src = `./icons/img-${arr[index]}.png`;
      card.addEventListener("click", flipCard);
    });
  };

  refreshBtn.onclick = () => {
    window.location.reload();
  };

  startBtn.addEventListener("click", function () {
    startBtn.style.display = "none";
    shuffleCard();
    // Start the timer when the game starts
  });
};

game();
