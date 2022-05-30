import Enemy from "./Enemy";
import { Entity } from "./types";

export default class Firefly extends Enemy {
  x: number;
  y: number;
  color: string;
  type: string;
  board: Entity[][];
  sprite: string;
  fallInterval: NodeJS.Timer;
  constructor(x: number, y: number, board: Entity[][], direction: string) {
    super(x, y, board, "left");
    this.direction = direction;
    this.type = "firefly";
    this.color = "red";
    this.sprite = "firefly0";
  }
}
