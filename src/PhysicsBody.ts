import Tile from "./Tile";
import { Entity, IPhysicsBody } from "./types";
import {
  getCornerNeighbours,
  getNeighbours,
  isPhysicsBody,
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
  constructor(x: number, y: number, board: Entity[][]) {
    this.color = "blue";
    this.type = "physics-body";
    this.sprite = "none";
    this.board = board;
    this.x = x;
    this.y = y;
    this.checkForFall();
  }

  checkForFall() {
    setTimeout(() => {
      let counter = 0;
      if (!this.fallInterval)
        this.fallInterval = setInterval(() => {
          this.isMoving = true;
          let neighbours = getNeighbours(this.x, this.y, this.board);
          let moved = false;
          for (let neighbour of neighbours) {
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
            clearInterval(this.fallInterval);
            this.fallInterval = undefined;
            this.isMoving = false;
          }
          counter++;
        }, 1000 / 8);
    }, 50);
  }
}
