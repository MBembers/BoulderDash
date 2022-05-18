import { ITilePalette, IVelocity } from "./types";

export const TileType = {
  clear: "clear",
  dirt: "dirt",
  wall: "wall",
};

export const TilePalette: ITilePalette = {
  clear: "#101010",
  dirt: "hsl(30, 35%, 35%)",
  wall: "hsl(30, 0%, 50%)",
  boulder: "hsl(30, 10%, 69%)",
};

// export const testColors: string[] = [
//   "hsl(40, 40%, 30%)",
//   "hsl(20, 5%, 20%)",
//   "hsl(50, 30%, 60%)",
//   "hsl(10, 30%, 20%)",
//   "hsl(70, 20%, 30%)",
//   "hsl(160, 30%, 20%)",
// ];

export const velocityX: IVelocity = {
  left: -1,
  right: 1,
  up: 0,
  down: 0,
};

export const velocityY: IVelocity = {
  left: 0,
  right: 0,
  up: -1,
  down: 1,
};

export const dirs: string[] = ["up", "right", "down", "left"];
