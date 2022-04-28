/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Game = /** @class */ (function () {\n    function Game() {\n        this.setup();\n    }\n    Game.prototype.setup = function () {\n        this.canvasWidth = 800;\n        this.canvasHeight = 500;\n        this.tileWidth = 40;\n        this.tileHeight = 40;\n        this.xTiles = 50;\n        this.yTiles = 50;\n        this.cameraX = this.canvasWidth / 2;\n        this.cameraY = this.canvasHeight / 2;\n        this.playerPosX = 6;\n        this.playerPosY = 6;\n        this.canMove = true;\n        this.boardWidth = this.xTiles * this.tileWidth;\n        this.boardHeight = this.yTiles * this.tileHeight;\n        this.cameraDestX = this.cameraX;\n        this.cameraDestY = this.cameraY;\n        this.cameraSpeed = 10;\n        this.setCameraDest();\n        this.canvasHtml = document.createElement(\"canvas\");\n        this.canvasHtml.width = this.canvasWidth;\n        this.canvasHtml.height = this.canvasHeight;\n        this.canvasHtml.id = \"game-canvas\";\n        document.getElementById(\"main\").appendChild(this.canvasHtml);\n        this.ctx = this.canvasHtml.getContext(\"2d\");\n        this.listeners();\n        this.createBoard(this.xTiles, this.yTiles);\n        this.render();\n        window.setInterval(this.render.bind(this), 1000 / 30);\n    };\n    Game.prototype.createBoard = function (xnum, ynum) {\n        this.board = [];\n        for (var i = 0; i < ynum; i++) {\n            this.board.push(new Array(xnum));\n        }\n        for (var i = 0; i < ynum; i++) {\n            for (var j = 0; j < xnum; j++) {\n                this.board[i][j] =\n                    this.testColors[Math.floor(Math.random() * this.testColors.length)];\n            }\n        }\n        this.board[this.playerPosY][this.playerPosX] = this.player;\n    };\n    Game.prototype.render = function () {\n        this.setCameraDest();\n        this.updateCamera();\n        this.clear();\n        for (var i = 0; i < this.yTiles; i++) {\n            for (var j = 0; j < this.xTiles; j++) {\n                // color\n                if (this.playerPosX === j && this.playerPosY === i)\n                    this.ctx.fillStyle = \"red\";\n                else if (j === 0 ||\n                    i === 0 ||\n                    i === this.yTiles - 1 ||\n                    j === this.xTiles - 1)\n                    this.ctx.fillStyle = \"blue\";\n                else\n                    this.ctx.fillStyle = this.board[i][j];\n                // tile\n                this.ctx.fillRect(j * this.tileWidth + (this.canvasWidth / 2 - this.cameraX), i * this.tileHeight + (this.canvasHeight / 2 - this.cameraY), this.tileWidth, this.tileHeight);\n                // player border\n                if (this.playerPosX === j && this.playerPosY === i) {\n                    this.ctx.strokeStyle = \"white\";\n                    this.ctx.lineWidth = 2.0;\n                    this.ctx.strokeRect(j * this.tileWidth + (this.canvasWidth / 2 - this.cameraX), i * this.tileHeight + (this.canvasHeight / 2 - this.cameraY), this.tileWidth, this.tileHeight);\n                    this.ctx.lineWidth = 1.0;\n                }\n            }\n        }\n    };\n    Game.prototype.setCameraDest = function () {\n        var playerX = this.playerPosX * this.tileWidth + this.tileWidth / 2;\n        var playerY = this.playerPosY * this.tileHeight + this.tileHeight / 2;\n        var dx = (this.canvasWidth / 2) * 0.65;\n        var dy = (this.canvasHeight / 2) * 0.65;\n        if (Math.abs(playerX - this.cameraX) >= dx)\n            this.cameraDestX = this.playerPosX * this.tileWidth + this.tileWidth / 2;\n        if (Math.abs(playerY - this.cameraY) >= dy)\n            this.cameraDestY =\n                this.playerPosY * this.tileHeight + this.tileHeight / 2;\n    };\n    Game.prototype.updateCamera = function () {\n        console.log(\"destX:\", this.cameraDestX, \"cameraX:\", this.cameraX, \"destY:\", this.cameraDestY, \"cameraY\", this.cameraY);\n        if (Math.abs(this.cameraDestX - this.cameraX) > this.cameraSpeed)\n            this.cameraDestX > this.cameraX\n                ? (this.cameraX += this.cameraSpeed)\n                : (this.cameraX -= this.cameraSpeed);\n        if (Math.abs(this.cameraDestY - this.cameraY) > this.cameraSpeed)\n            this.cameraDestY > this.cameraY\n                ? (this.cameraY += this.cameraSpeed)\n                : (this.cameraY -= this.cameraSpeed);\n        // snap camera to edges\n        if (this.cameraX < this.canvasWidth / 2)\n            this.cameraX = this.canvasWidth / 2;\n        else if (this.cameraX > this.boardWidth - this.canvasWidth / 2)\n            this.cameraX = this.boardWidth - this.canvasWidth / 2;\n        if (this.cameraY < this.canvasHeight / 2)\n            this.cameraY = this.canvasHeight / 2;\n        else if (this.cameraY > this.boardHeight - this.canvasHeight / 2)\n            this.cameraY = this.boardHeight - this.canvasHeight / 2;\n    };\n    Game.prototype.clear = function () {\n        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);\n    };\n    Game.prototype.listeners = function () {\n        var _this = this;\n        this.testCounter = 0;\n        document.addEventListener(\"keydown\", function (e) {\n            if (_this.canMove) {\n                if (e.code === \"ArrowRight\")\n                    _this.playerPosX++;\n                if (e.code === \"ArrowLeft\")\n                    _this.playerPosX--;\n                if (e.code === \"ArrowUp\")\n                    _this.playerPosY--;\n                if (e.code === \"ArrowDown\")\n                    _this.playerPosY++;\n                _this.canMove = false;\n                window.setTimeout(function () {\n                    _this.canMove = true;\n                }, 1000 / 10);\n            }\n        });\n    };\n    return Game;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n\n//# sourceURL=webpack://boulderdash/./src/Game.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n\nvar game = new _Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n\n//# sourceURL=webpack://boulderdash/./src/main.ts?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;