import Boulder from "./Boulder";
import Diamond from "./Diamond";
import Player from "./Player";
import Tile from "./Tile";
import { Entity } from "./types";
import {
  getCornerNeighbours,
  getNeighbours,
  isBoulder,
  isPhysicsBody,
} from "./utils";

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
  bImage: HTMLImageElement;
  dImage: HTMLImageElement;

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
    this.cameraSpeed = 10;
    this.board = [];

    this.bImage = new Image();
    this.bImage.src = "./assets/boulder.png";

    this.dImage = new Image();
    this.dImage.src = "./assets/dirt.png";
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
    setInterval(this.render.bind(this), 1000 / 30);
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
          this.board[i][j] = new Tile(j, i, "wall", this.board);
        else if (i < 6)
          // else if (Math.random() < 0.12)
          this.board[i][j] = new Boulder(j, i, this.board);
        else if (Math.random() < 0.1)
          this.board[i][j] = new Diamond(j, i, this.board);
        else this.board[i][j] = new Tile(j, i, "dirt", this.board);
      }
    }
    this.board[this.player.y][this.player.x] = this.player;
  }

  render() {
    this.setCameraDest();
    this.updateCamera();
    this.clearCanvas();
    for (let i = 0; i < this.yTiles; i++) {
      for (let j = 0; j < this.xTiles; j++) {
        let entity = this.board[i][j];
        let x = j * this.tileWidth + (this.canvasWidth / 2 - this.cameraX);
        let y = i * this.tileHeight + (this.canvasHeight / 2 - this.cameraY);

        if (entity.sprite === "boulder") {
          // BETTER SPRITES
          this.ctx.drawImage(
            this.bImage as CanvasImageSource,
            x,
            y + this.topBarHeight,
            this.tileWidth,
            this.tileHeight
          );
        } else if (entity.type === "dirt") {
          this.ctx.drawImage(
            this.dImage as CanvasImageSource,
            x,
            y + this.topBarHeight,
            this.tileWidth,
            this.tileHeight
          );
        } else {
          // color
          this.ctx.fillStyle = entity.color;

          // tile
          this.ctx.fillRect(
            x,
            y + this.topBarHeight,
            this.tileWidth,
            this.tileHeight
          );
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
}
