import { IPlayer } from "./types";

export default class Player implements IPlayer {
  xPos: number;
  yPos: number;
  color: string;

  constructor() {
    this.color = "red";
  }
}
