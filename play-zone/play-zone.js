const moduleWindow = document.querySelector(".module");
const overlay = document.querySelector(".overlay");
const gameContainers = document.querySelectorAll(".info");
const closeModule = moduleWindow.querySelector(".close-module");

//Open Module
const openModuleFunction = function () {
  document.body.style.overflow = "hidden";
  const gameName = this.querySelector(".name").innerText;
  const gameInfo = this.querySelector(".name").getAttribute("data-info");
  const gameGifName = this.querySelector(".name").getAttribute("data-gif-name");

  const gameGif = moduleWindow.querySelector(".gif");
  const gameNameElement = moduleWindow.querySelector(".info-game-name");
  const gameInfoElement = moduleWindow.querySelector(".info-game");

  gameGif.src = "";
  gameGif.src = `./gifs/${gameGifName}.gif`;
  gameGif.currentTime = 0;

  gameNameElement.innerText = gameName;
  gameInfoElement.innerText = gameInfo;

  moduleWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

gameContainers.forEach((container) => {
  container.addEventListener("click", function (event) {
    const target = event.target;
    const nameElement = target.closest(".name");
    const containerImgElement = target.closest(".container-img");

    if (nameElement) {
      openModuleFunction.call(nameElement.closest(".info"));
    } else if (containerImgElement) {
      openModuleFunction.call(containerImgElement.closest(".info"));
    }
  });
});

//Close Module
const closeModuleFunction = function () {
  document.body.style.overflow = "";
  moduleWindow.classList.add("hidden");
  overlay.classList.add("hidden");
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Enter") {
    if (!moduleWindow.classList.contains("hidden")) {
      closeModuleFunction();
    }
  }
});
overlay.addEventListener("click", closeModuleFunction);
closeModule.addEventListener("click", closeModuleFunction);
