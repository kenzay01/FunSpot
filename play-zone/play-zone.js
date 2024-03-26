const moduleWindow = document.querySelector(".module");
const overlay = document.querySelector(".module-shadow");
const gameWindow = document.querySelectorAll(
  ".info .name, .info .container-img"
);
const closeModule = moduleWindow.querySelector(".close-module");

const openModuleFunction = function () {
  moduleWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModuleFunction = function () {
  moduleWindow.classList.add("hidden");
  overlay.classList.add("hidden");
};

gameWindow.forEach((el) => {
  console.log(el);
  el.addEventListener("click", openModuleFunction);
});

closeModule.addEventListener("click", closeModuleFunction);
