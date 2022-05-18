import Enemy from "./Enemy";
import { Entity } from "./types";

export default class Butterfly extends Enemy {
  x: number;
  y: number;
  color: string;
  type: string;
  board: Entity[][];
  sprite: string;
  fallInterval: NodeJS.Timer;
  constructor(x: number, y: number, board: Entity[][]) {
    super(x, y, board, "right");
    this.type = "butterfly";
    this.color = "blue";
    this.sprite = "butterfly0";
  }
}
