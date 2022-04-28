import Boulder from "./Boulder";
import { Entity } from "./types";

export function getNeighbours(
  x: number,
  y: number,
  board: Entity[][]
): Entity[] {
  return [board[y + 1][x], board[y][x + 1], board[y][x - 1], board[y - 1][x]];
}

export function getCornerNeighbours(
  x: number,
  y: number,
  board: Entity[][]
): Entity[] {
  return [
    board[y + 1][x],
    board[y][x + 1],
    board[y][x - 1],
    board[y - 1][x],
    board[y + 1][x + 1],
    board[y - 1][x - 1],
    board[y + 1][x - 1],
    board[y - 1][x + 1],
  ];
}

export function isBoulder(entity: Entity): entity is Boulder {
  return entity.type === "boulder";
}
