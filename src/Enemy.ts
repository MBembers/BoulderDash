import { dirs, velocityX } from "./consts";
import Diamond from "./Diamond";
import Tile from "./Tile";
import { Entity, IEnemy } from "./types";
import {
  getCornerNeighbours,
  getNeighbours,
  isAmoeba,
  isEnemy,
  isPhysicsBody,
  isPlayer,
} from "./utils";

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
  animation: number;

  constructor(x: number, y: number, board: Entity[][], turning: string) {
    this.color = "blue";
    this.type = "enemy";
    this.sprite = "none";
    this.board = board;
    this.x = x;
    this.y = y;
    this.turning = turning;
    this.direction = "down";
  }

  hit() {
    this.animation = 0;

    let neighbours = getCornerNeighbours(this.x, this.y, this.board);
    neighbours.push(this.board[this.y][this.x]);
    for (let neighbour of neighbours) {
      if (neighbour.type !== "twall" && neighbour.type !== "player") {
        if (isAmoeba(neighbour) || isEnemy(neighbour)) neighbour.delete();
        if (this.type === "butterfly")
          this.board[neighbour.y][neighbour.x] = new Diamond(
            neighbour.x,
            neighbour.y,
            this.board,
            false
          );
        else
          this.board[neighbour.y][neighbour.x] = new Tile(
            neighbour.x,
            neighbour.y,
            "death",
            this.board
          );

        this.board[neighbour.y][neighbour.x].sprite = "clear";
      }
    }
  }

  startMoving() {
    this.moveInterval = setInterval(() => {
      for (let e of getNeighbours(this.x, this.y, this.board)) {
        if (isAmoeba(e)) {
          this.delete();
          this.hit();
        }
        if (isPlayer(e)) {
          this.delete();
          e.hit();
        }
      }
      if (this.checkSide(this.turning)) {
        this.turn(this.turning);
        this.move(this.direction);
      } else if (this.checkInDir(this.direction)) {
        this.move(this.direction);
      } else {
        this.turn(this.turning === "left" ? "right" : "left");
      }
      // console.log(this.direction);
    }, 1000 / 8);
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

    this.board[prevY][prevX] = new Tile(prevX, prevY, "clear", this.board);
    this.board[this.y][this.x] = this;

    for (let e of getCornerNeighbours(prevX, prevY, this.board)) {
      if (isPhysicsBody(e)) {
        e.checkForFall();
      }
    }
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

  delete() {
    clearInterval(this.moveInterval);
  }
}
