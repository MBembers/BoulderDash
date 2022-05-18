/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./src/Boulder.ts":
      /*!************************!*\
  !*** ./src/Boulder.ts ***!
  \************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/consts.ts");\n/* harmony import */ var _PhysicsBody__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhysicsBody */ "./src/PhysicsBody.ts");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== "function" && b !== null)\r\n            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\n\r\nvar Boulder = /** @class */ (function (_super) {\r\n    __extends(Boulder, _super);\r\n    function Boulder(x, y, board) {\r\n        var _this = _super.call(this, x, y, board) || this;\r\n        _this.type = "boulder";\r\n        _this.color = _consts__WEBPACK_IMPORTED_MODULE_0__.TilePalette[_this.type];\r\n        _this.sprite = "boulder";\r\n        return _this;\r\n    }\r\n    return Boulder;\r\n}(_PhysicsBody__WEBPACK_IMPORTED_MODULE_1__["default"]));\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Boulder);\r\n\n\n//# sourceURL=webpack://boulderdash/./src/Boulder.ts?'
        );

        /***/
      },

    /***/ "./src/Diamond.ts":
      /*!************************!*\
  !*** ./src/Diamond.ts ***!
  \************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _PhysicsBody__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhysicsBody */ "./src/PhysicsBody.ts");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== "function" && b !== null)\r\n            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar Diamond = /** @class */ (function (_super) {\r\n    __extends(Diamond, _super);\r\n    function Diamond(x, y, board) {\r\n        var _this = _super.call(this, x, y, board) || this;\r\n        _this.type = "diamond";\r\n        _this.color = "pink";\r\n        _this.sprite = "diamond0";\r\n        _this.points = 1;\r\n        return _this;\r\n    }\r\n    return Diamond;\r\n}(_PhysicsBody__WEBPACK_IMPORTED_MODULE_0__["default"]));\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Diamond);\r\n\n\n//# sourceURL=webpack://boulderdash/./src/Diamond.ts?'
        );

        /***/
      },

    /***/ "./src/Enemy.ts":
      /*!**********************!*\
  !*** ./src/Enemy.ts ***!
  \**********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/consts.ts");\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tile */ "./src/Tile.ts");\n\n\nvar Enemy = /** @class */ (function () {\n    function Enemy(x, y, board, turning) {\n        this.color = "blue";\n        this.type = "enemy";\n        this.sprite = "none";\n        this.board = board;\n        this.x = x;\n        this.y = y;\n        this.turning = turning;\n        this.direction = "up";\n        this.startMoving();\n    }\n    Enemy.prototype.startMoving = function () {\n        var _this = this;\n        this.moveInterval = setInterval(function () {\n            if (_this.checkSide(_this.turning)) {\n                _this.turn(_this.turning);\n                _this.move(_this.direction);\n            }\n            else if (_this.checkInDir(_this.direction)) {\n                _this.move(_this.direction);\n            }\n            else {\n                _this.turn(_this.turning === "left" ? "right" : "left");\n            }\n            console.log(_this.direction);\n        }, 1000 / 2);\n    };\n    Enemy.prototype.checkInDir = function (dir) {\n        if (dir === "up") {\n            if (this.board[this.y - 1][this.x].type === "clear")\n                return true;\n        }\n        else if (dir === "right") {\n            if (this.board[this.y][this.x + 1].type === "clear")\n                return true;\n        }\n        else if (dir === "down") {\n            if (this.board[this.y + 1][this.x].type === "clear")\n                return true;\n        }\n        else if (dir === "left") {\n            if (this.board[this.y][this.x - 1].type === "clear")\n                return true;\n        }\n        return false;\n    };\n    Enemy.prototype.move = function (dir) {\n        var prevX = this.x;\n        var prevY = this.y;\n        if (dir === "up") {\n            this.y = this.y - 1;\n        }\n        else if (dir === "right") {\n            this.x = this.x + 1;\n        }\n        else if (dir === "down") {\n            this.y = this.y + 1;\n        }\n        else if (dir === "left") {\n            this.x = this.x - 1;\n        }\n        this.board[this.y][this.x] = this;\n        this.board[prevY][prevX] = new _Tile__WEBPACK_IMPORTED_MODULE_1__["default"](this.x, this.y, "clear", this.board);\n    };\n    Enemy.prototype.checkSide = function (turn) {\n        var iofdir = _consts__WEBPACK_IMPORTED_MODULE_0__.dirs.indexOf(this.direction);\n        turn === "right" ? iofdir++ : iofdir--;\n        if (iofdir >= _consts__WEBPACK_IMPORTED_MODULE_0__.dirs.length)\n            iofdir = 0;\n        if (iofdir < 0)\n            iofdir = _consts__WEBPACK_IMPORTED_MODULE_0__.dirs.length - 1;\n        var newDir = _consts__WEBPACK_IMPORTED_MODULE_0__.dirs[iofdir];\n        return this.checkInDir(newDir);\n    };\n    Enemy.prototype.turn = function (turn) {\n        var iofdir = _consts__WEBPACK_IMPORTED_MODULE_0__.dirs.indexOf(this.direction);\n        turn === "right" ? iofdir++ : iofdir--;\n        if (iofdir >= _consts__WEBPACK_IMPORTED_MODULE_0__.dirs.length)\n            iofdir = 0;\n        if (iofdir < 0)\n            iofdir = _consts__WEBPACK_IMPORTED_MODULE_0__.dirs.length - 1;\n        this.direction = _consts__WEBPACK_IMPORTED_MODULE_0__.dirs[iofdir];\n    };\n    return Enemy;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Enemy);\n\n\n//# sourceURL=webpack://boulderdash/./src/Enemy.ts?'
        );

        /***/
      },

    /***/ "./src/Game.ts":
      /*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Boulder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Boulder */ "./src/Boulder.ts");\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts */ "./src/consts.ts");\n/* harmony import */ var _Diamond__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Diamond */ "./src/Diamond.ts");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Player */ "./src/Player.ts");\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tile */ "./src/Tile.ts");\n\r\n\r\n\r\n\r\n\r\nvar Game = /** @class */ (function () {\r\n    function Game() {\r\n        this.setup();\r\n    }\r\n    Game.prototype.setup = function () {\r\n        this.canvasWidth = 800;\r\n        this.canvasHeight = 500;\r\n        this.topBarHeight = 50;\r\n        this.tileWidth = 40;\r\n        this.tileHeight = 40;\r\n        this.xTiles = 50;\r\n        this.yTiles = 50;\r\n        this.cameraX = this.canvasWidth / 2;\r\n        this.cameraY = this.canvasHeight / 2;\r\n        this.startX = 6;\r\n        this.startY = 6;\r\n        this.playerPosX = this.startX;\r\n        this.playerPosY = this.startY;\r\n        this.isMoving = false;\r\n        this.boardWidth = this.xTiles * this.tileWidth;\r\n        this.boardHeight = this.yTiles * this.tileHeight;\r\n        this.cameraDestX = this.cameraX;\r\n        this.cameraDestY = this.cameraY;\r\n        this.cameraSpeed = 10;\r\n        this.board = [];\r\n        this.spritesheet = new Image();\r\n        this.spritesheet.src = "./assets/sprites_1.png";\r\n        this.animationFrame = 0;\r\n        this.player = new _Player__WEBPACK_IMPORTED_MODULE_3__["default"](this.startX, this.startY, this.board);\r\n        this.setCameraDest();\r\n        this.canvasHtml = document.createElement("canvas");\r\n        this.canvasHtml.width = this.canvasWidth;\r\n        this.canvasHtml.height = this.canvasHeight + this.topBarHeight;\r\n        this.canvasHtml.id = "game-canvas";\r\n        document.getElementById("main").appendChild(this.canvasHtml);\r\n        this.ctx = this.canvasHtml.getContext("2d");\r\n        this.createBoard();\r\n        this.render();\r\n        setInterval(this.render.bind(this), 1000 / 30);\r\n    };\r\n    Game.prototype.createBoard = function () {\r\n        for (var i = 0; i < this.yTiles; i++) {\r\n            this.board.push(new Array(this.xTiles));\r\n        }\r\n        for (var i = 0; i < this.yTiles; i++) {\r\n            for (var j = 0; j < this.xTiles; j++) {\r\n                if (i === 0 ||\r\n                    j === 0 ||\r\n                    i === this.yTiles - 1 ||\r\n                    j === this.xTiles - 1)\r\n                    this.board[i][j] = new _Tile__WEBPACK_IMPORTED_MODULE_4__["default"](j, i, "twall", this.board);\r\n                else if (i < 6)\r\n                    // else if (Math.random() < 0.12)\r\n                    this.board[i][j] = new _Boulder__WEBPACK_IMPORTED_MODULE_0__["default"](j, i, this.board);\r\n                else if (Math.random() < 0.1)\r\n                    this.board[i][j] = new _Diamond__WEBPACK_IMPORTED_MODULE_2__["default"](j, i, this.board);\r\n                else\r\n                    this.board[i][j] = new _Tile__WEBPACK_IMPORTED_MODULE_4__["default"](j, i, "dirt", this.board);\r\n            }\r\n        }\r\n        this.board[this.player.y][this.player.x] = this.player;\r\n    };\r\n    Game.prototype.render = function () {\r\n        this.setCameraDest();\r\n        this.updateCamera();\r\n        this.clearCanvas();\r\n        this.animations();\r\n        for (var i = 0; i < this.yTiles; i++) {\r\n            for (var j = 0; j < this.xTiles; j++) {\r\n                var entity = this.board[i][j];\r\n                var x = j * this.tileWidth + (this.canvasWidth / 2 - this.cameraX);\r\n                var y = i * this.tileHeight +\r\n                    (this.canvasHeight / 2 - this.cameraY) +\r\n                    this.topBarHeight;\r\n                if (entity.sprite !== "none") {\r\n                    this.drawSprite(entity.sprite, x, y);\r\n                }\r\n                else {\r\n                    // color\r\n                    this.ctx.fillStyle = entity.color;\r\n                    // tile\r\n                    this.ctx.fillRect(x, y + this.topBarHeight, this.tileWidth, this.tileHeight);\r\n                }\r\n            }\r\n        }\r\n        // this.ctx.fillStyle = "hsl(0, 0%, 0%, 50%)";\r\n        // this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight); // PRZYCIEMNIENIE\r\n        this.ctx.fillStyle = "hsl(0, 0%, 0%)";\r\n        this.ctx.fillRect(0, 0, this.canvasWidth, this.topBarHeight);\r\n    };\r\n    Game.prototype.setCameraDest = function () {\r\n        var playerX = this.player.x * this.tileWidth + this.tileWidth / 2;\r\n        var playerY = this.player.y * this.tileHeight + this.tileHeight / 2;\r\n        var dx = (this.canvasWidth / 2) * 0.65;\r\n        var dy = (this.canvasHeight / 2) * 0.65;\r\n        if (Math.abs(playerX - this.cameraX) >= dx)\r\n            this.cameraDestX = playerX;\r\n        if (Math.abs(playerY - this.cameraY) >= dy)\r\n            this.cameraDestY = playerY;\r\n    };\r\n    Game.prototype.updateCamera = function () {\r\n        if (Math.abs(this.cameraDestX - this.cameraX) > this.cameraSpeed)\r\n            this.cameraDestX > this.cameraX\r\n                ? (this.cameraX += this.cameraSpeed)\r\n                : (this.cameraX -= this.cameraSpeed);\r\n        if (Math.abs(this.cameraDestY - this.cameraY) > this.cameraSpeed)\r\n            this.cameraDestY > this.cameraY\r\n                ? (this.cameraY += this.cameraSpeed)\r\n                : (this.cameraY -= this.cameraSpeed);\r\n        // snap camera to edges\r\n        if (this.cameraX < this.canvasWidth / 2)\r\n            this.cameraX = this.canvasWidth / 2;\r\n        else if (this.cameraX > this.boardWidth - this.canvasWidth / 2)\r\n            this.cameraX = this.boardWidth - this.canvasWidth / 2;\r\n        if (this.cameraY < this.canvasHeight / 2)\r\n            this.cameraY = this.canvasHeight / 2;\r\n        else if (this.cameraY > this.boardHeight - this.canvasHeight / 2)\r\n            this.cameraY = this.boardHeight - this.canvasHeight / 2;\r\n    };\r\n    Game.prototype.clearCanvas = function () {\r\n        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight + this.topBarHeight);\r\n    };\r\n    Game.prototype.drawSprite = function (sprite, x, y) {\r\n        var spriteCoords = _consts__WEBPACK_IMPORTED_MODULE_1__.spritesheetCoords[sprite];\r\n        this.ctx.drawImage(this.spritesheet, spriteCoords[0], spriteCoords[1], 32, 32, x, y, this.tileWidth, this.tileHeight);\r\n    };\r\n    Game.prototype.animations = function () {\r\n        for (var _i = 0, _a = this.board; _i < _a.length; _i++) {\r\n            var row = _a[_i];\r\n            for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {\r\n                var entity = row_1[_b];\r\n                if (entity.type === "diamond") {\r\n                    entity.sprite = "diamond" + this.animationFrame;\r\n                }\r\n            }\r\n        }\r\n        this.animationFrame += 1;\r\n        if (this.animationFrame > 7)\r\n            this.animationFrame = 0;\r\n    };\r\n    return Game;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\r\n\n\n//# sourceURL=webpack://boulderdash/./src/Game.ts?'
        );

        /***/
      },

    /***/ "./src/PhysicsBody.ts":
      /*!****************************!*\
  !*** ./src/PhysicsBody.ts ***!
  \****************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile */ "./src/Tile.ts");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");\n\r\n\r\nvar PhysicsBody = /** @class */ (function () {\r\n    function PhysicsBody(x, y, board) {\r\n        this.color = "blue";\r\n        this.type = "physics-body";\r\n        this.sprite = "none";\r\n        this.board = board;\r\n        this.x = x;\r\n        this.y = y;\r\n        this.checkForFall();\r\n    }\r\n    PhysicsBody.prototype.checkForFall = function () {\r\n        var _this = this;\r\n        setTimeout(function () {\r\n            var counter = 0;\r\n            if (!_this.fallInterval)\r\n                _this.fallInterval = setInterval(function () {\r\n                    _this.isMoving = true;\r\n                    var neighbours = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getNeighbours)(_this.x, _this.y, _this.board);\r\n                    var moved = false;\r\n                    for (var _i = 0, neighbours_1 = neighbours; _i < neighbours_1.length; _i++) {\r\n                        var neighbour = neighbours_1[_i];\r\n                        if ((neighbour.y > _this.y || // is below\r\n                            (neighbour.y === _this.y && // is the same y\r\n                                _this.board[neighbour.y + 1][neighbour.x].type === "clear" &&\r\n                                (0,_utils__WEBPACK_IMPORTED_MODULE_1__.isSlippery)(_this.board[_this.y + 1][_this.x]))) && // below is slippery :DD\r\n                            neighbour.type === "clear") {\r\n                            _this.board[neighbour.y][neighbour.x] = _this;\r\n                            _this.board[_this.y][_this.x] = new _Tile__WEBPACK_IMPORTED_MODULE_0__["default"](_this.x, _this.y, "clear", _this.board);\r\n                            moved = true;\r\n                            for (var _a = 0, _b = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCornerNeighbours)(_this.x, _this.y, _this.board); _a < _b.length; _a++) {\r\n                                var entity = _b[_a];\r\n                                if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.isPhysicsBody)(entity)) {\r\n                                    entity.checkForFall();\r\n                                }\r\n                            }\r\n                            _this.x = neighbour.x;\r\n                            _this.y = neighbour.y;\r\n                            break;\r\n                        }\r\n                    }\r\n                    if (!moved && counter >= 0) {\r\n                        clearInterval(_this.fallInterval);\r\n                        _this.fallInterval = undefined;\r\n                        _this.isMoving = false;\r\n                    }\r\n                    counter++;\r\n                }, 1000 / 8);\r\n        }, 50);\r\n    };\r\n    return PhysicsBody;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PhysicsBody);\r\n\n\n//# sourceURL=webpack://boulderdash/./src/PhysicsBody.ts?'
        );

        /***/
      },

    /***/ "./src/Player.ts":
      /*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Boulder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Boulder */ "./src/Boulder.ts");\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tile */ "./src/Tile.ts");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");\n\r\n\r\n\r\nvar Player = /** @class */ (function () {\r\n    function Player(x, y, board) {\r\n        this.x = x;\r\n        this.y = y;\r\n        this.color = "red";\r\n        this.type = "player";\r\n        this.sprite = "player";\r\n        this.board = board;\r\n        this.points = 0;\r\n        this.isMoving = false;\r\n        this.isPushing = false;\r\n        this.listeners();\r\n    }\r\n    Player.prototype.setPos = function (x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n    };\r\n    Player.prototype.checkMove = function (newX, newY) {\r\n        var _this = this;\r\n        var entity = this.board[newY][newX];\r\n        if (entity.type === "wall" ||\r\n            entity.type === "twall" ||\r\n            ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isPhysicsBody)(entity) && entity.isMoving === true)) {\r\n            return;\r\n        }\r\n        if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isBoulder)(entity)) {\r\n            if (this.y === newY && !this.isPushing) {\r\n                this.isPushing = true;\r\n                this.pushTimeout = setTimeout(function () {\r\n                    var xdir = newX - _this.x;\r\n                    if (_this.board[_this.y][newX + xdir].type === "clear") {\r\n                        var boulder = new _Boulder__WEBPACK_IMPORTED_MODULE_0__["default"](newX + xdir, _this.y, _this.board);\r\n                        _this.board[_this.y][newX + xdir] = boulder;\r\n                        boulder.checkForFall();\r\n                        _this.movePlayer(newX, newY);\r\n                    }\r\n                    _this.isPushing = false;\r\n                }, 700);\r\n            }\r\n        }\r\n        else {\r\n            if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isDiamond)(entity)) {\r\n                this.points++;\r\n                document.title = this.points + " pts";\r\n            }\r\n            // moved\r\n            this.movePlayer(newX, newY);\r\n        }\r\n    };\r\n    Player.prototype.movePlayer = function (newX, newY) {\r\n        var prevX = this.x;\r\n        var prevY = this.y;\r\n        this.board[this.y][this.x] = new _Tile__WEBPACK_IMPORTED_MODULE_1__["default"](this.x, this.y, "clear", this.board);\r\n        this.setPos(newX, newY);\r\n        this.board[this.y][this.x] = this;\r\n        for (var _i = 0, _a = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getCornerNeighbours)(prevX, prevY, this.board); _i < _a.length; _i++) {\r\n            var e = _a[_i];\r\n            if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isPhysicsBody)(e)) {\r\n                e.checkForFall();\r\n            }\r\n        }\r\n    };\r\n    Player.prototype.listeners = function () {\r\n        var _this = this;\r\n        document.addEventListener("keydown", function (e) {\r\n            // console.log(e.code);\r\n            if (!_this.isMoving) {\r\n                _this.isMoving = true;\r\n                _this.moveInterval = setInterval(function () {\r\n                    if (e.code === "ArrowRight")\r\n                        _this.checkMove(_this.x + 1, _this.y);\r\n                    if (e.code === "ArrowLeft")\r\n                        _this.checkMove(_this.x - 1, _this.y);\r\n                    if (e.code === "ArrowUp")\r\n                        _this.checkMove(_this.x, _this.y - 1);\r\n                    if (e.code === "ArrowDown")\r\n                        _this.checkMove(_this.x, _this.y + 1);\r\n                }, 1200 / 10);\r\n            }\r\n        });\r\n        document.addEventListener("keyup", function (e) {\r\n            // console.log("BREAK:", e.code);\r\n            clearInterval(_this.moveInterval);\r\n            _this.isMoving = false;\r\n            clearTimeout(_this.pushTimeout);\r\n            _this.isPushing = false;\r\n        });\r\n    };\r\n    return Player;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\r\n\n\n//# sourceURL=webpack://boulderdash/./src/Player.ts?'
        );

        /***/
      },

    /***/ "./src/Tile.ts":
      /*!*********************!*\
  !*** ./src/Tile.ts ***!
  \*********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/consts.ts");\n\r\nvar Tile = /** @class */ (function () {\r\n    function Tile(x, y, type, board) {\r\n        this.x = x;\r\n        this.y = y;\r\n        this.type = type;\r\n        this.color = _consts__WEBPACK_IMPORTED_MODULE_0__.TilePalette[type];\r\n        this.board = board;\r\n        this.sprite = type;\r\n    }\r\n    Tile.prototype.clear = function () {\r\n        this.type = "clear";\r\n    };\r\n    Tile.prototype.changeType = function (type) {\r\n        this.type = type;\r\n        this.color = _consts__WEBPACK_IMPORTED_MODULE_0__.TilePalette[type];\r\n    };\r\n    return Tile;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tile);\r\n\n\n//# sourceURL=webpack://boulderdash/./src/Tile.ts?'
        );

        /***/
      },

    /***/ "./src/consts.ts":
      /*!***********************!*\
  !*** ./src/consts.ts ***!
  \***********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "TilePalette": () => (/* binding */ TilePalette),\n/* harmony export */   "TileType": () => (/* binding */ TileType),\n/* harmony export */   "spritesheetCoords": () => (/* binding */ spritesheetCoords),\n/* harmony export */   "testColors": () => (/* binding */ testColors)\n/* harmony export */ });\nvar TileType = {\r\n    clear: "clear",\r\n    dirt: "dirt",\r\n    wall: "wall",\r\n};\r\nvar TilePalette = {\r\n    clear: "#101010",\r\n    dirt: "hsl(30, 35%, 35%)",\r\n    wall: "hsl(30, 0%, 80%)",\r\n    twall: "hsl(30, 0%, 50%)",\r\n    boulder: "hsl(30, 10%, 69%)",\r\n};\r\nvar testColors = [\r\n    "hsl(40, 40%, 30%)",\r\n    "hsl(20, 5%, 20%)",\r\n    "hsl(50, 30%, 60%)",\r\n    "hsl(10, 30%, 20%)",\r\n    "hsl(70, 20%, 30%)",\r\n    "hsl(160, 30%, 20%)",\r\n];\r\nvar spritesheetCoords = {\r\n    player: [32 * 0, 32 * 0],\r\n    death0: [32 * 1, 32 * 0],\r\n    death1: [32 * 2, 32 * 0],\r\n    death2: [32 * 3, 32 * 0],\r\n    empty0: [32 * 4, 32 * 0],\r\n    empty1: [32 * 5, 32 * 0],\r\n    noise0: [32 * 6, 32 * 0],\r\n    noise1: [32 * 7, 32 * 0],\r\n    empty2: [32 * 8, 32 * 0],\r\n    white: [32 * 9, 32 * 0],\r\n    blink0: [32 * 0, 32 * 1],\r\n    blink1: [32 * 1, 32 * 1],\r\n    blink2: [32 * 2, 32 * 1],\r\n    blink3: [32 * 3, 32 * 1],\r\n    blink4: [32 * 4, 32 * 1],\r\n    blink5: [32 * 5, 32 * 1],\r\n    blink6: [32 * 6, 32 * 1],\r\n    blink7: [32 * 7, 32 * 1],\r\n    dwLg: [32 * 8, 32 * 1],\r\n    dgLg: [32 * 9, 32 * 1],\r\n    foot0: [32 * 0, 32 * 2],\r\n    foot1: [32 * 1, 32 * 2],\r\n    foot2: [32 * 2, 32 * 2],\r\n    foot3: [32 * 3, 32 * 2],\r\n    foot4: [32 * 4, 32 * 2],\r\n    foot5: [32 * 5, 32 * 2],\r\n    foot6: [32 * 6, 32 * 2],\r\n    foot7: [32 * 7, 32 * 2],\r\n    dwSm: [32 * 8, 32 * 2],\r\n    dgSm: [32 * 9, 32 * 2],\r\n    footblink0: [32 * 0, 32 * 3],\r\n    footblink1: [32 * 1, 32 * 3],\r\n    footblink2: [32 * 2, 32 * 3],\r\n    footblink3: [32 * 3, 32 * 3],\r\n    footblink4: [32 * 4, 32 * 3],\r\n    footblink5: [32 * 5, 32 * 3],\r\n    footblink6: [32 * 6, 32 * 3],\r\n    footblink7: [32 * 7, 32 * 3],\r\n    starwLg: [32 * 8, 32 * 3],\r\n    stargLg: [32 * 9, 32 * 3],\r\n    runleft0: [32 * 0, 32 * 4],\r\n    runleft1: [32 * 1, 32 * 4],\r\n    runleft2: [32 * 2, 32 * 4],\r\n    runleft3: [32 * 3, 32 * 4],\r\n    runleft4: [32 * 4, 32 * 4],\r\n    runleft5: [32 * 5, 32 * 4],\r\n    runleft6: [32 * 6, 32 * 4],\r\n    runleft7: [32 * 7, 32 * 4],\r\n    oparwSm: [32 * 8, 32 * 4],\r\n    opargSm: [32 * 9, 32 * 4],\r\n    cparwSm: [32 * 8, 32 * 4 + 16],\r\n    cpargSm: [32 * 9, 32 * 4 + 16],\r\n    runright0: [32 * 0, 32 * 5],\r\n    runright1: [32 * 1, 32 * 5],\r\n    runright2: [32 * 2, 32 * 5],\r\n    runright3: [32 * 3, 32 * 5],\r\n    runright4: [32 * 4, 32 * 5],\r\n    runright5: [32 * 5, 32 * 5],\r\n    runright6: [32 * 6, 32 * 5],\r\n    runright7: [32 * 7, 32 * 5],\r\n    starwSm: [32 * 8, 32 * 5],\r\n    stargSm: [32 * 9, 32 * 5],\r\n    clear: [32 * 5, 32 * 15],\r\n    twall: [32 * 1, 32 * 6],\r\n    otwall: [32 * 2, 32 * 6],\r\n    wall: [32 * 3, 32 * 6],\r\n    mwall0: [32 * 4, 32 * 6],\r\n    mwall1: [32 * 5, 32 * 6],\r\n    mwall2: [32 * 6, 32 * 6],\r\n    mwall3: [32 * 7, 32 * 6],\r\n    empty3: [32 * 8, 32 * 6],\r\n    empty4: [32 * 9, 32 * 6],\r\n    boulder: [32 * 0, 32 * 7],\r\n    dirt: [32 * 1, 32 * 7],\r\n    susdiamond: [32 * 2, 32 * 7],\r\n    susDeath: [32 * 3, 32 * 7],\r\n    bfdeath0: [32 * 4, 32 * 7],\r\n    bfdeath1: [32 * 5, 32 * 7],\r\n    bfdeath2: [32 * 6, 32 * 7],\r\n    bfdeath3: [32 * 7, 32 * 7],\r\n    empty5: [32 * 8, 32 * 7],\r\n    empty6: [32 * 9, 32 * 7],\r\n    amoeba0: [32 * 0, 32 * 8],\r\n    amoeba1: [32 * 1, 32 * 8],\r\n    amoeba2: [32 * 2, 32 * 8],\r\n    amoeba3: [32 * 3, 32 * 8],\r\n    amoeba4: [32 * 4, 32 * 8],\r\n    amoeba5: [32 * 5, 32 * 8],\r\n    amoeba6: [32 * 6, 32 * 8],\r\n    amoeba7: [32 * 7, 32 * 8],\r\n    nwSm0: [32 * 8, 32 * 8],\r\n    ngSm0: [32 * 9, 32 * 8],\r\n    nwSm1: [32 * 8, 32 * 8 + 16],\r\n    ngSm1: [32 * 9, 32 * 8 + 16],\r\n    firefly0: [32 * 0, 32 * 9],\r\n    firefly1: [32 * 1, 32 * 9],\r\n    firefly2: [32 * 2, 32 * 9],\r\n    firefly3: [32 * 3, 32 * 9],\r\n    firefly4: [32 * 4, 32 * 9],\r\n    firefly5: [32 * 5, 32 * 9],\r\n    firefly6: [32 * 6, 32 * 9],\r\n    firefly7: [32 * 7, 32 * 9],\r\n    nwSm2: [32 * 8, 32 * 9],\r\n    ngSm2: [32 * 9, 32 * 9],\r\n    nwSm3: [32 * 8, 32 * 9 + 16],\r\n    ngSm3: [32 * 9, 32 * 9 + 16],\r\n    diamond0: [32 * 0, 32 * 10],\r\n    diamond1: [32 * 1, 32 * 10],\r\n    diamond2: [32 * 2, 32 * 10],\r\n    diamond3: [32 * 3, 32 * 10],\r\n    diamond4: [32 * 4, 32 * 10],\r\n    diamond5: [32 * 5, 32 * 10],\r\n    diamond6: [32 * 6, 32 * 10],\r\n    diamond7: [32 * 7, 32 * 10],\r\n    nwSm4: [32 * 8, 32 * 10],\r\n    ngSm4: [32 * 9, 32 * 10],\r\n    nwSm5: [32 * 8, 32 * 10 + 16],\r\n    ngSm5: [32 * 9, 32 * 10 + 16],\r\n    butterfly0: [32 * 0, 32 * 11],\r\n    butterfly1: [32 * 1, 32 * 11],\r\n    butterfly2: [32 * 2, 32 * 11],\r\n    butterfly3: [32 * 3, 32 * 11],\r\n    butterfly4: [32 * 4, 32 * 11],\r\n    butterfly5: [32 * 5, 32 * 11],\r\n    butterfly6: [32 * 6, 32 * 11],\r\n    butterfly7: [32 * 7, 32 * 11],\r\n    nwSm6: [32 * 8, 32 * 11],\r\n    ngSm6: [32 * 9, 32 * 11],\r\n    nwSm7: [32 * 8, 32 * 11 + 16],\r\n    ngSm7: [32 * 9, 32 * 11 + 16],\r\n    nwLg0: [32 * 0, 32 * 12],\r\n    ngLg0: [32 * 1, 32 * 12],\r\n    nwSm8: [32 * 8, 32 * 12],\r\n    ngSm8: [32 * 9, 32 * 12],\r\n    nwSm9: [32 * 8, 32 * 12 + 16],\r\n    ngSm9: [32 * 9, 32 * 12 + 16],\r\n    nwLg1: [32 * 0, 32 * 13],\r\n    ngLg1: [32 * 1, 32 * 13],\r\n    colonwSm: [32 * 8, 32 * 13],\r\n    colongSm: [32 * 9, 32 * 13],\r\n    semiwSm: [32 * 8, 32 * 13 + 16],\r\n    semigSm: [32 * 9, 32 * 13 + 16],\r\n};\r\n\n\n//# sourceURL=webpack://boulderdash/./src/consts.ts?'
        );

        /***/
      },

    /***/ "./src/main.ts":
      /*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ "./src/Game.ts");\n\r\nvar game = new _Game__WEBPACK_IMPORTED_MODULE_0__["default"]();\r\n\n\n//# sourceURL=webpack://boulderdash/./src/main.ts?'
        );

        /***/
      },

    /***/ "./src/utils.ts":
      /*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "getCornerNeighbours": () => (/* binding */ getCornerNeighbours),\n/* harmony export */   "getNeighbours": () => (/* binding */ getNeighbours),\n/* harmony export */   "isBoulder": () => (/* binding */ isBoulder),\n/* harmony export */   "isDiamond": () => (/* binding */ isDiamond),\n/* harmony export */   "isPhysicsBody": () => (/* binding */ isPhysicsBody),\n/* harmony export */   "isSlippery": () => (/* binding */ isSlippery)\n/* harmony export */ });\nfunction getNeighbours(x, y, board) {\r\n    return [board[y + 1][x], board[y][x + 1], board[y][x - 1], board[y - 1][x]];\r\n}\r\nfunction getCornerNeighbours(x, y, board) {\r\n    return [\r\n        board[y + 1][x],\r\n        board[y][x + 1],\r\n        board[y][x - 1],\r\n        board[y - 1][x],\r\n        board[y + 1][x + 1],\r\n        board[y - 1][x - 1],\r\n        board[y + 1][x - 1],\r\n        board[y - 1][x + 1],\r\n    ];\r\n}\r\nfunction isBoulder(entity) {\r\n    return entity.type === "boulder";\r\n}\r\nfunction isDiamond(entity) {\r\n    return entity.type === "diamond";\r\n}\r\nfunction isPhysicsBody(entity) {\r\n    return ["boulder", "diamond", "physics-body"].includes(entity.type);\r\n}\r\nfunction isSlippery(entity) {\r\n    return isPhysicsBody(entity) || entity.type === "platform";\r\n}\r\n\n\n//# sourceURL=webpack://boulderdash/./src/utils.ts?'
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = __webpack_require__("./src/main.ts");
  /******/
  /******/
})();
