import Player from "./Player";
import { Entity } from "./types";

export default class Game {
  canvasWidth: number;
  canvasHeight: number;
  tileWidth: number;
  tileHeight: number;
  xTiles: number; // number of tiles
  yTiles: number;
  boardWidth: number; // real size in pixels
  boardHeight: number;
  canvasHtml: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  board: Entity[][];
  playerPosX: number;
  playerPosY: number;
  canMove: boolean;
  cameraX: number;
  cameraY: number;
  cameraDestX: number;
  cameraDestY: number;
  cameraSpeed: number; // pixels per tick CHANGE THAT
  player: Player;

  testCounter: number;

  constructor() {
    this.setup();
  }

  setup() {
    this.canvasWidth = 800;
    this.canvasHeight = 500;
    this.tileWidth = 40;
    this.tileHeight = 40;
    this.xTiles = 50;
    this.yTiles = 50;
    this.cameraX = this.canvasWidth / 2;
    this.cameraY = this.canvasHeight / 2;
    this.playerPosX = 6;
    this.playerPosY = 6;
    this.canMove = true;
    this.boardWidth = this.xTiles * this.tileWidth;
    this.boardHeight = this.yTiles * this.tileHeight;
    this.cameraDestX = this.cameraX;
    this.cameraDestY = this.cameraY;
    this.cameraSpeed = 10;

    this.setCameraDest();

    this.canvasHtml = document.createElement("canvas") as HTMLCanvasElement;
    this.canvasHtml.width = this.canvasWidth;
    this.canvasHtml.height = this.canvasHeight;
    this.canvasHtml.id = "game-canvas";
    document.getElementById("main").appendChild(this.canvasHtml);

    this.ctx = this.canvasHtml.getContext("2d");

    this.listeners();
    this.createBoard(this.xTiles, this.yTiles);
    this.render();
    window.setInterval(this.render.bind(this), 1000 / 30);
  }

  createBoard(xnum: number, ynum: number) {
    this.board = [];
    for (let i = 0; i < ynum; i++) {
      this.board.push(new Array(xnum));
    }
    for (let i = 0; i < ynum; i++) {
      for (let j = 0; j < xnum; j++) {
        this.board[i][j] =
          this.testColors[Math.floor(Math.random() * this.testColors.length)];
      }
    }

    this.board[this.playerPosY][this.playerPosX] = this.player;
  }

  render() {
    this.setCameraDest();
    this.updateCamera();
    this.clear();
    for (let i = 0; i < this.yTiles; i++) {
      for (let j = 0; j < this.xTiles; j++) {
        // color
        if (this.playerPosX === j && this.playerPosY === i)
          this.ctx.fillStyle = "red";
        else if (
          j === 0 ||
          i === 0 ||
          i === this.yTiles - 1 ||
          j === this.xTiles - 1
        )
          this.ctx.fillStyle = "blue";
        else this.ctx.fillStyle = this.board[i][j];

        // tile
        this.ctx.fillRect(
          j * this.tileWidth + (this.canvasWidth / 2 - this.cameraX),
          i * this.tileHeight + (this.canvasHeight / 2 - this.cameraY),
          this.tileWidth,
          this.tileHeight
        );

        // player border
        if (this.playerPosX === j && this.playerPosY === i) {
          this.ctx.strokeStyle = "white";
          this.ctx.lineWidth = 2.0;
          this.ctx.strokeRect(
            j * this.tileWidth + (this.canvasWidth / 2 - this.cameraX),
            i * this.tileHeight + (this.canvasHeight / 2 - this.cameraY),
            this.tileWidth,
            this.tileHeight
          );
          this.ctx.lineWidth = 1.0;
        }
      }
    }
  }

  setCameraDest() {
    const playerX = this.playerPosX * this.tileWidth + this.tileWidth / 2;
    const playerY = this.playerPosY * this.tileHeight + this.tileHeight / 2;
    const dx = (this.canvasWidth / 2) * 0.65;
    const dy = (this.canvasHeight / 2) * 0.65;
    if (Math.abs(playerX - this.cameraX) >= dx)
      this.cameraDestX = this.playerPosX * this.tileWidth + this.tileWidth / 2;
    if (Math.abs(playerY - this.cameraY) >= dy)
      this.cameraDestY =
        this.playerPosY * this.tileHeight + this.tileHeight / 2;
  }

  updateCamera() {
    console.log(
      "destX:",
      this.cameraDestX,
      "cameraX:",
      this.cameraX,
      "destY:",
      this.cameraDestY,
      "cameraY",
      this.cameraY
    );
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

  clear() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  listeners() {
    this.testCounter = 0;
    document.addEventListener("keydown", (e) => {
      if (this.canMove) {
        if (e.code === "ArrowRight") this.playerPosX++;
        if (e.code === "ArrowLeft") this.playerPosX--;
        if (e.code === "ArrowUp") this.playerPosY--;
        if (e.code === "ArrowDown") this.playerPosY++;
        this.canMove = false;
        window.setTimeout(() => {
          this.canMove = true;
        }, 1000 / 10);
      }
    });
  }
}
