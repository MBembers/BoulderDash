import { ITilePalette } from "./types";

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

export const testColors: string[] = [
  "hsl(40, 40%, 30%)",
  "hsl(20, 5%, 20%)",
  "hsl(50, 30%, 60%)",
  "hsl(10, 30%, 20%)",
  "hsl(70, 20%, 30%)",
  "hsl(160, 30%, 20%)",
];
