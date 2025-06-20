const initialGameImages = require("./game_images.json");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let gameImages = [...initialGameImages];
let currentlySelected = [];
let matches = 0;
let gameStarted = false;
let timerStart;
let flipCount = 0

const results = new bootstrap.Modal(document.getElementById("gamePassed"), {
  keyboard: false,
});
const restartButton = document.getElementById("restart");
const gameContainer = document.querySelector(".main-game");
const gameStatus = document.querySelector("p");
const twoByTwo = document.getElementById("two");
const threeByTwo = document.getElementById("three");
const fourByThree = document.getElementById("fourByThree");
const fourByTwo = document.getElementById("four");
const timer = document.getElementById("timer");
const winMessage = document.getElementById("winMsg");
const mainRestart = document.getElementById("restartButton")
const flipCounterEl = document.getElementById("flips")

let disableClick = false;

function startTimer() {
  let seconds = 1;
  let minutes = 0;
  let hours = 0;

  timerStart = setInterval(() => {
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }
    timer.textContent = `${hours > 9 ? hours : `0${hours}`}:${
      minutes > 9 ? minutes : `0${minutes}`
    }:${seconds > 9 ? seconds : `0${seconds}`}`;
    seconds++;
  }, 1000);
}

function clearTimer() {
  clearInterval(timerStart);
  timer.textContent = "00:00:00";
  gameStarted = false;
}

function handleFruitClick(id) {
  if (!gameStarted) {
    mainRestart.classList.remove("hideButton")
    gameStarted = true;
    startTimer();
  }
  if (disableClick) return;
  const selectedImage = gameImages.find((img) => img.id === id);
  if (
    !selectedImage ||
    selectedImage.matched ||
    currentlySelected.includes(selectedImage)
  )
    return;

  currentlySelected.push(selectedImage);
  document.getElementById(id).classList.remove("image-hidden");
  document.getElementById(id).classList.add("image-visible");
  flipCount++
  flipCounterEl.textContent = `Flips: ${flipCount}`

  if (currentlySelected.length === 2) {
    disableClick = true;
    const [first, second] = currentlySelected;

    if (first.matchId === second.matchId) {
      handleMatch(first.id, second.id);
    } else {
      handleMismatch();
    }
  }
}

window.handleFruitClick = handleFruitClick;

let maxMatches = initialGameImages.length / 2;

function handleMatch(first, second) {
  const firstEl = document.getElementById("div" + first);
  const secondEl = document.getElementById("div" + second);

  firstEl.style.backgroundColor = "#4db050";
  secondEl.style.backgroundColor = "#4db050";
  gameStatus.innerHTML = "status: matched";
  gameStatus.style.color = "green";
  setTimeout(() => {
    gameStatus.innerHTML = "";
  }, 500);
  currentlySelected.forEach((image) => {
    image.matched = true;
  });
  matches++;

  if (matches === maxMatches) {
    winMessage.innerHTML = `You have matched all cards!<br> time was ${timer.textContent}<br>Total card flips: ${flipCount}`;
    clearTimer()
    results.show();
  }

  currentlySelected = [];
  disableClick = false;
  updateImageStyles();
}

const handleMismatch = function () {
  setTimeout(() => {
    gameStatus.innerHTML = "";
  }, 500);
  gameStatus.innerHTML = "status: not a match";
  gameStatus.style.color = "red";

  setTimeout(() => {
    currentlySelected.forEach((img) => {
      document.getElementById(img.id).classList.remove("image-visible");
      document.getElementById(img.id).classList.add("image-hidden");
    });

    currentlySelected = [];
    disableClick = false;
  }, 500);
};

function updateImageStyles() {
  document.querySelectorAll("img").forEach((img) => {
    const imgData = gameImages.find((item) => item.id == img.id);
    if (imgData.matched) {
      img.classList.remove("image-hidden");
      img.classList.add("matched");
    } else {
      img.classList.remove("matched", "image-visible");
      img.classList.add("image-hidden");
    }
  });
}

function generateImage(pic) {
  return `
    <div id="div${pic.id}" style="background-color: gray;" onclick="handleFruitClick(${pic.id})">
      <img id="${pic.id}" class="image-hidden" src="${pic.img}" alt="fruit">
    </div>
  `;
}

function changeGrid(num) {
  restartGame();
  currentlySelected = [];
  gameImages = [...initialGameImages];
  const pairs = [];
  for (let x = 0; x < num; x++) {
    pairs.push(gameImages[0]);
    gameImages.shift();
  }

  gameImages.forEach((image) => {
    let matches = pairs.filter((img) => img.matchId === image.matchId);
    if (matches.length > 0) pairs.push(image);
  });

  gameImages = pairs;
  maxMatches = gameImages.length / 2;
  setupGame(gameImages);
  if (num === 6) {
    gameContainer.classList.remove(...gameContainer.classList);
    gameContainer.classList.add("main-game");
  } else if (num === 2) {
    gameContainer.classList.remove(...gameContainer.classList);
    gameContainer.classList.add("twoByTwo");
  } else if (num === 3) {
    gameContainer.classList.remove(...gameContainer.classList);
    gameContainer.classList.add("threeByTwo");
  } else if (num === 4) {
    gameContainer.classList.remove(...gameContainer.classList);
    gameContainer.classList.add("fourByTwo");
  }
}

function restartGame() {
  clearTimer();
  flipCount = 0
  flipCounterEl.textContent = "Flips: 0"
  mainRestart.classList.add("hideButton")
  gameImages = shuffleArray([...gameImages]);
  document.querySelectorAll("img").forEach((img) => (img.style.width = "0px"));
  gameImages.forEach((image) => (image.matched = false));
  matches = 0;

  gameContainer.innerHTML = gameImages.map(generateImage).join("");
  gameStatus.innerHTML = "";
  results.hide();
}

function setupGame(images = null) {
  mainRestart.classList.add("hideButton")
  gameImages = shuffleArray(images || [...initialGameImages]);
  gameContainer.innerHTML = gameImages.map(generateImage).join("");
}

restartButton.onclick = restartGame;
mainRestart.onclick = restartGame
twoByTwo.onclick = () => changeGrid(2);
threeByTwo.onclick = () => changeGrid(3);
fourByTwo.onclick = () => changeGrid(4);
fourByThree.onclick = () => changeGrid(6);
document.addEventListener("DOMContentLoaded", setupGame());
