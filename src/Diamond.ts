import Boulder from "./Boulder";
import PhysicsBody from "./PhysicsBody";
import Tile from "./Tile";
import { IDiamond, Entity } from "./types";

export default class Diamond extends PhysicsBody implements IDiamond {
  points: number;
  constructor(x: number, y: number, board: Entity[][], ready = true) {
    super(x, y, board, ready);
    this.type = "diamond";
    this.color = "pink";
    this.sprite = "diamond0";
    this.points = 1;
    if (!this.ready) {
      this.sprite = "clear";
      this.type = "diamond";
    }
    this.mwallFunc = (neighbour: Tile) => {
      let boulder = new Boulder(neighbour.x, neighbour.y + 1, this.board);
      this.board[neighbour.y + 1][neighbour.x] = boulder;
      boulder.checkForFall();
    };
  }
}
