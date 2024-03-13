import { TilePalette } from "./consts";
import Diamond from "./Diamond";
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
	fallInterval: NodeJS.Timeout;
	constructor(x: number, y: number, board: Entity[][]) {
		super(x, y, board);
		this.type = "boulder";
		this.color = TilePalette[this.type as keyof ITilePalette];
		this.sprite = "boulder";
		this.mwallFunc = (neighbour: Tile) => {
			let diamond = new Diamond(neighbour.x, neighbour.y + 1, this.board);
			this.board[neighbour.y + 1][neighbour.x] = diamond;
			diamond.checkForFall();
		};
	}
}
