import { IPlayer } from "./types";

export default class Player implements IPlayer {
  x: number;
  y: number;
  type: string;
  color: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.color = "red";
    this.type = "player";
  }

  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
