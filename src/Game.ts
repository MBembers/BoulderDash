export default class Game {
  width: number;
  height: number;
  canvasHtml: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  board: string[][];
  testColors: string[] = ["blue", "red"];
  constructor() {
    this.setup();
  }

  setup() {
    this.width = 500;
    this.height = 500;
    this.canvasHtml = document.getElementById(
      "game-canvas"
    ) as HTMLCanvasElement;
    this.ctx = this.canvasHtml.getContext("2d");

    this.createBoard();

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.ctx.fillStyle = this.board[i][j];
        this.ctx.fillRect(j * 40 + 50, i * 40 + 50, 40, 40);
      }
    }
  }

  createBoard() {
    this.board = [];
    for (let i = 0; i < 10; i++) {
      this.board.push(new Array(10));
    }
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.board[i][j] =
          this.testColors[Math.floor(Math.random() * this.testColors.length)];
      }
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
