import { TilePalette } from "./consts";
import PhysicsBody from "./PhysicsBody";
import Tile from "./Tile";
import { IBoulder, ITilePalette, Entity } from "./types";
import { getCornerNeighbours, getNeighbours, isBoulder } from "./utils";

export default class Boulder extends PhysicsBody implements IBoulder {
  x: number;
  y: number;
  color: string;
  type: string;
  board: Entity[][];
  sprite: string;
  fallInterval: NodeJS.Timer;
  constructor(x: number, y: number, board: Entity[][]) {
    super(x, y, board);
    this.type = "boulder";
    this.color = TilePalette[this.type as keyof ITilePalette];
    this.sprite = "boulder";
  }
}
