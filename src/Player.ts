import Boulder from "./Boulder";
import Tile from "./Tile";
import { Entity, IPlayer } from "./types";
import {
  canPlayerMove,
  getCornerNeighbours,
  isBoulder,
  isDiamond,
  isPhysicsBody,
} from "./utils";

export default class Player implements IPlayer {
  x: number;
  y: number;
  type: string;
  color: string;
  sprite: string;
  board: Entity[][];
  points: number;
  lives: number;
  diamonds: number;
  isMoving: boolean;
  moveInterval: NodeJS.Timer;
  pushTimeout: NodeJS.Timeout;
  isPushing: boolean;
  move: string;
  state: string;

  constructor(x: number, y: number, board: Entity[][]) {
    this.x = x;
    this.y = y;
    this.color = "red";
    this.type = "player";
    this.sprite = "player";
    this.state = "idle";
    this.move = "none";
    this.board = board;
    this.points = 0;
    this.diamonds = 0;
    this.lives = 3;
    this.isMoving = false;
    this.isPushing = false;
  }

  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setBoard(board: Entity[][]) {
    this.board = board;
  }

  checkMove(newX: number, newY: number) {
    let entity = this.board[newY][newX];
    if (canPlayerMove(entity)) return;

    if (isBoulder(entity)) {
      if (this.y === newY && !this.isPushing) {
        this.isPushing = true;
        this.pushTimeout = setTimeout(() => {
          const xdir = newX - this.x;
          if (this.board[this.y][newX + xdir].type === "clear") {
            const boulder = new Boulder(newX + xdir, this.y, this.board);
            this.board[this.y][newX + xdir] = boulder;
            boulder.checkForFall();
            this.movePlayer(newX, newY);
          }

          this.isPushing = false;
        }, 700);
      }
    } else {
      if (isDiamond(entity)) {
        entity.delete();
        this.diamonds++;
        this.points += 10;
        if (this.points % 500 === 0 && this.points > 0) {
          this.lives++;
        }
        document.title = this.lives + " l";
      }
      // moved
      this.movePlayer(newX, newY);
    }
  }

  movePlayer(newX: number, newY: number) {
    let prevX = this.x;
    let prevY = this.y;

    this.setPos(newX, newY);
    this.board[this.y][this.x] = this;
    this.board[prevY][prevX] = new Tile(prevX, prevY, "clear", this.board);

    for (let e of getCornerNeighbours(prevX, prevY, this.board)) {
      if (isPhysicsBody(e)) {
        e.checkForFall();
      }
    }
  }

  hit() {
    this.lives--;
    document.title = this.lives + " l";
  }

  listeners() {
    document.addEventListener("keydown", (e) => {
      // console.log(e.code);
      if (!this.isMoving) {
        this.isMoving = true;
        this.moveInterval = setInterval(() => {
          if (e.code === "ArrowRight") {
            this.checkMove(this.x + 1, this.y);
            this.state = "move";
            this.move = "runright";
          }
          if (e.code === "ArrowLeft") {
            this.checkMove(this.x - 1, this.y);
            this.state = "move";
            this.move = "runleft";
          }
          if (e.code === "ArrowUp") {
            this.checkMove(this.x, this.y - 1);
            this.state = "move";
            if (this.move === "none") this.move = "runright";
          }
          if (e.code === "ArrowDown") {
            this.checkMove(this.x, this.y + 1);
            this.state = "move";
            if (this.move === "none") this.move = "runright";
          }
        }, 1000 / 8);
      }
    });
    document.addEventListener("keyup", (e) => {
      // console.log("BREAK:", e.code);
      clearInterval(this.moveInterval);
      this.isMoving = false;
      clearTimeout(this.pushTimeout);
      this.isPushing = false;
      this.state = "normal";
    });
  }
}
