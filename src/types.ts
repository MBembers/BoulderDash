import Player from "./Player";

export interface IGame {
  canvasWidth: number;
  canvasHeight: number;
  tileWidth: number;
  tileHeight: number;
  xTiles: number; // number of tiles
  yTiles: number;
  boardWidth: number; // real size in pixels
  boardHeight: number;
  canvasHtml: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  board: string[][];
  playerPosX: number;
  playerPosY: number;
  canMove: boolean;
  cameraX: number;
  cameraY: number;
  cameraDestX: number;
  cameraDestY: number;
  cameraSpeed: number; // pixels per tick CHANGE THAT
  player: Player;

  testCounter: number;
}

export interface IPlayer {
  x: number;
  y: number;
  type: string;
  color: string;
  sprite: string;
  board: Entity[][];
}

export interface ITile {
  x: number;
  y: number;
  type: string;
  color: string;
  sprite: string;
}

export interface IBoulder extends IPhysicsBody {
  color: string;
  sprite: string;
}

export interface IDiamond extends IPhysicsBody {
  points: number;
}

export interface IPhysicsBody {
  x: number;
  y: number;
  color: string;
  sprite: string;
  board: Entity[][];
  type: string;
  // fallInterval: NodeJS.Timer;
}

export interface IEnemy {
  x: number;
  y: number;
  color: string;
  sprite: string;
  board: Entity[][];
  type: string;
}

export interface ITilePalette {
  clear: string;
  dirt: string;
  wall: string;
  boulder: string;
}

export interface IVelocity {
  left: number;
  right: number;
  up: number;
  down: number;
}

export type Entity = ITile | IPhysicsBody | IPlayer | IEnemy;
