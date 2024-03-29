import { playAudio } from "./Audio";
import Boulder from "./Boulder";
import Tile from "./Tile";
import { Entity, IPlayer } from "./types";
import {
	canPlayerMove,
	getCornerNeighbours,
	isBoulder,
	isDiamond,
	isPhysicsBody,
	isTile,
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
	moveInterval: NodeJS.Timeout;
	pushTimeout: NodeJS.Timeout;
	isPushing: boolean;
	move: string;
	state: string;
	animation: number;
	value: number;
	nextValue: number;
	currGoal: number;
	nuts: number;
	isSpaceHeld: boolean;
	livesGiven: number;

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
		this.nextValue = 15;
		this.livesGiven = 0;
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
		this.isSpaceHeld = false;
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
						const boulder = new Boulder(
							newX + xdir,
							this.y,
							this.board
						);
						this.board[this.y][newX + xdir] = boulder;
						boulder.checkForFall();
						playAudio("boulder0");
						if (this.isSpaceHeld)
							this.board[this.y][newX] = new Tile(
								newX,
								this.y,
								"clear",
								this.board
							);
						else this.movePlayer(newX, newY);
					}

					this.isPushing = false;
				}, 500);
			}
		} else {
			if (isDiamond(entity)) {
				playAudio("collect");
				entity.delete();
				this.points += this.value;
				this.diamonds++;
				if (this.currGoal === this.diamonds)
					this.value = this.nextValue;

				this.checkForLife();
			}
			if (entity.type === "end" && this.currGoal > this.diamonds) {
				return;
			}
			// moved
			let tile = this.board[newY][newX];
			if (tile.type === "clear") playAudio("walkclear");
			else if (tile.type === "dirt") playAudio("walkdirt");
			if (this.isSpaceHeld) {
				this.board[newY][newX] = new Tile(
					newX,
					newY,
					"clear",
					this.board
				);
				for (let e of getCornerNeighbours(newX, newY, this.board)) {
					if (isPhysicsBody(e)) {
						e.checkForFall();
					}
				}
			} else this.movePlayer(newX, newY);
		}
		// }
	}

	checkForLife() {
		if (this.points > 500 * (this.livesGiven + 1)) {
			this.livesGiven++;
			this.lives++;
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
		// return;
		playAudio("explode");
		this.animation = 0;
		this.state = "dying";
		this.lives--;

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
			for (let sus of getCornerNeighbours(
				neighbour.x,
				neighbour.y,
				this.board
			)) {
				if (isPhysicsBody(sus)) sus.checkForFall();
			}
		}
	}

	canMove() {
		return (
			!this.isMoving &&
			this.state !== "dying" &&
			this.state !== "loading" &&
			this.state !== "deloading"
		);
	}

	listeners() {
		document.addEventListener("keydown", (e) => {
			if (e.code === "Space") this.isSpaceHeld = true;
			else if (this.canMove()) {
				this.isMoving = true;
				this.moveInterval = setInterval(() => {
					if (
						this.state !== "dying" &&
						this.state !== "deloading" &&
						this.state !== "loading" &&
						this.state !== "spending"
					) {
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
			if (e.code === "Space") this.isSpaceHeld = false;
			else {
				clearInterval(this.moveInterval);
				clearTimeout(this.pushTimeout);
				this.isMoving = false;
				this.isPushing = false;
				if (this.canMove()) {
					this.state = "normal";
				}
			}
		});
	}
}
