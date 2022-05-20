import Boulder from "./Boulder";
import { spritesheetCoords } from "./consts";
import Diamond from "./Diamond";
import Player from "./Player";
import Tile from "./Tile";
import Enemy from "./Enemy";
import { Entity } from "./types";
import Butterfly from "./Butterfly";
import Firefly from "./Firefly";

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
  playerPosX: number;
  playerPosY: number;
  startX: number;
  startY: number;
  isMoving: boolean;
  cameraX: number;
  cameraY: number;
  cameraDestX: number;
  cameraDestY: number;
  cameraSpeed: number; // pixels per tick CHANGE THAT
  player: Player;
  moveInterval: NodeJS.Timer;

  spritesheet: HTMLImageElement;
  animationFrame: number;

  testCounter: number;

  constructor() {
    this.setup();
  }

  setup() {
    this.canvasWidth = 800;
    this.canvasHeight = 500;
    this.topBarHeight = 50;
    this.tileWidth = 40;
    this.tileHeight = 40;
    this.xTiles = 50;
    this.yTiles = 50;
    this.cameraX = this.canvasWidth / 2;
    this.cameraY = this.canvasHeight / 2;
    this.startX = 6;
    this.startY = 6;
    this.playerPosX = this.startX;
    this.playerPosY = this.startY;
    this.isMoving = false;
    this.boardWidth = this.xTiles * this.tileWidth;
    this.boardHeight = this.yTiles * this.tileHeight;
    this.cameraDestX = this.cameraX;
    this.cameraDestY = this.cameraY;
    this.cameraSpeed = 4;
    this.board = [];

    this.spritesheet = new Image();
    this.spritesheet.src = "./assets/sprites_2.png";
    this.animationFrame = 0;

    this.player = new Player(this.startX, this.startY, this.board);

    this.setCameraDest();

    this.canvasHtml = document.createElement("canvas") as HTMLCanvasElement;
    this.canvasHtml.width = this.canvasWidth;
    this.canvasHtml.height = this.canvasHeight + this.topBarHeight;
    this.canvasHtml.id = "game-canvas";
    document.getElementById("main").appendChild(this.canvasHtml);

    this.ctx = this.canvasHtml.getContext("2d");

    this.createBoard();
    this.render();
    setInterval(this.render.bind(this), 1000 / 60);
    setInterval(this.animations.bind(this), 1000 / 24);
  }

  createBoard() {
    for (let i = 0; i < this.yTiles; i++) {
      this.board.push(new Array(this.xTiles));
    }
    for (let i = 0; i < this.yTiles; i++) {
      for (let j = 0; j < this.xTiles; j++) {
        if (
          i === 0 ||
          j === 0 ||
          i === this.yTiles - 1 ||
          j === this.xTiles - 1
        )
          this.board[i][j] = new Tile(j, i, "twall", this.board);
        else if (i < 6)
          // else if (Math.random() < 0.12)
          this.board[i][j] = new Boulder(j, i, this.board);
        else if (Math.random() < 0.1)
          this.board[i][j] = new Diamond(j, i, this.board);
        else this.board[i][j] = new Tile(j, i, "dirt", this.board);
      }
    }
    this.board[this.player.y][this.player.x] = this.player;
    this.board[10][10] = new Butterfly(10, 10, this.board);
    this.board[10][15] = new Firefly(15, 10, this.board);
  }

  render() {
    this.setCameraDest();
    this.updateCamera();
    this.clearCanvas();
    for (let i = 0; i < this.yTiles; i++) {
      for (let j = 0; j < this.xTiles; j++) {
        let entity = this.board[i][j];
        let x = j * this.tileWidth + (this.canvasWidth / 2 - this.cameraX);
        let y =
          i * this.tileHeight +
          (this.canvasHeight / 2 - this.cameraY) +
          this.topBarHeight;

        if (entity.sprite !== "none") {
          this.drawSprite(entity.sprite, x, y);
        } else {
          // color
          this.ctx.fillStyle = entity.color;

          // tile
          this.ctx.fillRect(x, y, this.tileWidth, this.tileHeight);
        }
      }
    }

    // this.ctx.fillStyle = "hsl(0, 0%, 0%, 50%)";
    // this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight); // PRZYCIEMNIENIE

    this.ctx.fillStyle = "hsl(0, 0%, 0%)";
    this.ctx.fillRect(0, 0, this.canvasWidth, this.topBarHeight);
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

  drawSprite(sprite: string, x: number, y: number) {
    const spriteCoords =
      spritesheetCoords[sprite as keyof typeof spritesheetCoords];
    this.ctx.drawImage(
      this.spritesheet as CanvasImageSource,
      spriteCoords[0],
      spriteCoords[1],
      32,
      32,
      x,
      y,
      this.tileWidth,
      this.tileHeight
    );
  }

  animations() {
    for (let row of this.board) {
      for (let entity of row) {
        if (["diamond", "firefly", "butterfly"].includes(entity.type)) {
          entity.sprite = entity.type + this.animationFrame;
        }
      }
    }
    this.animationFrame += 1;
    if (this.animationFrame > 7) this.animationFrame = 0;
  }
}
