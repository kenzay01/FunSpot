const selectBox = document.querySelector(".select-box"),
  selectXBtn = selectBox.querySelector(".playerX"),
  selectOBtn = selectBox.querySelector(".playerO"),
  playBoard = document.querySelector(".player-board"),
  allBox = document.querySelectorAll("section span"),
  players = document.querySelector(".players"),
  resultBox = document.querySelector(".result-box"),
  wonText = resultBox.querySelector(".won-text"),
  replayBtn = resultBox.querySelector("button");

window.onload = () => {
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }
  selectXBtn.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
  };
  selectOBtn.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
  };
};
let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;
let result = true;
// user click function
function clickedBox(element) {
  if (players.classList.contains("player")) {
    playerSign = "O";
    element.setAttribute("id", playerSign);
    element.innerHTML = `<i class="${playerOIcon}"></i>`;
    players.classList.remove("active");
  } else {
    element.innerHTML = `<i class="${playerXIcon}"></i>`;
    players.classList.add("active");
    element.setAttribute("id", playerSign);
  }
  selectWinner();
  playBoard.style.pointerEvents = "none";
  element.style.pointerEvents = "none";
  let randomDelayTime = (Math.random() * 1000 + 200).toFixed();
  setTimeout(() => {
    bot(runBot);
  }, randomDelayTime);
}

//bot click function

function bot(runBot) {
  if (runBot) {
    playerSign = "O";
    let array = [];
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        array.push(i);
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if (array.length > 0) {
      if (players.classList.contains("player")) {
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        playerSign = "X";
        allBox[randomBox].setAttribute("id", playerSign);
      } else {
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        allBox[randomBox].setAttribute("id", playerSign);
      }
      selectWinner();
    }
    allBox[randomBox].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";
    playerSign = "X";
  }
}

//the winner
function getId(idname) {
  return document.querySelector(".box" + idname).id;
}

function checkId(val1, val2, val3, sign) {
  if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
    return true;
  }
}

function wonOrDraw(result) {
  runBot = false;
  bot(runBot);
  setTimeout(() => {
    playBoard.classList.remove("show");
    resultBox.classList.add("show");
  }, 1000);
  result
    ? (wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`)
    : (wonText.textContent = "Match has been drawn!");
}

function selectWinner() {
  if (
    checkId(1, 2, 3, playerSign) ||
    checkId(4, 5, 6, playerSign) ||
    checkId(7, 8, 9, playerSign) ||
    checkId(1, 4, 7, playerSign) ||
    checkId(2, 5, 8, playerSign) ||
    checkId(3, 6, 9, playerSign) ||
    checkId(1, 5, 9, playerSign) ||
    checkId(3, 5, 7, playerSign)
  ) {
    wonOrDraw(true);
  } else {
    if (
      getId(1) != "" &&
      getId(2) != "" &&
      getId(3) != "" &&
      getId(4) != "" &&
      getId(5) != "" &&
      getId(6) != "" &&
      getId(7) != "" &&
      getId(8) != "" &&
      getId(9) != ""
    ) {
      wonOrDraw(false);
    }
  }
}

replayBtn.onclick = () => {
  window.location.reload();
};
