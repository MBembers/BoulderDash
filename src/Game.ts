import Boulder from "./Boulder";
import { caves, playerDeath, spritesheetCoords } from "./consts";
import Diamond from "./Diamond";
import Player from "./Player";
import Tile from "./Tile";
import Enemy from "./Enemy";
import { Entity } from "./types";
import Butterfly from "./Butterfly";
import Firefly from "./Firefly";
import { maps } from "./maps";
import { compareCoords, isPhysicsBody } from "./utils";

export default class Game {
  canvasWidth: number;
  canvasHeight: number;
  tileWidth: number;
  tileHeight: number;
  topBarHeight: number;
  xTiles: number; // number of tiles
  yTiles: number;
  boardWidth: number; // real size in pixels
  boardHeight: number;
  canvasHtml: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  board: Entity[][];
  isMoving: boolean;
  cameraX: number;
  cameraY: number;
  cameraDestX: number;
  cameraDestY: number;
  cameraSpeed: number; // pixels per tick CHANGE THAT
  player: Player;
  newPlayer: boolean;
  moveInterval: NodeJS.Timer;

  spritesheet: HTMLImageElement;
  animationFrame: number;
  bgAnimation: number;
  deathAnimation: number;
  animationInterval: NodeJS.Timer;
  renderInterval: NodeJS.Timer;

  testCounter: number;
  bgtile: HTMLImageElement;
  title: HTMLImageElement;
  state: string;
  cave: string;
  level: number;

  coverIndicator: number;
  loading: string;
  map: string;
  time: number;
  timeInterval: NodeJS.Timer;
  mapGoal: number;
  endX: number;
  endY: number;
  flashed: boolean;

  constructor() {
    this.setup();
    // this.loadLevel();
  }

  setup() {
    this.canvasWidth = 640;
    this.canvasHeight = 400 - 16;
    this.topBarHeight = 16;
    this.tileWidth = 32;
    this.tileHeight = 32;
    this.xTiles = 40;
    this.yTiles = 22;
    this.cameraSpeed = 5;
    this.newPlayer = true;
    this.state = "menu";
    this.level = 1;
    this.cave = "a";
    this.board = [];
    this.player = new Player(0, 0, this.board);

    this.bgtile = document.createElement("img");
    this.title = document.createElement("img");
    this.bgtile.src = "./assets/bd_background_mosaic.png";
    this.title.src = "./assets/bd_title.png";
    this.bgAnimation = 0;

    this.spritesheet = new Image();
    this.spritesheet.src = `./assets/sprites_${this.cave}.png`;

    this.canvasHtml = document.createElement("canvas") as HTMLCanvasElement;
    this.canvasHtml.width = this.canvasWidth;
    this.canvasHtml.height = this.canvasHeight + this.topBarHeight;
    this.canvasHtml.id = "game-canvas";
    document.getElementById("main").appendChild(this.canvasHtml);

    this.ctx = this.canvasHtml.getContext("2d");

    window.addEventListener("keydown", (e) => {
      if (this.state === "menu") {
        if (e.code === "ArrowRight") {
          let code = this.cave.charCodeAt(0);
          code++;
          if (code > 109) code = 112;
          this.cave = String.fromCharCode(code);
        }
        if (e.code === "ArrowLeft") {
          let code = this.cave.charCodeAt(0);
          code--;
          if (code < 97) code = 97;
          this.cave = String.fromCharCode(code);
        }
        if (e.code === "ArrowUp") this.level++;
        if (e.code === "ArrowDown") this.level--;
        if (this.level < 1) this.level = 1;
        if (this.level > 3) this.level = 3;
        if (e.code === "Space") this.loadLevel();
      } else if (this.state === "level") {
        if (e.code === "Escape") {
          if (this.player.state !== "dying") this.player.lives--;
          this.loadLevel();
        }
      }
    });

    this.renderInterval = setInterval(this.render.bind(this), 1000 / 60);
    this.animationInterval = setInterval(this.animations.bind(this), 1000 / 24);
  }

  loadLevel() {
    this.isMoving = false;
    this.boardWidth = this.xTiles * this.tileWidth;
    this.boardHeight = this.yTiles * this.tileHeight;
    this.cameraDestX = this.cameraX;
    this.cameraDestY = this.cameraY;

    this.board = [];

    if (this.state === "menu") this.player = new Player(0, 0, this.board);

    this.spritesheet.src = `./assets/sprites_${this.cave}.png`;
    this.animationFrame = 0;

    // clearInterval(this.renderInterval);
    // clearInterval(this.animationInterval);
    this.createBoard();
    this.setCameraDest();
    this.state = "level";
  }

  nextLevel() {
    this.cave = caves[caves.indexOf(this.cave) + 1];
    this.player.state = "loading";
    this.loadLevel();
  }

  createBoard() {
    this.map = maps[(this.cave + "_" + this.level) as keyof typeof maps];
    this.player.value = parseInt(this.map.split(";")[0].split("-")[1]);
    this.mapGoal = parseInt(this.map.split(";")[0].split("-")[0]);
    this.player.currGoal = this.mapGoal;
    this.map = this.map.split(";")[1];
    if (this.map.length !== 40 * 22) {
      console.log("bad map");

      this.state = "menu";
      this.loading = "none";
      return;
    }
    for (let i = 0; i < this.yTiles; i++) {
      this.board.push(new Array(this.xTiles));
      for (let j = 0; j < this.xTiles; j++) {
        this.board[i][j] = new Tile(j, i, "ltwall", this.board);
        if (this.map[i * 40 + j] === "s") {
          this.player.levelSetup(j, i);
          this.player.setBoard(this.board);
        }
        if (this.map[i * 40 + j] === "e") {
          this.endY = i;
          this.endX = j;
        }
      }
    }
    this.flashed = false;
    this.loading = "loading";
    this.time = 150;
    if (this.timeInterval) clearInterval(this.timeInterval);
    this.coverIndicator = 1000;
    this.cameraX = (this.tileWidth * this.xTiles) / 2;
    this.cameraY = (this.tileHeight * this.yTiles) / 2;
  }

  render() {
    this.clearCanvas();
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight + this.topBarHeight
    );
    const bgX = 0;
    const bgY = this.topBarHeight + 16;
    if (this.state === "menu") {
      for (let i = 0; i < 288 / 16; i++) {
        for (let j = 1; j < this.canvasWidth / 16; j++) {
          this.ctx.drawImage(
            this.bgtile as CanvasImageSource,
            j * 16 + bgX,
            i * 16 - this.bgAnimation + bgY
          );
        }
      }
      this.ctx.drawImage(this.title, 32, this.topBarHeight + 32);
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(0, this.topBarHeight, this.canvasWidth, 16);
      this.ctx.fillRect(0, 288 + this.topBarHeight, this.canvasWidth, 16);
      this.ctx.fillRect(0, this.topBarHeight, 16, 288 + 16);
      this.ctx.fillRect(this.canvasWidth - 16, this.topBarHeight, 16, 288 + 16);

      this.drawText("  stages designed", "left", "w", 0, 288 + 33);
      this.drawText(" by mapasoft c 1984", "left", "w", 0, 288 + 49);
      this.drawText("press button to play", "left", "w", 0, 288 + 65);
      this.drawText(`1 player 1 joystick`, "left", "w", 0, 288 + 81);
      this.drawText(
        ` cave: ${this.cave} level: ${this.level}`,
        "left",
        "w",
        0,
        288 + 97
      );
    } else if (this.state === "level") {
      this.setCameraDest();
      this.updateCamera();
      for (let i = 0; i < this.yTiles; i++) {
        for (let j = 0; j < this.xTiles; j++) {
          let entity = this.board[i][j];
          let x = j * this.tileWidth + (this.canvasWidth / 2 - this.cameraX);
          let y =
            i * this.tileHeight +
            (this.canvasHeight / 2 - this.cameraY) +
            this.topBarHeight;

          if (entity.type === "ltwall" && this.loading === "loading") {
            this.drawSprite(entity.sprite, x, y - this.bgAnimation);
            this.drawSprite(entity.sprite, x, y + 32 - this.bgAnimation);
          } else if (entity.sprite !== "none") {
            this.drawSprite(entity.sprite, x, y);
          } else {
            // color
            this.ctx.fillStyle = entity.color;

            // tile
            this.ctx.fillRect(x, y, this.tileWidth, this.tileHeight);
          }
        }
      }
      this.ctx.fillStyle = "hsl(0, 0%, 0%)";
      this.ctx.fillRect(0, 0, this.canvasWidth, this.topBarHeight);
      if (this.loading === "none") {
        this.drawText(
          ` ${this.player.currGoal.toString().padStart(2, "0")}`,
          "left",
          "y",
          0,
          0
        );
        this.drawSprite("dwSm", 96, 0);
        this.drawText(
          `${this.player.value.toString().padStart(2, "0")}`,
          "left",
          "w",
          128,
          0
        );
        this.drawText(
          ` ${this.player.diamonds.toString().padStart(2, "0")} ${this.time
            .toString()
            .padStart(3, "0")} ${this.player.points
            .toString()
            .padStart(6, "0")}`,
          "left",
          "w",
          192,
          0
        );
      } else if (this.loading === "loading") {
        this.drawText(
          `player 1, ${this.player.lives} men ${this.cave}/${this.level}`,
          "left",
          "w",
          0,
          0
        );
      }
    }
  }

  animations() {
    if (
      this.coverIndicator < 700 &&
      this.coverIndicator > 695 &&
      this.loading === "loading"
    ) {
      this.deathAnimation = 0;
      this.board[this.player.y][this.player.x] = this.player;
      for (let i = this.yTiles - 1; i >= 0; i--)
        for (let j = 0; j < this.xTiles; j++) {
          let cell = this.board[i][j];
          if (isPhysicsBody(cell)) cell.checkForFall();
        }
    }
    if (this.deathAnimation === 3) {
      this.loading = "none";
      this.coverIndicator = 0;
      this.deathAnimation = 0;
      this.player.state = "normal";
      this.timeCounter();
    }

    // CORE ANIMATIONS
    if (this.board.length > 0)
      for (let row of this.board) {
        for (let entity of row) {
          if (["diamond", "firefly", "butterfly"].includes(entity.type)) {
            entity.sprite = entity.type + this.animationFrame;
          }
          if (entity.type === "player") {
            entity.sprite = "player";
            if (this.player.state === "move") {
              entity.sprite = this.player.move + this.animationFrame;
            }
          }
          if (
            entity.type === "otwall" &&
            compareCoords(entity, this.player) &&
            this.coverIndicator < 800
          ) {
            if (this.animationFrame < 4) entity.sprite = "otwall";
            else entity.sprite = "twall";
          }
          if (
            entity.type === "player" &&
            this.loading === "loading" &&
            this.coverIndicator < 700
          ) {
            this.player.sprite = "death" + this.deathAnimation;
            this.deathAnimation++;
          }
          if (entity.type === "death") {
            if (Number.isInteger(entity.animation))
              entity.sprite = playerDeath[entity.animation];
            entity.animation += 0.5;
            if (entity.animation >= playerDeath.length - 1) {
              entity.type = "clear";
              entity.sprite = "clear";
              entity.animation = 0;
            }
          }
        }
      }
    this.animationFrame += 1;
    if (this.animationFrame > 7) this.animationFrame = 0;
    this.bgAnimation += 2;
    if (this.bgAnimation > 15) this.bgAnimation = 0;

    if (this.loading === "loading") {
      for (let i = 0; i < this.yTiles; i++) {
        for (let j = 0; j < this.xTiles; j++) {
          let index = i * 40 + j;
          let tile = this.map[index];
          if (
            this.board[i][j].type === "ltwall" &&
            (this.coverIndicator < 600 ||
              Math.random() > this.coverIndicator / 1000)
          ) {
            if (tile === "t")
              this.board[i][j] = new Tile(j, i, "twall", this.board);
            else if (tile === "x")
              this.board[i][j] = new Tile(j, i, "dirt", this.board);
            else if (tile === "c")
              this.board[i][j] = new Tile(j, i, "clear", this.board);
            else if (tile === "w")
              this.board[i][j] = new Tile(j, i, "wall", this.board);
            else if (tile === "f")
              this.board[i][j] = new Firefly(j, i, this.board);
            else if (tile === "u")
              this.board[i][j] = new Butterfly(j, i, this.board);
            else if (tile === "e")
              this.board[i][j] = new Tile(j, i, "end", this.board);
            else if (tile === "s") {
              this.player.setPos(j, i);
              this.player.setBoard(this.board);
              this.board[i][j] = new Tile(j, i, "otwall", this.board);
            } else if (tile === "b") {
              this.board[i][j] = new Boulder(j, i, this.board);
            } else if (tile === "d") {
              this.board[i][j] = new Diamond(j, i, this.board);
            }
          }
        }
      }
    }

    this.coverIndicator -= 4;

    if (this.player.lives === 0) {
      this.state = "menu";
      this.player.state = "dying";
    }
    if (this.player.diamonds === this.player.currGoal && !this.flashed) {
      this.board[this.endY][this.endX].sprite = "otwall";
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight + this.topBarHeight
      );
      this.flashed = true;
    }
    if (this.player.x === this.endX && this.player.y === this.endY) {
      this.nextLevel();
    }
  }

  timeCounter() {
    clearInterval(this.timeInterval);
    this.timeInterval = setInterval(() => {
      this.time--;
      if (this.time < 0) clearInterval(this.timeInterval);
    }, 1000);
  }

  setCameraDest() {
    const playerX = this.player.x * this.tileWidth + this.tileWidth / 2;
    const playerY = this.player.y * this.tileHeight + this.tileHeight / 2;
    const dx = (this.canvasWidth / 2) * 0.65;
    const dy = (this.canvasHeight / 2) * 0.65;
    if (Math.abs(playerX - this.cameraX) >= dx) this.cameraDestX = playerX;
    if (Math.abs(playerY - this.cameraY) >= dy) this.cameraDestY = playerY;
  }

  updateCamera() {
    if (Math.abs(this.cameraDestX - this.cameraX) > this.cameraSpeed)
      this.cameraDestX > this.cameraX
        ? (this.cameraX += this.cameraSpeed)
        : (this.cameraX -= this.cameraSpeed);
    if (Math.abs(this.cameraDestY - this.cameraY) > this.cameraSpeed)
      this.cameraDestY > this.cameraY
        ? (this.cameraY += this.cameraSpeed)
        : (this.cameraY -= this.cameraSpeed);

    // snap camera to edges
    if (this.cameraX < this.canvasWidth / 2)
      this.cameraX = this.canvasWidth / 2;
    else if (this.cameraX > this.boardWidth - this.canvasWidth / 2)
      this.cameraX = this.boardWidth - this.canvasWidth / 2;

    if (this.cameraY < this.canvasHeight / 2)
      this.cameraY = this.canvasHeight / 2;
    else if (this.cameraY > this.boardHeight - this.canvasHeight / 2)
      this.cameraY = this.boardHeight - this.canvasHeight / 2;
  }

  clearCanvas() {
    this.ctx.clearRect(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight + this.topBarHeight
    );
  }

  drawSprite(
    sprite: string,
    x: number,
    y: number,
    xoff: number = 0,
    yoff: number = 0
  ) {
    const spriteCoords =
      spritesheetCoords[sprite as keyof typeof spritesheetCoords];
    this.ctx.drawImage(
      this.spritesheet as CanvasImageSource,
      spriteCoords[0] + xoff,
      spriteCoords[1] + yoff,
      32,
      sprite.includes("Sm") ? 16 : 32,
      x,
      y,
      this.tileWidth,
      sprite.includes("Sm") ? this.tileHeight / 2 : this.tileHeight
    );
  }

  drawText(text: string, align: string, color: string, x: number, y: number) {
    if (align === "right") x = x - text.length * 32;
    for (let i = 0; i < text.length; i++) {
      let code = text.charCodeAt(i);
      if (code >= 48 && code <= 59) {
        let num = code - 48;
        this.drawSprite(color + "Sm0", x + i * 32, y, 0, num * 16);
      } else {
        let num = code - 97;
        if (text[i] !== " ")
          this.drawSprite(color + "Sma", x + i * 32, y, 0, num * 16);
      }
    }
  }
}
