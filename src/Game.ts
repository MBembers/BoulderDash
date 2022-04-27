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
  board: string[][];
  testColors: string[] = [
    "hsl(40, 40%, 30%)",
    "hsl(20, 5%, 20%)",
    "hsl(50, 30%, 60%)",
    "hsl(10, 30%, 20%)",
    "hsl(70, 20%, 30%)",
    "hsl(160, 30%, 20%)",
  ];
  cameraX: number;
  cameraY: number;
  testCounter: number;
  playerX: number;
  playerY: number;

  constructor() {
    this.setup();
  }

  setup() {
    this.canvasWidth = 600;
    this.canvasHeight = 400;
    this.tileWidth = 40;
    this.tileHeight = 40;
    this.xTiles = 50;
    this.yTiles = 50;
    this.cameraX = this.canvasWidth / 2;
    this.cameraY = this.canvasHeight / 2;
    this.playerX = 6;
    this.playerY = 6;
    this.boardWidth = this.xTiles * this.tileWidth;
    this.boardHeight = this.yTiles * this.tileHeight;

    this.setCamera();

    this.canvasHtml = document.getElementById(
      "game-canvas"
    ) as HTMLCanvasElement;
    this.canvasHtml.width = this.canvasWidth;
    this.canvasHtml.height = this.canvasHeight;

    this.ctx = this.canvasHtml.getContext("2d");

    this.listeners();
    this.createBoard(this.xTiles, this.yTiles);
    this.render();
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
  }

  render() {
    this.clear();
    for (let i = 0; i < this.yTiles; i++) {
      for (let j = 0; j < this.xTiles; j++) {
        // snap camera to edges
        if (this.cameraX < this.canvasWidth / 2)
          this.cameraX = this.canvasWidth / 2;
        else if (this.cameraX > this.boardWidth - this.canvasWidth / 2)
          this.cameraX = this.boardWidth - this.canvasWidth / 2;
        if (this.cameraY < this.canvasHeight / 2)
          this.cameraY = this.canvasHeight / 2;
        else if (this.cameraY > this.boardHeight - this.canvasHeight / 2)
          this.cameraY = this.boardHeight - this.canvasHeight / 2;

        if (this.playerX === j && this.playerY === i)
          this.ctx.fillStyle = "red";
        else this.ctx.fillStyle = this.board[i][j];

        this.ctx.fillRect(
          j * this.tileWidth + (this.canvasWidth / 2 - this.cameraX),
          i * this.tileHeight + (this.canvasHeight / 2 - this.cameraY),
          this.tileWidth,
          this.tileHeight
        );
        if (this.playerX === j && this.playerY === i) {
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

  setCamera() {
    this.cameraX = this.playerX * this.tileWidth + this.tileWidth / 2;
    this.cameraY = this.playerY * this.tileHeight + this.tileHeight / 2;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  listeners() {
    this.testCounter = 0;
    document.addEventListener("keydown", (e) => {
      if (e.code === "ArrowRight") this.playerX++;
      if (e.code === "ArrowLeft") this.playerX--;
      if (e.code === "ArrowUp") this.playerY--;
      if (e.code === "ArrowDown") this.playerY++;

      this.setCamera();
      this.render();
    });
  }
}
