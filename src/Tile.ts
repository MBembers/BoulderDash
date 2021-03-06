import { TilePalette, TileType } from "./consts";
import { Entity, ITile, ITilePalette } from "./types";

export default class Tile implements ITile {
  x: number;
  y: number;
  type: string;
  color: string;
  sprite: string;
  board: Entity[][];
  animation: number;
  state: string;
  constructor(x: number, y: number, type: string, board: Entity[][]) {
    this.state = "normal";
    this.x = x;
    this.y = y;
    this.type = type;
    this.color = TilePalette[type as keyof ITilePalette];
    this.board = board;
    this.sprite = type;
    if (type === "end") this.sprite = "twall";
    if (type === "mwall") (this.state = "ready"), (this.sprite = "wall");
    this.animation = 0;
  }

  clear() {
    this.type = "clear";
  }

  changeType(type: string) {
    this.type = type;
    this.color = TilePalette[type as keyof ITilePalette];
  }
}
