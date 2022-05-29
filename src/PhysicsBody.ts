import Tile from "./Tile";
import { Entity, IPhysicsBody } from "./types";
import {
  getCornerNeighbours,
  getNeighbours,
  isEnemy,
  isPhysicsBody,
  isPlayer,
  isSlippery,
} from "./utils";

export default class PhysicsBody implements IPhysicsBody {
  x: number;
  y: number;
  type: string;
  board: Entity[][];
  fallInterval: NodeJS.Timer;
  color: string;
  sprite: string;
  isMoving: boolean;
  timeout: NodeJS.Timeout;
  fallcount: number;
  animation: number;
  ready: boolean;
  constructor(x: number, y: number, board: Entity[][], ready = true) {
    this.color = "blue";
    this.type = "physics-body";
    this.sprite = "none";
    this.board = board;
    this.x = x;
    this.y = y;
    this.fallcount = 0;
    this.animation = 0;
    this.ready = ready;
    // this.checkForFall();
  }

  checkForFall() {
    this.timeout = setTimeout(() => {
      let counter = 0;
      if (!this.fallInterval && this.ready)
        this.fallInterval = setInterval(() => {
          this.isMoving = true;
          let neighbours = getNeighbours(this.x, this.y, this.board);
          let moved = false;
          for (let neighbour of neighbours) {
            if (neighbour.y > this.y) {
              if (
                (isPlayer(neighbour) || isEnemy(neighbour)) &&
                this.fallcount > 0
              )
                neighbour.hit();
            }
            if (
              (neighbour.y > this.y || // is below
                (neighbour.y === this.y && // is the same y
                  this.board[neighbour.y + 1][neighbour.x].type === "clear" &&
                  isSlippery(this.board[this.y + 1][this.x]))) && // below is slippery :DD
              neighbour.type === "clear"
            ) {
              this.board[neighbour.y][neighbour.x] = this;
              this.board[this.y][this.x] = new Tile(
                this.x,
                this.y,
                "clear",
                this.board
              );
              moved = true;
              this.fallcount++;
              for (let entity of getCornerNeighbours(
                this.x,
                this.y,
                this.board
              )) {
                if (isPhysicsBody(entity)) {
                  entity.checkForFall();
                }
              }

              this.x = neighbour.x;
              this.y = neighbour.y;
              break;
            }
          }
          if (!moved && counter >= 0) {
            this.fallcount = 0;
            clearInterval(this.fallInterval);
            this.fallInterval = undefined;
            this.isMoving = false;
          }
          counter++;
        }, 1000 / 8);
    }, 50);
  }

  delete() {
    clearTimeout(this.timeout);
    clearInterval(this.fallInterval);
  }
}
