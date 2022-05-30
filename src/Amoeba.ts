import Boulder from "./Boulder";
import Diamond from "./Diamond";
import Tile from "./Tile";
import { amobus, Entity, IPhysicsBody } from "./types";
import {
  getCornerNeighbours,
  getNeighbours,
  isEnemy,
  isPhysicsBody,
  isPlayer,
  isSlippery,
} from "./utils";

export default class Amoeba implements IPhysicsBody {
  x: number;
  y: number;
  type: string;
  board: Entity[][];
  growInterval: NodeJS.Timer;
  color: string;
  sprite: string;
  state: boolean;
  timeout: NodeJS.Timeout;
  animation: number;
  isParent: boolean;
  children: Amoeba[];
  constructor(x: number, y: number, board: Entity[][], isParent: boolean) {
    this.color = "green";
    this.type = "amoeba";
    this.sprite = "none";
    this.board = board;
    this.x = x;
    this.y = y;
    this.animation = 0;
    this.isParent = isParent;
    this.children = isParent ? [] : undefined;
    // this.startGrow();
  }

  startGrow() {
    this.growInterval = setInterval(this.grow.bind(this), 1000 / 8);
  }

  grow() {
    let avalCounter = 0;
    let isSurrounded = false;
    if (this.isParent) {
      isSurrounded = true;
      for (let amoeba of this.children) {
        let ans = getNeighbours(amoeba.x, amoeba.y, this.board);
        for (let an of ans) {
          if (["clear", "dirt"].includes(an.type)) {
            isSurrounded = false;
            avalCounter++;
          }
        }
      }
    }

    let neighbours = getNeighbours(this.x, this.y, this.board);
    let chance = 1 / 120;
    if (this.isParent) if (this.children.length === 1) chance = 1 / 50;
    if (avalCounter > 7) chance = 1 / 150;
    if (avalCounter > 10) chance = 1 / 250;
    if (avalCounter > 20) chance = 1 / 400;

    for (let neighbour of neighbours) {
      if (["clear", "dirt"].includes(neighbour.type)) {
        if (!isEnemy(neighbour)) isSurrounded = false;
        if (Math.random() < chance) {
          let newAmoeba = new Amoeba(
            neighbour.x,
            neighbour.y,
            this.board,
            false
          );
          this.board[neighbour.y][neighbour.x] = newAmoeba;
          newAmoeba.startGrow();
        }
      }
    }
    if (this.children)
      for (let amoeba of this.children) {
        if (isSurrounded) {
          amoeba.delete();
          this.board[amoeba.y][amoeba.x] = new Diamond(
            amoeba.x,
            amoeba.y,
            this.board
          );
        }
        if (this.children.length >= 200) {
          amoeba.delete();
          this.board[amoeba.y][amoeba.x] = new Boulder(
            amoeba.x,
            amoeba.y,
            this.board
          );
        }
      }
  }

  delete() {
    clearTimeout(this.timeout);
    clearInterval(this.growInterval);
  }
}
