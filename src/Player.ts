import Boulder from "./Boulder";
import Tile from "./Tile";
import { Entity, IPlayer } from "./types";
import {
  canPlayerMove,
  getCornerNeighbours,
  isBoulder,
  isDiamond,
  isPhysicsBody,
} from "./utils";

export default class Player implements IPlayer {
  x: number;
  y: number;
  type: string;
  color: string;
  sprite: string;
  board: Entity[][];
  points: number;
  lives: number;
  diamonds: number;
  isMoving: boolean;
  moveInterval: NodeJS.Timer;
  pushTimeout: NodeJS.Timeout;
  isPushing: boolean;
  move: string;
  state: string;
  animation: number;
  value: number;
  currGoal: number;
  nuts: number;

  constructor(x: number, y: number, board: Entity[][]) {
    this.board = board;
    this.setup(x, y);
    this.listeners();
    this.nuts = 2;
  }

  setup(x: number, y: number) {
    this.levelSetup(x, y);
    this.color = "red";
    this.points = 0;
    this.lives = 3;
    this.value = 10;
  }

  levelSetup(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.type = "player";
    this.sprite = "player";
    this.state = "loading";
    this.move = "none";
    this.isMoving = false;
    this.isPushing = false;
    this.animation = 0;
    this.diamonds = 0;
  }

  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setBoard(board: Entity[][]) {
    this.board = board;
  }

  checkMove(newX: number, newY: number) {
    let entity = this.board[newY][newX];
    if (canPlayerMove(entity)) return;

    if (isBoulder(entity)) {
      if (this.y === newY && !this.isPushing) {
        this.isPushing = true;
        this.pushTimeout = setTimeout(() => {
          const xdir = newX - this.x;
          if (this.board[this.y][newX + xdir].type === "clear") {
            const boulder = new Boulder(newX + xdir, this.y, this.board);
            this.board[this.y][newX + xdir] = boulder;
            boulder.checkForFall();
            this.movePlayer(newX, newY);
          }

          this.isPushing = false;
        }, 700);
      }
    } else {
      if (isDiamond(entity)) {
        entity.delete();
        this.diamonds++;
        this.points += this.value;
        if (this.points % 500 === 0 && this.points > 0) {
          this.lives++;
        }
        document.title = this.lives + " l";
      }
      if (entity.type === "end" && this.currGoal > this.diamonds) {
        return;
      }
      // moved
      this.movePlayer(newX, newY);
    }
  }

  movePlayer(newX: number, newY: number) {
    let prevX = this.x;
    let prevY = this.y;

    this.setPos(newX, newY);
    this.board[this.y][this.x] = this;
    this.board[prevY][prevX] = new Tile(prevX, prevY, "clear", this.board);

    for (let e of getCornerNeighbours(prevX, prevY, this.board)) {
      if (isPhysicsBody(e)) {
        e.checkForFall();
      }
    }
  }

  hit() {
    return;
    this.animation = 0;
    this.state = "dying";
    this.lives--;
    document.title = this.lives + " l";

    let neighbours = getCornerNeighbours(this.x, this.y, this.board);
    neighbours.push(this.board[this.y][this.x]);
    for (let neighbour of neighbours) {
      if (neighbour.type !== "twall")
        this.board[neighbour.y][neighbour.x] = new Tile(
          neighbour.x,
          neighbour.y,
          "death",
          this.board
        );
      this.board[neighbour.y][neighbour.x].sprite = "clear";
    }
  }

  canMove() {
    return !this.isMoving && this.state !== "dying" && this.state !== "loading";
  }

  listeners() {
    document.addEventListener("keydown", (e) => {
      // console.log(e.code);
      if (this.canMove()) {
        this.isMoving = true;
        this.moveInterval = setInterval(() => {
          if (this.state !== "dying") {
            if (e.code === "ArrowRight") {
              this.checkMove(this.x + 1, this.y);
              this.state = "move";
              this.move = "runright";
            }
            if (e.code === "ArrowLeft") {
              this.checkMove(this.x - 1, this.y);
              this.state = "move";
              this.move = "runleft";
            }
            if (e.code === "ArrowUp") {
              this.checkMove(this.x, this.y - 1);
              this.state = "move";
              if (this.move === "none") this.move = "runright";
            }
            if (e.code === "ArrowDown") {
              this.checkMove(this.x, this.y + 1);
              this.state = "move";
              if (this.move === "none") this.move = "runright";
            }
          }
        }, 1000 / 8);
      }
    });
    document.addEventListener("keyup", (e) => {
      clearInterval(this.moveInterval);
      clearTimeout(this.pushTimeout);
      this.isMoving = false;
      this.isPushing = false;
      if (this.canMove()) {
        this.state = "normal";
      }
    });
  }
}
