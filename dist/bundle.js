/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game_images.json":
/*!******************************!*\
  !*** ./src/game_images.json ***!
  \******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('[{\"id\":1,\"matchId\":1,\"img\":\"../assets/apple.webp\",\"matched\":false},{\"id\":2,\"matchId\":2,\"img\":\"../assets/orange.webp\",\"matched\":false},{\"id\":3,\"matchId\":3,\"img\":\"../assets/pineapple.png\",\"matched\":false},{\"id\":4,\"matchId\":4,\"img\":\"../assets/carrot.webp\",\"matched\":false},{\"id\":5,\"matchId\":5,\"img\":\"../assets/melon.png\",\"matched\":false},{\"id\":6,\"matchId\":6,\"img\":\"../assets/berry.webp\",\"matched\":false},{\"id\":7,\"matchId\":1,\"img\":\"../assets/apple.webp\",\"matched\":false},{\"id\":8,\"matchId\":2,\"img\":\"../assets/orange.webp\",\"matched\":false},{\"id\":9,\"matchId\":3,\"img\":\"../assets/pineapple.png\",\"matched\":false},{\"id\":10,\"matchId\":4,\"img\":\"../assets/carrot.webp\",\"matched\":false},{\"id\":11,\"matchId\":5,\"img\":\"../assets/melon.png\",\"matched\":false},{\"id\":12,\"matchId\":6,\"img\":\"../assets/berry.webp\",\"matched\":false}]');\n\n//# sourceURL=webpack://brendon-pillay-222-memory-game-in-vanilla-js-javascript/./src/game_images.json?");

/***/ }),

/***/ "./src/memory_game.js":
/*!****************************!*\
  !*** ./src/memory_game.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const initialGameImages = __webpack_require__(/*! ./game_images.json */ \"./src/game_images.json\");\r\n\r\nfunction shuffleArray(array) {\r\n  for (let i = array.length - 1; i > 0; i--) {\r\n    const j = Math.floor(Math.random() * (i + 1));\r\n    [array[i], array[j]] = [array[j], array[i]];\r\n  }\r\n  return array;\r\n}\r\n\r\nlet gameImages = [...initialGameImages];\r\nlet currentlySelected = [];\r\nlet matches = 0;\r\nlet gameStarted = false;\r\nlet timerStart;\r\nlet flipCount = 0\r\n\r\nconst results = new bootstrap.Modal(document.getElementById(\"gamePassed\"), {\r\n  keyboard: false,\r\n});\r\nconst restartButton = document.getElementById(\"restart\");\r\nconst gameContainer = document.querySelector(\".main-game\");\r\nconst gameStatus = document.querySelector(\"p\");\r\nconst twoByTwo = document.getElementById(\"two\");\r\nconst threeByTwo = document.getElementById(\"three\");\r\nconst fourByThree = document.getElementById(\"fourByThree\");\r\nconst fourByTwo = document.getElementById(\"four\");\r\nconst timer = document.getElementById(\"timer\");\r\nconst winMessage = document.getElementById(\"winMsg\");\r\nconst mainRestart = document.getElementById(\"restartButton\")\r\nconst flipCounterEl = document.getElementById(\"flips\")\r\n\r\nlet disableClick = false;\r\n\r\nfunction startTimer() {\r\n  let seconds = 1;\r\n  let minutes = 0;\r\n  let hours = 0;\r\n\r\n  timerStart = setInterval(() => {\r\n    if (seconds === 60) {\r\n      minutes++;\r\n      seconds = 0;\r\n    }\r\n    if (minutes === 60) {\r\n      hours++;\r\n      minutes = 0;\r\n    }\r\n    timer.textContent = `${hours > 9 ? hours : `0${hours}`}:${\r\n      minutes > 9 ? minutes : `0${minutes}`\r\n    }:${seconds > 9 ? seconds : `0${seconds}`}`;\r\n    seconds++;\r\n  }, 1000);\r\n}\r\n\r\nfunction clearTimer() {\r\n  clearInterval(timerStart);\r\n  timer.textContent = \"00:00:00\";\r\n  gameStarted = false;\r\n}\r\n\r\nfunction handleFruitClick(id) {\r\n  if (!gameStarted) {\r\n    mainRestart.classList.remove(\"hideButton\")\r\n    gameStarted = true;\r\n    startTimer();\r\n  }\r\n  if (disableClick) return;\r\n  const selectedImage = gameImages.find((img) => img.id === id);\r\n  if (\r\n    !selectedImage ||\r\n    selectedImage.matched ||\r\n    currentlySelected.includes(selectedImage)\r\n  )\r\n    return;\r\n\r\n  currentlySelected.push(selectedImage);\r\n  document.getElementById(id).classList.remove(\"image-hidden\");\r\n  document.getElementById(id).classList.add(\"image-visible\");\r\n  flipCount++\r\n  flipCounterEl.textContent = `Flips: ${flipCount}`\r\n\r\n  if (currentlySelected.length === 2) {\r\n    disableClick = true;\r\n    const [first, second] = currentlySelected;\r\n\r\n    if (first.matchId === second.matchId) {\r\n      handleMatch(first.id, second.id);\r\n    } else {\r\n      handleMismatch();\r\n    }\r\n  }\r\n}\r\n\r\nwindow.handleFruitClick = handleFruitClick;\r\n\r\nlet maxMatches = initialGameImages.length / 2;\r\n\r\nfunction handleMatch(first, second) {\r\n  const firstEl = document.getElementById(\"div\" + first);\r\n  const secondEl = document.getElementById(\"div\" + second);\r\n\r\n  firstEl.style.backgroundColor = \"#4db050\";\r\n  secondEl.style.backgroundColor = \"#4db050\";\r\n  gameStatus.innerHTML = \"status: matched\";\r\n  gameStatus.style.color = \"green\";\r\n  setTimeout(() => {\r\n    gameStatus.innerHTML = \"\";\r\n  }, 500);\r\n  currentlySelected.forEach((image) => {\r\n    image.matched = true;\r\n  });\r\n  matches++;\r\n\r\n  if (matches === maxMatches) {\r\n    winMessage.innerHTML = `You have matched all cards!<br> time was ${timer.textContent}<br>Total card flips: ${flipCount}`;\r\n    clearTimer()\r\n    results.show();\r\n  }\r\n\r\n  currentlySelected = [];\r\n  disableClick = false;\r\n  updateImageStyles();\r\n}\r\n\r\nconst handleMismatch = function () {\r\n  setTimeout(() => {\r\n    gameStatus.innerHTML = \"\";\r\n  }, 500);\r\n  gameStatus.innerHTML = \"status: not a match\";\r\n  gameStatus.style.color = \"red\";\r\n\r\n  setTimeout(() => {\r\n    currentlySelected.forEach((img) => {\r\n      document.getElementById(img.id).classList.remove(\"image-visible\");\r\n      document.getElementById(img.id).classList.add(\"image-hidden\");\r\n    });\r\n\r\n    currentlySelected = [];\r\n    disableClick = false;\r\n  }, 500);\r\n};\r\n\r\nfunction updateImageStyles() {\r\n  document.querySelectorAll(\"img\").forEach((img) => {\r\n    const imgData = gameImages.find((item) => item.id == img.id);\r\n    if (imgData.matched) {\r\n      img.classList.remove(\"image-hidden\");\r\n      img.classList.add(\"matched\");\r\n    } else {\r\n      img.classList.remove(\"matched\", \"image-visible\");\r\n      img.classList.add(\"image-hidden\");\r\n    }\r\n  });\r\n}\r\n\r\nfunction generateImage(pic) {\r\n  return `\r\n    <div id=\"div${pic.id}\" style=\"background-color: gray;\" onclick=\"handleFruitClick(${pic.id})\">\r\n      <img id=\"${pic.id}\" class=\"image-hidden\" src=\"${pic.img}\" alt=\"fruit\">\r\n    </div>\r\n  `;\r\n}\r\n\r\nfunction changeGrid(num) {\r\n  restartGame();\r\n  currentlySelected = [];\r\n  gameImages = [...initialGameImages];\r\n  const pairs = [];\r\n  for (let x = 0; x < num; x++) {\r\n    pairs.push(gameImages[0]);\r\n    gameImages.shift();\r\n  }\r\n\r\n  gameImages.forEach((image) => {\r\n    let matches = pairs.filter((img) => img.matchId === image.matchId);\r\n    if (matches.length > 0) pairs.push(image);\r\n  });\r\n\r\n  gameImages = pairs;\r\n  maxMatches = gameImages.length / 2;\r\n  setupGame(gameImages);\r\n  if (num === 6) {\r\n    gameContainer.classList.remove(...gameContainer.classList);\r\n    gameContainer.classList.add(\"main-game\");\r\n  } else if (num === 2) {\r\n    gameContainer.classList.remove(...gameContainer.classList);\r\n    gameContainer.classList.add(\"twoByTwo\");\r\n  } else if (num === 3) {\r\n    gameContainer.classList.remove(...gameContainer.classList);\r\n    gameContainer.classList.add(\"threeByTwo\");\r\n  } else if (num === 4) {\r\n    gameContainer.classList.remove(...gameContainer.classList);\r\n    gameContainer.classList.add(\"fourByTwo\");\r\n  }\r\n}\r\n\r\nfunction restartGame() {\r\n  clearTimer();\r\n  flipCount = 0\r\n  flipCounterEl.textContent = \"Flips: 0\"\r\n  mainRestart.classList.add(\"hideButton\")\r\n  gameImages = shuffleArray([...gameImages]);\r\n  document.querySelectorAll(\"img\").forEach((img) => (img.style.width = \"0px\"));\r\n  gameImages.forEach((image) => (image.matched = false));\r\n  matches = 0;\r\n\r\n  gameContainer.innerHTML = gameImages.map(generateImage).join(\"\");\r\n  gameStatus.innerHTML = \"\";\r\n  results.hide();\r\n}\r\n\r\nfunction setupGame(images = null) {\r\n  mainRestart.classList.add(\"hideButton\")\r\n  gameImages = shuffleArray(images || [...initialGameImages]);\r\n  gameContainer.innerHTML = gameImages.map(generateImage).join(\"\");\r\n}\r\n\r\nrestartButton.onclick = restartGame;\r\nmainRestart.onclick = restartGame\r\ntwoByTwo.onclick = () => changeGrid(2);\r\nthreeByTwo.onclick = () => changeGrid(3);\r\nfourByTwo.onclick = () => changeGrid(4);\r\nfourByThree.onclick = () => changeGrid(6);\r\ndocument.addEventListener(\"DOMContentLoaded\", setupGame());\r\n\n\n//# sourceURL=webpack://brendon-pillay-222-memory-game-in-vanilla-js-javascript/./src/memory_game.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/memory_game.js");
/******/ 	
/******/ })()
;