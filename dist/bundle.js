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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n/* harmony import */ var _PhysicsBody__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhysicsBody */ \"./src/PhysicsBody.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar Boulder = /** @class */ (function (_super) {\n    __extends(Boulder, _super);\n    function Boulder(x, y, board) {\n        var _this = _super.call(this, x, y, board) || this;\n        _this.type = \"boulder\";\n        _this.color = _consts__WEBPACK_IMPORTED_MODULE_0__.TilePalette[_this.type];\n        _this.sprite = \"boulder\";\n        return _this;\n    }\n    return Boulder;\n}(_PhysicsBody__WEBPACK_IMPORTED_MODULE_1__[\"default\"]));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Boulder);\n\n\n//# sourceURL=webpack://boulderdash/./src/Boulder.ts?");

/***/ }),

/***/ "./src/Diamond.ts":
/*!************************!*\
  !*** ./src/Diamond.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _PhysicsBody__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhysicsBody */ \"./src/PhysicsBody.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar Diamond = /** @class */ (function (_super) {\n    __extends(Diamond, _super);\n    function Diamond(x, y, board) {\n        var _this = _super.call(this, x, y, board) || this;\n        _this.type = \"diamond\";\n        _this.color = \"pink\";\n        _this.points = 1;\n        return _this;\n    }\n    return Diamond;\n}(_PhysicsBody__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Diamond);\n\n\n//# sourceURL=webpack://boulderdash/./src/Diamond.ts?");

/***/ }),

/***/ "./src/Enemy.ts":
/*!**********************!*\
  !*** ./src/Enemy.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tile */ \"./src/Tile.ts\");\n\n\nvar Enemy = /** @class */ (function () {\n    function Enemy(x, y, board, turning) {\n        this.color = \"blue\";\n        this.type = \"enemy\";\n        this.sprite = \"none\";\n        this.board = board;\n        this.x = x;\n        this.y = y;\n        this.turning = turning;\n        this.direction = \"up\";\n        this.startMoving();\n    }\n    Enemy.prototype.startMoving = function () {\n        var _this = this;\n        this.moveInterval = setInterval(function () {\n            if (_this.checkSide(_this.turning)) {\n                _this.turn(_this.turning);\n                _this.move(_this.direction);\n            }\n            else if (_this.checkInDir(_this.direction)) {\n                _this.move(_this.direction);\n            }\n            else {\n                _this.turn(_this.turning === \"left\" ? \"right\" : \"left\");\n            }\n            console.log(_this.direction);\n        }, 1000 / 2);\n    };\n    Enemy.prototype.checkInDir = function (dir) {\n        if (dir === \"up\") {\n            if (this.board[this.y - 1][this.x].type === \"clear\")\n                return true;\n        }\n        else if (dir === \"right\") {\n            if (this.board[this.y][this.x + 1].type === \"clear\")\n                return true;\n        }\n        else if (dir === \"down\") {\n            if (this.board[this.y + 1][this.x].type === \"clear\")\n                return true;\n        }\n        else if (dir === \"left\") {\n            if (this.board[this.y][this.x - 1].type === \"clear\")\n                return true;\n        }\n        return false;\n    };\n    Enemy.prototype.move = function (dir) {\n        var prevX = this.x;\n        var prevY = this.y;\n        if (dir === \"up\") {\n            this.y = this.y - 1;\n        }\n        else if (dir === \"right\") {\n            this.x = this.x + 1;\n        }\n        else if (dir === \"down\") {\n            this.y = this.y + 1;\n        }\n        else if (dir === \"left\") {\n            this.x = this.x - 1;\n        }\n        this.board[this.y][this.x] = this;\n        this.board[prevY][prevX] = new _Tile__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.x, this.y, \"clear\", this.board);\n    };\n    Enemy.prototype.checkSide = function (turn) {\n        var iofdir = _consts__WEBPACK_IMPORTED_MODULE_0__.dirs.indexOf(this.direction);\n        turn === \"right\" ? iofdir++ : iofdir--;\n        if (iofdir >= _consts__WEBPACK_IMPORTED_MODULE_0__.dirs.length)\n            iofdir = 0;\n        if (iofdir < 0)\n            iofdir = _consts__WEBPACK_IMPORTED_MODULE_0__.dirs.length - 1;\n        var newDir = _consts__WEBPACK_IMPORTED_MODULE_0__.dirs[iofdir];\n        return this.checkInDir(newDir);\n    };\n    Enemy.prototype.turn = function (turn) {\n        var iofdir = _consts__WEBPACK_IMPORTED_MODULE_0__.dirs.indexOf(this.direction);\n        turn === \"right\" ? iofdir++ : iofdir--;\n        if (iofdir >= _consts__WEBPACK_IMPORTED_MODULE_0__.dirs.length)\n            iofdir = 0;\n        if (iofdir < 0)\n            iofdir = _consts__WEBPACK_IMPORTED_MODULE_0__.dirs.length - 1;\n        this.direction = _consts__WEBPACK_IMPORTED_MODULE_0__.dirs[iofdir];\n    };\n    return Enemy;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Enemy);\n\n\n//# sourceURL=webpack://boulderdash/./src/Enemy.ts?");

/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Boulder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Boulder */ \"./src/Boulder.ts\");\n/* harmony import */ var _Diamond__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Diamond */ \"./src/Diamond.ts\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ \"./src/Player.ts\");\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Tile */ \"./src/Tile.ts\");\n/* harmony import */ var _Enemy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Enemy */ \"./src/Enemy.ts\");\n\n\n\n\n\nvar Game = /** @class */ (function () {\n    function Game() {\n        this.setup();\n    }\n    Game.prototype.setup = function () {\n        this.canvasWidth = 800;\n        this.canvasHeight = 500;\n        this.topBarHeight = 50;\n        this.tileWidth = 40;\n        this.tileHeight = 40;\n        this.xTiles = 50;\n        this.yTiles = 50;\n        this.cameraX = this.canvasWidth / 2;\n        this.cameraY = this.canvasHeight / 2;\n        this.startX = 6;\n        this.startY = 6;\n        this.playerPosX = this.startX;\n        this.playerPosY = this.startY;\n        this.isMoving = false;\n        this.boardWidth = this.xTiles * this.tileWidth;\n        this.boardHeight = this.yTiles * this.tileHeight;\n        this.cameraDestX = this.cameraX;\n        this.cameraDestY = this.cameraY;\n        this.cameraSpeed = 10;\n        this.board = [];\n        this.bImage = new Image();\n        this.bImage.src = \"./assets/boulder.png\";\n        this.dImage = new Image();\n        this.dImage.src = \"./assets/dirt.png\";\n        this.player = new _Player__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.startX, this.startY, this.board);\n        this.setCameraDest();\n        this.canvasHtml = document.createElement(\"canvas\");\n        this.canvasHtml.width = this.canvasWidth;\n        this.canvasHtml.height = this.canvasHeight + this.topBarHeight;\n        this.canvasHtml.id = \"game-canvas\";\n        document.getElementById(\"main\").appendChild(this.canvasHtml);\n        this.ctx = this.canvasHtml.getContext(\"2d\");\n        this.createBoard();\n        this.render();\n        setInterval(this.render.bind(this), 1000 / 30);\n    };\n    Game.prototype.createBoard = function () {\n        for (var i = 0; i < this.yTiles; i++) {\n            this.board.push(new Array(this.xTiles));\n        }\n        for (var i = 0; i < this.yTiles; i++) {\n            for (var j = 0; j < this.xTiles; j++) {\n                if (i === 0 ||\n                    j === 0 ||\n                    i === this.yTiles - 1 ||\n                    j === this.xTiles - 1)\n                    this.board[i][j] = new _Tile__WEBPACK_IMPORTED_MODULE_3__[\"default\"](j, i, \"wall\", this.board);\n                else if (i < 3)\n                    // else if (Math.random() < 0.12)\n                    this.board[i][j] = new _Boulder__WEBPACK_IMPORTED_MODULE_0__[\"default\"](j, i, this.board);\n                else if (Math.random() < 0.1)\n                    this.board[i][j] = new _Diamond__WEBPACK_IMPORTED_MODULE_1__[\"default\"](j, i, this.board);\n                else\n                    this.board[i][j] = new _Tile__WEBPACK_IMPORTED_MODULE_3__[\"default\"](j, i, \"dirt\", this.board);\n            }\n        }\n        this.board[this.player.y][this.player.x] = this.player;\n        this.board[10][10] = new _Enemy__WEBPACK_IMPORTED_MODULE_4__[\"default\"](10, 10, this.board, \"left\");\n        this.board[10][15] = new _Enemy__WEBPACK_IMPORTED_MODULE_4__[\"default\"](15, 10, this.board, \"right\");\n    };\n    Game.prototype.render = function () {\n        this.setCameraDest();\n        this.updateCamera();\n        this.clearCanvas();\n        for (var i = 0; i < this.yTiles; i++) {\n            for (var j = 0; j < this.xTiles; j++) {\n                var entity = this.board[i][j];\n                var x = j * this.tileWidth + (this.canvasWidth / 2 - this.cameraX);\n                var y = i * this.tileHeight + (this.canvasHeight / 2 - this.cameraY);\n                if (entity.sprite === \"boulder\") {\n                    // BETTER SPRITES\n                    this.ctx.drawImage(this.bImage, x, y + this.topBarHeight, this.tileWidth, this.tileHeight);\n                }\n                else if (entity.type === \"dirt\") {\n                    this.ctx.drawImage(this.dImage, x, y + this.topBarHeight, this.tileWidth, this.tileHeight);\n                }\n                else {\n                    // color\n                    this.ctx.fillStyle = entity.color;\n                    // tile\n                    this.ctx.fillRect(x, y + this.topBarHeight, this.tileWidth, this.tileHeight);\n                }\n            }\n        }\n        // this.ctx.fillStyle = \"hsl(0, 0%, 0%, 50%)\";\n        // this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight); // PRZYCIEMNIENIE\n        this.ctx.fillStyle = \"hsl(0, 0%, 0%)\";\n        this.ctx.fillRect(0, 0, this.canvasWidth, this.topBarHeight);\n    };\n    Game.prototype.setCameraDest = function () {\n        var playerX = this.player.x * this.tileWidth + this.tileWidth / 2;\n        var playerY = this.player.y * this.tileHeight + this.tileHeight / 2;\n        var dx = (this.canvasWidth / 2) * 0.65;\n        var dy = (this.canvasHeight / 2) * 0.65;\n        if (Math.abs(playerX - this.cameraX) >= dx)\n            this.cameraDestX = playerX;\n        if (Math.abs(playerY - this.cameraY) >= dy)\n            this.cameraDestY = playerY;\n    };\n    Game.prototype.updateCamera = function () {\n        if (Math.abs(this.cameraDestX - this.cameraX) > this.cameraSpeed)\n            this.cameraDestX > this.cameraX\n                ? (this.cameraX += this.cameraSpeed)\n                : (this.cameraX -= this.cameraSpeed);\n        if (Math.abs(this.cameraDestY - this.cameraY) > this.cameraSpeed)\n            this.cameraDestY > this.cameraY\n                ? (this.cameraY += this.cameraSpeed)\n                : (this.cameraY -= this.cameraSpeed);\n        // snap camera to edges\n        if (this.cameraX < this.canvasWidth / 2)\n            this.cameraX = this.canvasWidth / 2;\n        else if (this.cameraX > this.boardWidth - this.canvasWidth / 2)\n            this.cameraX = this.boardWidth - this.canvasWidth / 2;\n        if (this.cameraY < this.canvasHeight / 2)\n            this.cameraY = this.canvasHeight / 2;\n        else if (this.cameraY > this.boardHeight - this.canvasHeight / 2)\n            this.cameraY = this.boardHeight - this.canvasHeight / 2;\n    };\n    Game.prototype.clearCanvas = function () {\n        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight + this.topBarHeight);\n    };\n    return Game;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n\n//# sourceURL=webpack://boulderdash/./src/Game.ts?");

/***/ }),

/***/ "./src/PhysicsBody.ts":
/*!****************************!*\
  !*** ./src/PhysicsBody.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile */ \"./src/Tile.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\n\n\nvar PhysicsBody = /** @class */ (function () {\n    function PhysicsBody(x, y, board) {\n        this.color = \"blue\";\n        this.type = \"physics-body\";\n        this.sprite = \"none\";\n        this.board = board;\n        this.x = x;\n        this.y = y;\n        this.checkForFall();\n    }\n    PhysicsBody.prototype.checkForFall = function () {\n        var _this = this;\n        setTimeout(function () {\n            var counter = 0;\n            if (!_this.fallInterval)\n                _this.fallInterval = setInterval(function () {\n                    _this.isMoving = true;\n                    var neighbours = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getNeighbours)(_this.x, _this.y, _this.board);\n                    var moved = false;\n                    for (var _i = 0, neighbours_1 = neighbours; _i < neighbours_1.length; _i++) {\n                        var neighbour = neighbours_1[_i];\n                        if ((neighbour.y > _this.y || // is below\n                            (neighbour.y === _this.y && // is the same y\n                                _this.board[neighbour.y + 1][neighbour.x].type === \"clear\" &&\n                                (0,_utils__WEBPACK_IMPORTED_MODULE_1__.isSlippery)(_this.board[_this.y + 1][_this.x]))) && // below is slippery :DD\n                            neighbour.type === \"clear\") {\n                            _this.board[neighbour.y][neighbour.x] = _this;\n                            _this.board[_this.y][_this.x] = new _Tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_this.x, _this.y, \"clear\", _this.board);\n                            moved = true;\n                            for (var _a = 0, _b = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCornerNeighbours)(_this.x, _this.y, _this.board); _a < _b.length; _a++) {\n                                var entity = _b[_a];\n                                if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.isPhysicsBody)(entity)) {\n                                    entity.checkForFall();\n                                }\n                            }\n                            _this.x = neighbour.x;\n                            _this.y = neighbour.y;\n                            break;\n                        }\n                    }\n                    if (!moved && counter >= 0) {\n                        clearInterval(_this.fallInterval);\n                        _this.fallInterval = undefined;\n                        _this.isMoving = false;\n                    }\n                    counter++;\n                }, 1000 / 8);\n        }, 50);\n    };\n    return PhysicsBody;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PhysicsBody);\n\n\n//# sourceURL=webpack://boulderdash/./src/PhysicsBody.ts?");

/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Boulder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Boulder */ \"./src/Boulder.ts\");\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tile */ \"./src/Tile.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\n\n\n\nvar Player = /** @class */ (function () {\n    function Player(x, y, board) {\n        this.x = x;\n        this.y = y;\n        this.color = \"red\";\n        this.type = \"player\";\n        this.sprite = \"none\";\n        this.board = board;\n        this.points = 0;\n        this.isMoving = false;\n        this.isPushing = false;\n        this.listeners();\n    }\n    Player.prototype.setPos = function (x, y) {\n        this.x = x;\n        this.y = y;\n    };\n    Player.prototype.checkMove = function (newX, newY) {\n        var _this = this;\n        var entity = this.board[newY][newX];\n        if (entity.type === \"wall\" ||\n            ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isPhysicsBody)(entity) && entity.isMoving === true)) {\n            return;\n        }\n        if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isBoulder)(entity)) {\n            if (this.y === newY && !this.isPushing) {\n                this.isPushing = true;\n                this.pushTimeout = setTimeout(function () {\n                    var xdir = newX - _this.x;\n                    if (_this.board[_this.y][newX + xdir].type === \"clear\") {\n                        var boulder = new _Boulder__WEBPACK_IMPORTED_MODULE_0__[\"default\"](newX + xdir, _this.y, _this.board);\n                        _this.board[_this.y][newX + xdir] = boulder;\n                        boulder.checkForFall();\n                        _this.movePlayer(newX, newY);\n                    }\n                    _this.isPushing = false;\n                }, 700);\n            }\n        }\n        else {\n            if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isDiamond)(entity)) {\n                this.points++;\n                document.title = this.points + \" pts\";\n            }\n            // moved\n            this.movePlayer(newX, newY);\n        }\n    };\n    Player.prototype.movePlayer = function (newX, newY) {\n        var prevX = this.x;\n        var prevY = this.y;\n        this.board[this.y][this.x] = new _Tile__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.x, this.y, \"clear\", this.board);\n        this.setPos(newX, newY);\n        this.board[this.y][this.x] = this;\n        for (var _i = 0, _a = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getCornerNeighbours)(prevX, prevY, this.board); _i < _a.length; _i++) {\n            var e = _a[_i];\n            if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isPhysicsBody)(e)) {\n                e.checkForFall();\n            }\n        }\n    };\n    Player.prototype.listeners = function () {\n        var _this = this;\n        document.addEventListener(\"keydown\", function (e) {\n            // console.log(e.code);\n            if (!_this.isMoving) {\n                _this.isMoving = true;\n                _this.moveInterval = setInterval(function () {\n                    if (e.code === \"ArrowRight\")\n                        _this.checkMove(_this.x + 1, _this.y);\n                    if (e.code === \"ArrowLeft\")\n                        _this.checkMove(_this.x - 1, _this.y);\n                    if (e.code === \"ArrowUp\")\n                        _this.checkMove(_this.x, _this.y - 1);\n                    if (e.code === \"ArrowDown\")\n                        _this.checkMove(_this.x, _this.y + 1);\n                }, 1200 / 10);\n            }\n        });\n        document.addEventListener(\"keyup\", function (e) {\n            // console.log(\"BREAK:\", e.code);\n            clearInterval(_this.moveInterval);\n            _this.isMoving = false;\n            clearTimeout(_this.pushTimeout);\n            _this.isPushing = false;\n        });\n    };\n    return Player;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://boulderdash/./src/Player.ts?");

/***/ }),

/***/ "./src/Tile.ts":
/*!*********************!*\
  !*** ./src/Tile.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n\nvar Tile = /** @class */ (function () {\n    function Tile(x, y, type, board) {\n        this.x = x;\n        this.y = y;\n        this.type = type;\n        this.color = _consts__WEBPACK_IMPORTED_MODULE_0__.TilePalette[type];\n        this.board = board;\n        this.sprite = \"dirt\";\n    }\n    Tile.prototype.clear = function () {\n        this.type = \"clear\";\n    };\n    Tile.prototype.changeType = function (type) {\n        this.type = type;\n        this.color = _consts__WEBPACK_IMPORTED_MODULE_0__.TilePalette[type];\n    };\n    return Tile;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tile);\n\n\n//# sourceURL=webpack://boulderdash/./src/Tile.ts?");

/***/ }),

/***/ "./src/consts.ts":
/*!***********************!*\
  !*** ./src/consts.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TilePalette\": () => (/* binding */ TilePalette),\n/* harmony export */   \"TileType\": () => (/* binding */ TileType),\n/* harmony export */   \"dirs\": () => (/* binding */ dirs),\n/* harmony export */   \"velocityX\": () => (/* binding */ velocityX),\n/* harmony export */   \"velocityY\": () => (/* binding */ velocityY)\n/* harmony export */ });\nvar TileType = {\n    clear: \"clear\",\n    dirt: \"dirt\",\n    wall: \"wall\",\n};\nvar TilePalette = {\n    clear: \"#101010\",\n    dirt: \"hsl(30, 35%, 35%)\",\n    wall: \"hsl(30, 0%, 50%)\",\n    boulder: \"hsl(30, 10%, 69%)\",\n};\n// export const testColors: string[] = [\n//   \"hsl(40, 40%, 30%)\",\n//   \"hsl(20, 5%, 20%)\",\n//   \"hsl(50, 30%, 60%)\",\n//   \"hsl(10, 30%, 20%)\",\n//   \"hsl(70, 20%, 30%)\",\n//   \"hsl(160, 30%, 20%)\",\n// ];\nvar velocityX = {\n    left: -1,\n    right: 1,\n    up: 0,\n    down: 0,\n};\nvar velocityY = {\n    left: 0,\n    right: 0,\n    up: -1,\n    down: 1,\n};\nvar dirs = [\"up\", \"right\", \"down\", \"left\"];\n\n\n//# sourceURL=webpack://boulderdash/./src/consts.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n\nvar game = new _Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n\n//# sourceURL=webpack://boulderdash/./src/main.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCornerNeighbours\": () => (/* binding */ getCornerNeighbours),\n/* harmony export */   \"getNeighbours\": () => (/* binding */ getNeighbours),\n/* harmony export */   \"isBoulder\": () => (/* binding */ isBoulder),\n/* harmony export */   \"isDiamond\": () => (/* binding */ isDiamond),\n/* harmony export */   \"isPhysicsBody\": () => (/* binding */ isPhysicsBody),\n/* harmony export */   \"isSlippery\": () => (/* binding */ isSlippery)\n/* harmony export */ });\nfunction getNeighbours(x, y, board) {\n    return [board[y + 1][x], board[y][x + 1], board[y][x - 1], board[y - 1][x]];\n}\nfunction getCornerNeighbours(x, y, board) {\n    return [\n        board[y + 1][x],\n        board[y][x + 1],\n        board[y][x - 1],\n        board[y - 1][x],\n        board[y + 1][x + 1],\n        board[y - 1][x - 1],\n        board[y + 1][x - 1],\n        board[y - 1][x + 1],\n    ];\n}\nfunction isBoulder(entity) {\n    return entity.type === \"boulder\";\n}\nfunction isDiamond(entity) {\n    return entity.type === \"diamond\";\n}\nfunction isPhysicsBody(entity) {\n    return [\"boulder\", \"diamond\", \"physics-body\"].includes(entity.type);\n}\nfunction isSlippery(entity) {\n    return isPhysicsBody(entity) || entity.type === \"platform\";\n}\n\n\n//# sourceURL=webpack://boulderdash/./src/utils.ts?");

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