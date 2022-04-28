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

/***/ "./src/Boulder.ts":
/*!************************!*\
  !*** ./src/Boulder.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tile */ \"./src/Tile.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\n\r\n\r\n\r\nvar Boulder = /** @class */ (function () {\r\n    function Boulder(x, y, board) {\r\n        this.type = \"boulder\";\r\n        this.color = _consts__WEBPACK_IMPORTED_MODULE_0__.TilePalette[this.type];\r\n        this.board = board;\r\n        this.x = x;\r\n        this.y = y;\r\n        this.sprite = \"boulder.png\";\r\n    }\r\n    Boulder.prototype.checkForFall = function () {\r\n        var _this = this;\r\n        setTimeout(function () {\r\n            var counter = 0;\r\n            if (!_this.fallInterval)\r\n                _this.fallInterval = setInterval(function () {\r\n                    var neighbours = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getNeighbours)(_this.x, _this.y, _this.board);\r\n                    var moved = false;\r\n                    for (var _i = 0, neighbours_1 = neighbours; _i < neighbours_1.length; _i++) {\r\n                        var neighbour = neighbours_1[_i];\r\n                        if ((neighbour.y > _this.y || // is below\r\n                            (neighbour.y === _this.y && // is the same y\r\n                                _this.board[neighbour.y + 1][neighbour.x].type === \"clear\" &&\r\n                                _this.board[_this.y + 1][_this.x].type === \"boulder\")) && // the same x and below is clear\r\n                            neighbour.type === \"clear\") {\r\n                            _this.board[neighbour.y][neighbour.x] = _this;\r\n                            _this.board[_this.y][_this.x] = new _Tile__WEBPACK_IMPORTED_MODULE_1__[\"default\"](_this.x, _this.y, \"clear\", _this.board);\r\n                            moved = true;\r\n                            for (var _a = 0, _b = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getCornerNeighbours)(_this.x, _this.y, _this.board); _a < _b.length; _a++) {\r\n                                var entity = _b[_a];\r\n                                if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isBoulder)(entity)) {\r\n                                    entity.checkForFall();\r\n                                }\r\n                            }\r\n                            _this.x = neighbour.x;\r\n                            _this.y = neighbour.y;\r\n                            break;\r\n                        }\r\n                    }\r\n                    if (!moved && counter > 1) {\r\n                        clearInterval(_this.fallInterval);\r\n                        _this.fallInterval = undefined;\r\n                    }\r\n                    counter++;\r\n                }, 1000 / 8);\r\n        }, 50);\r\n    };\r\n    return Boulder;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Boulder);\r\n\n\n//# sourceURL=webpack://boulderdash/./src/Boulder.ts?");

/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Boulder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Boulder */ \"./src/Boulder.ts\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ \"./src/Player.ts\");\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tile */ \"./src/Tile.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\n\r\n\r\n\r\n\r\nvar Game = /** @class */ (function () {\r\n    function Game() {\r\n        this.setup();\r\n    }\r\n    Game.prototype.setup = function () {\r\n        this.canvasWidth = 800;\r\n        this.canvasHeight = 500;\r\n        this.tileWidth = 40;\r\n        this.tileHeight = 40;\r\n        this.xTiles = 50;\r\n        this.yTiles = 50;\r\n        this.cameraX = this.canvasWidth / 2;\r\n        this.cameraY = this.canvasHeight / 2;\r\n        this.startX = 6;\r\n        this.startY = 6;\r\n        this.playerPosX = this.startX;\r\n        this.playerPosY = this.startY;\r\n        this.isMoving = false;\r\n        this.boardWidth = this.xTiles * this.tileWidth;\r\n        this.boardHeight = this.yTiles * this.tileHeight;\r\n        this.cameraDestX = this.cameraX;\r\n        this.cameraDestY = this.cameraY;\r\n        this.cameraSpeed = 10;\r\n        this.bImage = new Image();\r\n        this.bImage.src = \"./assets/boulder.png\";\r\n        this.dImage = new Image();\r\n        this.dImage.src = \"./assets/dirt.png\";\r\n        this.player = new _Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.startX, this.startY);\r\n        this.setCameraDest();\r\n        this.canvasHtml = document.createElement(\"canvas\");\r\n        this.canvasHtml.width = this.canvasWidth;\r\n        this.canvasHtml.height = this.canvasHeight;\r\n        this.canvasHtml.id = \"game-canvas\";\r\n        document.getElementById(\"main\").appendChild(this.canvasHtml);\r\n        this.ctx = this.canvasHtml.getContext(\"2d\");\r\n        this.listeners();\r\n        this.createBoard();\r\n        this.render();\r\n        setInterval(this.render.bind(this), 1000 / 30);\r\n    };\r\n    Game.prototype.createBoard = function () {\r\n        this.board = [];\r\n        for (var i = 0; i < this.yTiles; i++) {\r\n            this.board.push(new Array(this.xTiles));\r\n        }\r\n        for (var i = 0; i < this.yTiles; i++) {\r\n            for (var j = 0; j < this.xTiles; j++) {\r\n                if (i === 0 ||\r\n                    j === 0 ||\r\n                    i === this.yTiles - 1 ||\r\n                    j === this.xTiles - 1)\r\n                    this.board[i][j] = new _Tile__WEBPACK_IMPORTED_MODULE_2__[\"default\"](j, i, \"wall\", this.board);\r\n                else if (i === 1 || i === 2 || i === 3)\r\n                    this.board[i][j] = new _Boulder__WEBPACK_IMPORTED_MODULE_0__[\"default\"](j, i, this.board);\r\n                else\r\n                    this.board[i][j] = new _Tile__WEBPACK_IMPORTED_MODULE_2__[\"default\"](j, i, \"dirt\", this.board);\r\n            }\r\n        }\r\n        this.board[this.player.y][this.player.x] = this.player;\r\n    };\r\n    Game.prototype.render = function () {\r\n        this.setCameraDest();\r\n        this.updateCamera();\r\n        this.clearCanvas();\r\n        for (var i = 0; i < this.yTiles; i++) {\r\n            for (var j = 0; j < this.xTiles; j++) {\r\n                var entity = this.board[i][j];\r\n                var x = j * this.tileWidth + (this.canvasWidth / 2 - this.cameraX);\r\n                var y = i * this.tileHeight + (this.canvasHeight / 2 - this.cameraY);\r\n                if ((0,_utils__WEBPACK_IMPORTED_MODULE_3__.isBoulder)(entity)) {\r\n                    this.ctx.drawImage(this.bImage, x, y, this.tileWidth, this.tileHeight);\r\n                }\r\n                else if (entity.type === \"dirt\") {\r\n                    this.ctx.drawImage(this.dImage, x, y, this.tileWidth, this.tileHeight);\r\n                }\r\n                else {\r\n                    // color\r\n                    this.ctx.fillStyle = entity.color;\r\n                    // tile\r\n                    this.ctx.fillRect(x, y, this.tileWidth, this.tileHeight);\r\n                }\r\n            }\r\n        }\r\n    };\r\n    Game.prototype.setCameraDest = function () {\r\n        var playerX = this.player.x * this.tileWidth + this.tileWidth / 2;\r\n        var playerY = this.player.y * this.tileHeight + this.tileHeight / 2;\r\n        var dx = (this.canvasWidth / 2) * 0.65;\r\n        var dy = (this.canvasHeight / 2) * 0.65;\r\n        if (Math.abs(playerX - this.cameraX) >= dx)\r\n            this.cameraDestX = playerX;\r\n        if (Math.abs(playerY - this.cameraY) >= dy)\r\n            this.cameraDestY = playerY;\r\n    };\r\n    Game.prototype.updateCamera = function () {\r\n        if (Math.abs(this.cameraDestX - this.cameraX) > this.cameraSpeed)\r\n            this.cameraDestX > this.cameraX\r\n                ? (this.cameraX += this.cameraSpeed)\r\n                : (this.cameraX -= this.cameraSpeed);\r\n        if (Math.abs(this.cameraDestY - this.cameraY) > this.cameraSpeed)\r\n            this.cameraDestY > this.cameraY\r\n                ? (this.cameraY += this.cameraSpeed)\r\n                : (this.cameraY -= this.cameraSpeed);\r\n        // snap camera to edges\r\n        if (this.cameraX < this.canvasWidth / 2)\r\n            this.cameraX = this.canvasWidth / 2;\r\n        else if (this.cameraX > this.boardWidth - this.canvasWidth / 2)\r\n            this.cameraX = this.boardWidth - this.canvasWidth / 2;\r\n        if (this.cameraY < this.canvasHeight / 2)\r\n            this.cameraY = this.canvasHeight / 2;\r\n        else if (this.cameraY > this.boardHeight - this.canvasHeight / 2)\r\n            this.cameraY = this.boardHeight - this.canvasHeight / 2;\r\n    };\r\n    Game.prototype.clearCanvas = function () {\r\n        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);\r\n    };\r\n    Game.prototype.movePlayer = function (newX, newY) {\r\n        if (this.board[newY][newX].type !== \"wall\") {\r\n            if (this.board[newY][newX].type === \"boulder\") {\r\n            }\r\n            else {\r\n                // moved\r\n                var prevX = this.player.x;\r\n                var prevY = this.player.y;\r\n                this.board[this.player.y][this.player.x] = new _Tile__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.player.x, this.player.y, \"clear\", this.board);\r\n                this.player.setPos(newX, newY);\r\n                this.board[this.player.y][this.player.x] = this.player;\r\n                for (var _i = 0, _a = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getCornerNeighbours)(prevX, prevY, this.board); _i < _a.length; _i++) {\r\n                    var entity = _a[_i];\r\n                    if ((0,_utils__WEBPACK_IMPORTED_MODULE_3__.isBoulder)(entity)) {\r\n                        entity.checkForFall();\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    };\r\n    Game.prototype.listeners = function () {\r\n        var _this = this;\r\n        this.testCounter = 0;\r\n        document.addEventListener(\"keydown\", function (e) {\r\n            // console.log(e.code);\r\n            if (!_this.isMoving) {\r\n                _this.isMoving = true;\r\n                _this.moveInterval = setInterval(function () {\r\n                    if (e.code === \"ArrowRight\")\r\n                        _this.movePlayer(_this.player.x + 1, _this.player.y);\r\n                    if (e.code === \"ArrowLeft\")\r\n                        _this.movePlayer(_this.player.x - 1, _this.player.y);\r\n                    if (e.code === \"ArrowUp\")\r\n                        _this.movePlayer(_this.player.x, _this.player.y - 1);\r\n                    if (e.code === \"ArrowDown\")\r\n                        _this.movePlayer(_this.player.x, _this.player.y + 1);\r\n                }, 1200 / 10);\r\n            }\r\n        });\r\n        document.addEventListener(\"keyup\", function (e) {\r\n            // console.log(\"BREAK:\", e.code);\r\n            clearInterval(_this.moveInterval);\r\n            _this.isMoving = false;\r\n        });\r\n    };\r\n    return Game;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\r\n\n\n//# sourceURL=webpack://boulderdash/./src/Game.ts?");

/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Player = /** @class */ (function () {\r\n    function Player(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n        this.color = \"red\";\r\n        this.type = \"player\";\r\n    }\r\n    Player.prototype.setPos = function (x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n    };\r\n    return Player;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\r\n\n\n//# sourceURL=webpack://boulderdash/./src/Player.ts?");

/***/ }),

/***/ "./src/Tile.ts":
/*!*********************!*\
  !*** ./src/Tile.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n\r\nvar Tile = /** @class */ (function () {\r\n    function Tile(x, y, type, board) {\r\n        this.x = x;\r\n        this.y = y;\r\n        this.type = type;\r\n        this.color = _consts__WEBPACK_IMPORTED_MODULE_0__.TilePalette[type];\r\n        this.board = board;\r\n        this.sprite = \"dirt.png\";\r\n    }\r\n    Tile.prototype.clear = function () {\r\n        this.type = \"clear\";\r\n    };\r\n    Tile.prototype.changeType = function (type) {\r\n        this.type = type;\r\n        this.color = _consts__WEBPACK_IMPORTED_MODULE_0__.TilePalette[type];\r\n    };\r\n    return Tile;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tile);\r\n\n\n//# sourceURL=webpack://boulderdash/./src/Tile.ts?");

/***/ }),

/***/ "./src/consts.ts":
/*!***********************!*\
  !*** ./src/consts.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TilePalette\": () => (/* binding */ TilePalette),\n/* harmony export */   \"TileType\": () => (/* binding */ TileType),\n/* harmony export */   \"testColors\": () => (/* binding */ testColors)\n/* harmony export */ });\nvar TileType = {\r\n    clear: \"clear\",\r\n    dirt: \"dirt\",\r\n    wall: \"wall\",\r\n};\r\nvar TilePalette = {\r\n    clear: \"#101010\",\r\n    dirt: \"hsl(30, 35%, 35%)\",\r\n    wall: \"hsl(30, 0%, 50%)\",\r\n    boulder: \"hsl(30, 10%, 69%)\",\r\n};\r\nvar testColors = [\r\n    \"hsl(40, 40%, 30%)\",\r\n    \"hsl(20, 5%, 20%)\",\r\n    \"hsl(50, 30%, 60%)\",\r\n    \"hsl(10, 30%, 20%)\",\r\n    \"hsl(70, 20%, 30%)\",\r\n    \"hsl(160, 30%, 20%)\",\r\n];\r\n\n\n//# sourceURL=webpack://boulderdash/./src/consts.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n\r\nvar game = new _Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n\n\n//# sourceURL=webpack://boulderdash/./src/main.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCornerNeighbours\": () => (/* binding */ getCornerNeighbours),\n/* harmony export */   \"getNeighbours\": () => (/* binding */ getNeighbours),\n/* harmony export */   \"isBoulder\": () => (/* binding */ isBoulder)\n/* harmony export */ });\nfunction getNeighbours(x, y, board) {\r\n    return [board[y + 1][x], board[y][x + 1], board[y][x - 1], board[y - 1][x]];\r\n}\r\nfunction getCornerNeighbours(x, y, board) {\r\n    return [\r\n        board[y + 1][x],\r\n        board[y][x + 1],\r\n        board[y][x - 1],\r\n        board[y - 1][x],\r\n        board[y + 1][x + 1],\r\n        board[y - 1][x - 1],\r\n        board[y + 1][x - 1],\r\n        board[y - 1][x + 1],\r\n    ];\r\n}\r\nfunction isBoulder(entity) {\r\n    return entity.type === \"boulder\";\r\n}\r\n\n\n//# sourceURL=webpack://boulderdash/./src/utils.ts?");

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