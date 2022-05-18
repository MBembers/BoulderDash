import { dirs, velocityX } from "./consts";
import Tile from "./Tile";
import { Entity, IEnemy } from "./types";

export default class Enemy implements IEnemy {
  x: number;
  y: number;
  type: string;
  board: Entity[][];
  moveInterval: NodeJS.Timer;
  color: string;
  sprite: string;
  direction: string;
  turning: string;
  isMoving: boolean;

  constructor(x: number, y: number, board: Entity[][], turning: string) {
    this.color = "blue";
    this.type = "enemy";
    this.sprite = "none";
    this.board = board;
    this.x = x;
    this.y = y;
    this.turning = turning;
    this.direction = "up";
    this.startMoving();
  }

  startMoving() {
    this.moveInterval = setInterval(() => {
      if (this.checkSide(this.turning)) {
        this.turn(this.turning);
        this.move(this.direction);
      } else if (this.checkInDir(this.direction)) {
        this.move(this.direction);
      } else {
        this.turn(this.turning === "left" ? "right" : "left");
      }
      console.log(this.direction);
    }, 1000 / 2);
  }

  checkInDir(dir: string): boolean {
    if (dir === "up") {
      if (this.board[this.y - 1][this.x].type === "clear") return true;
    } else if (dir === "right") {
      if (this.board[this.y][this.x + 1].type === "clear") return true;
    } else if (dir === "down") {
      if (this.board[this.y + 1][this.x].type === "clear") return true;
    } else if (dir === "left") {
      if (this.board[this.y][this.x - 1].type === "clear") return true;
    }
    return false;
  }

  move(dir: string) {
    let prevX = this.x;
    let prevY = this.y;

    if (dir === "up") {
      this.y = this.y - 1;
    } else if (dir === "right") {
      this.x = this.x + 1;
    } else if (dir === "down") {
      this.y = this.y + 1;
    } else if (dir === "left") {
      this.x = this.x - 1;
    }

    this.board[this.y][this.x] = this;
    this.board[prevY][prevX] = new Tile(this.x, this.y, "clear", this.board);
  }

  checkSide(turn: string): boolean {
    let iofdir = dirs.indexOf(this.direction);
    turn === "right" ? iofdir++ : iofdir--;
    if (iofdir >= dirs.length) iofdir = 0;
    if (iofdir < 0) iofdir = dirs.length - 1;
    let newDir = dirs[iofdir];
    return this.checkInDir(newDir);
  }

  turn(turn: string) {
    let iofdir = dirs.indexOf(this.direction);
    turn === "right" ? iofdir++ : iofdir--;
    if (iofdir >= dirs.length) iofdir = 0;
    if (iofdir < 0) iofdir = dirs.length - 1;
    this.direction = dirs[iofdir];
  }
}
