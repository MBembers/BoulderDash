import Boulder from "./Boulder";
import Tile from "./Tile";
import { Entity, IPlayer } from "./types";
import {
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
  isMoving: boolean;
  moveInterval: NodeJS.Timer;
  pushTimeout: NodeJS.Timeout;
  isPushing: boolean;

  constructor(x: number, y: number, board: Entity[][]) {
    this.x = x;
    this.y = y;
    this.color = "red";
    this.type = "player";
    this.sprite = "none";
    this.board = board;
    this.points = 0;
    this.isMoving = false;
    this.isPushing = false;
    this.listeners();
  }

  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  checkMove(newX: number, newY: number) {
    let entity = this.board[newY][newX];
    if (
      entity.type === "wall" ||
      (isPhysicsBody(entity) && entity.isMoving === true)
    ) {
      return;
    }
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
        this.points++;
        document.title = this.points + " pts";
      }
      // moved
      this.movePlayer(newX, newY);
    }
  }

  movePlayer(newX: number, newY: number) {
    let prevX = this.x;
    let prevY = this.y;
    this.board[this.y][this.x] = new Tile(this.x, this.y, "clear", this.board);
    this.setPos(newX, newY);
    this.board[this.y][this.x] = this;

    for (let e of getCornerNeighbours(prevX, prevY, this.board)) {
      if (isPhysicsBody(e)) {
        e.checkForFall();
      }
    }
  }

  listeners() {
    document.addEventListener("keydown", (e) => {
      // console.log(e.code);
      if (!this.isMoving) {
        this.isMoving = true;
        this.moveInterval = setInterval(() => {
          if (e.code === "ArrowRight") this.checkMove(this.x + 1, this.y);
          if (e.code === "ArrowLeft") this.checkMove(this.x - 1, this.y);
          if (e.code === "ArrowUp") this.checkMove(this.x, this.y - 1);
          if (e.code === "ArrowDown") this.checkMove(this.x, this.y + 1);
        }, 1200 / 10);
      }
    });
    document.addEventListener("keyup", (e) => {
      // console.log("BREAK:", e.code);
      clearInterval(this.moveInterval);
      this.isMoving = false;
      clearTimeout(this.pushTimeout);
      this.isPushing = false;
    });
  }
}
