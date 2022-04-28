import { TilePalette } from "./consts";
import Tile from "./Tile";
import { IBoulder, ITilePalette, Entity } from "./types";
import { getCornerNeighbours, getNeighbours, isBoulder } from "./utils";

export default class Boulder implements IBoulder {
  x: number;
  y: number;
  color: string;
  type: string;
  board: Entity[][];
  sprite: string;
  fallInterval: NodeJS.Timer;
  constructor(x: number, y: number, board: Entity[][]) {
    this.type = "boulder";
    this.color = TilePalette[this.type as keyof ITilePalette];
    this.board = board;
    this.x = x;
    this.y = y;
    this.sprite = "boulder.png";
  }

  checkForFall() {
    setTimeout(() => {
      let counter = 0;
      if (!this.fallInterval)
        this.fallInterval = setInterval(() => {
          let neighbours = getNeighbours(this.x, this.y, this.board);
          let moved = false;
          for (let neighbour of neighbours) {
            if (
              (neighbour.y > this.y || // is below
                (neighbour.y === this.y && // is the same y
                  this.board[neighbour.y + 1][neighbour.x].type === "clear" &&
                  this.board[this.y + 1][this.x].type === "boulder")) && // the same x and below is clear
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
                if (isBoulder(entity)) {
                  entity.checkForFall();
                }
              }

              this.x = neighbour.x;
              this.y = neighbour.y;
              break;
            }
          }
          if (!moved && counter > 1) {
            clearInterval(this.fallInterval);
            this.fallInterval = undefined;
          }
          counter++;
        }, 1000 / 8);
    }, 50);
  }
}
