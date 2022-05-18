import PhysicsBody from "./PhysicsBody";
import { IDiamond, Entity } from "./types";

export default class Diamond extends PhysicsBody implements IDiamond {
  points: number;
  constructor(x: number, y: number, board: Entity[][]) {
    super(x, y, board);
    this.type = "diamond";
    this.color = "pink";
    this.sprite = "diamond0";
    this.points = 1;
  }
}
