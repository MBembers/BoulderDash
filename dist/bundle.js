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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Game = /** @class */ (function () {\r\n    function Game() {\r\n        this.testColors = [\r\n            \"hsl(40, 40%, 30%)\",\r\n            \"hsl(20, 5%, 20%)\",\r\n            \"hsl(50, 30%, 60%)\",\r\n            \"hsl(10, 30%, 20%)\",\r\n            \"hsl(70, 20%, 30%)\",\r\n            \"hsl(160, 30%, 20%)\",\r\n        ];\r\n        this.setup();\r\n    }\r\n    Game.prototype.setup = function () {\r\n        this.canvasWidth = 600;\r\n        this.canvasHeight = 400;\r\n        this.tileWidth = 40;\r\n        this.tileHeight = 40;\r\n        this.xTiles = 50;\r\n        this.yTiles = 50;\r\n        this.cameraX = this.canvasWidth / 2;\r\n        this.cameraY = this.canvasHeight / 2;\r\n        this.playerX = 6;\r\n        this.playerY = 6;\r\n        this.boardWidth = this.xTiles * this.tileWidth;\r\n        this.boardHeight = this.yTiles * this.tileHeight;\r\n        this.setCamera();\r\n        this.canvasHtml = document.getElementById(\"game-canvas\");\r\n        this.canvasHtml.width = this.canvasWidth;\r\n        this.canvasHtml.height = this.canvasHeight;\r\n        this.ctx = this.canvasHtml.getContext(\"2d\");\r\n        this.listeners();\r\n        this.createBoard(this.xTiles, this.yTiles);\r\n        this.render();\r\n    };\r\n    Game.prototype.createBoard = function (xnum, ynum) {\r\n        this.board = [];\r\n        for (var i = 0; i < ynum; i++) {\r\n            this.board.push(new Array(xnum));\r\n        }\r\n        for (var i = 0; i < ynum; i++) {\r\n            for (var j = 0; j < xnum; j++) {\r\n                this.board[i][j] =\r\n                    this.testColors[Math.floor(Math.random() * this.testColors.length)];\r\n            }\r\n        }\r\n    };\r\n    Game.prototype.render = function () {\r\n        this.clear();\r\n        for (var i = 0; i < this.yTiles; i++) {\r\n            for (var j = 0; j < this.xTiles; j++) {\r\n                // snap camera to edges\r\n                if (this.cameraX < this.canvasWidth / 2)\r\n                    this.cameraX = this.canvasWidth / 2;\r\n                else if (this.cameraX > this.boardWidth - this.canvasWidth / 2)\r\n                    this.cameraX = this.boardWidth - this.canvasWidth / 2;\r\n                if (this.cameraY < this.canvasHeight / 2)\r\n                    this.cameraY = this.canvasHeight / 2;\r\n                else if (this.cameraY > this.boardHeight - this.canvasHeight / 2)\r\n                    this.cameraY = this.boardHeight - this.canvasHeight / 2;\r\n                if (this.playerX === j && this.playerY === i)\r\n                    this.ctx.fillStyle = \"red\";\r\n                else\r\n                    this.ctx.fillStyle = this.board[i][j];\r\n                this.ctx.fillRect(j * this.tileWidth + (this.canvasWidth / 2 - this.cameraX), i * this.tileHeight + (this.canvasHeight / 2 - this.cameraY), this.tileWidth, this.tileHeight);\r\n                if (this.playerX === j && this.playerY === i) {\r\n                    this.ctx.strokeStyle = \"white\";\r\n                    this.ctx.lineWidth = 2.0;\r\n                    this.ctx.strokeRect(j * this.tileWidth + (this.canvasWidth / 2 - this.cameraX), i * this.tileHeight + (this.canvasHeight / 2 - this.cameraY), this.tileWidth, this.tileHeight);\r\n                    this.ctx.lineWidth = 1.0;\r\n                }\r\n            }\r\n        }\r\n    };\r\n    Game.prototype.setCamera = function () {\r\n        this.cameraX = this.playerX * this.tileWidth + this.tileWidth / 2;\r\n        this.cameraY = this.playerY * this.tileHeight + this.tileHeight / 2;\r\n    };\r\n    Game.prototype.clear = function () {\r\n        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);\r\n    };\r\n    Game.prototype.listeners = function () {\r\n        var _this = this;\r\n        this.testCounter = 0;\r\n        document.addEventListener(\"keydown\", function (e) {\r\n            if (e.code === \"ArrowRight\")\r\n                _this.playerX++;\r\n            if (e.code === \"ArrowLeft\")\r\n                _this.playerX--;\r\n            if (e.code === \"ArrowUp\")\r\n                _this.playerY--;\r\n            if (e.code === \"ArrowDown\")\r\n                _this.playerY++;\r\n            _this.setCamera();\r\n            _this.render();\r\n        });\r\n    };\r\n    return Game;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\r\n\n\n//# sourceURL=webpack://boulderdash/./src/Game.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n\r\nvar game = new _Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n\n\n//# sourceURL=webpack://boulderdash/./src/main.ts?");

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