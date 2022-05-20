import Boulder from "./Boulder";
import Diamond from "./Diamond";
import PhysicsBody from "./PhysicsBody";
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

export function isDiamond(entity: Entity): entity is Diamond {
  return entity.type === "diamond";
}

export function isPhysicsBody(entity: Entity): entity is PhysicsBody {
  return ["boulder", "diamond", "physics-body"].includes(entity.type);
}

export function isSlippery(entity: Entity): boolean {
  return isPhysicsBody(entity) || entity.type === "platform";
}

export function canPlayerMove(entity: Entity): boolean {
  return (
    ["wall", "twall", "mwall", "butterfly", "firefly"].includes(entity.type) ||
    (isPhysicsBody(entity) && entity.isMoving === true)
  );
}
