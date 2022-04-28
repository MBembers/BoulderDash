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
  xPos: number;
  yPos: number;
  color: string;
}

export interface ITile {
  type: string;
  color: string;
}

export interface IBoulder {
  color: string;
}

export interface ITilePalette {
  clear: string;
  dirt: string;
  wall: string;
}

export type Entity = ITile | IBoulder | IPlayer | string;
