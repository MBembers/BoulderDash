import Amoeba from "./Amoeba";
import Boulder from "./Boulder";
import Diamond from "./Diamond";
import Enemy from "./Enemy";
import PhysicsBody from "./PhysicsBody";
import Player from "./Player";
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

export function isAmoeba(entity: Entity): entity is Amoeba {
  return entity.type === "amoeba";
}

export function isPlayer(entity: Entity): entity is Player {
  return entity.type === "player";
}

export function isPhysicsBody(entity: Entity): entity is PhysicsBody {
  return ["boulder", "diamond", "physics-body"].includes(entity.type);
}

export function isEnemy(entity: Entity): entity is Enemy {
  return ["firefly", "butterfly"].includes(entity.type);
}

export function isSlippery(entity: Entity): boolean {
  return isPhysicsBody(entity) || entity.type === "wall";
}

export function canPlayerMove(entity: Entity): boolean {
  return (
    ["wall", "twall", "mwall", "butterfly", "firefly", "amoeba"].includes(
      entity.type
    ) ||
    (isPhysicsBody(entity) && entity.isMoving === true)
  );
}

export function compareCoords(a: Entity, b: Entity): boolean {
  return a.x === b.x && a.y === b.y;
}
