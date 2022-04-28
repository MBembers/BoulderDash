import { TilePalette, TileType } from "./consts";
import { ITile, ITilePalette } from "./types";

export default class Tile implements ITile {
  type: string;
  color: string;
  constructor(type: string) {
    this.type = type;
    this.color = TilePalette[type as keyof ITilePalette];
  }

  clear() {
    this.type = "clear";
  }

  changeType(type: string) {
    this.type = type;
    this.color = TilePalette[type as keyof ITilePalette];
  }
}
