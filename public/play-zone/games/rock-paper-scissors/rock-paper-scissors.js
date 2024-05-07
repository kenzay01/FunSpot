const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user-result img");
const botResult = document.querySelector(".bot-result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option-image");

optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    result.style.color = "#eeeeee";
    image.classList.add("active");
    userResult.src = botResult.src = "./icons-for-rps/rock.png";
    result.textContent = "Wait...";
    optionImages.forEach((image2, index2) => {
      if (index !== index2) {
        image2.classList.remove("active");
      }
    });
    gameContainer.classList.add("start");
    let time = setTimeout(() => {
      gameContainer.classList.remove("start");
      let imageSrc = e.target.querySelector("img").src;
      userResult.src = imageSrc;
      let randomNumber = Math.floor(Math.random() * 3);
      let botImages = [
        "./icons-for-rps/rock.png",
        "./icons-for-rps/paper.png",
        "./icons-for-rps/scissors.png",
      ];
      botResult.src = botImages[randomNumber];
      let cpuValues = ["R", "P", "S"][randomNumber];
      let userValues = ["R", "P", "S"][index];
      let outcomes = {
        RR: "It's a tie",
        PP: "It's a tie",
        SS: "It's a tie",
        RP: "You lose",
        RS: "You win",
        PR: "You win",
        PS: "You lose",
        SR: "You lose",
        SP: "You win",
      };
      let outComeValue = outcomes[userValues + cpuValues];
      outComeValue === "You win"
        ? (result.style.color = "rgb(26, 177, 26)")
        : outComeValue === "You lose"
        ? (result.style.color = "rgb(191, 22, 22)")
        : (result.style.color = "#eeeeee");

      result.textContent = outComeValue;
    }, 1450);
  });
});
