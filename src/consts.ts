import { ITilePalette, IVelocity } from "./types";

export const TileType = {
  clear: "clear",
  dirt: "dirt",
  wall: "wall",
};

export const TilePalette: ITilePalette = {
  clear: "#555555",
  dirt: "hsl(30, 35%, 35%)",
  wall: "hsl(30, 0%, 80%)",
  twall: "hsl(30, 0%, 50%)",
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

export const testColors: string[] = [
  "hsl(40, 40%, 30%)",
  "hsl(20, 5%, 20%)",
  "hsl(50, 30%, 60%)",
  "hsl(10, 30%, 20%)",
  "hsl(70, 20%, 30%)",
  "hsl(160, 30%, 20%)",
];

export const playerDeath: string[] = [
  "death1",
  "death2",
  "death1",
  "death0",
  "clear",
];

export const caves: string = "abcdefghijklmnop";

export const spritesheetCoords = {
  player: [32 * 0, 32 * 0],
  death0: [32 * 1, 32 * 0],
  death1: [32 * 2, 32 * 0],
  death2: [32 * 3, 32 * 0],
  empty0: [32 * 4, 32 * 0],
  empty1: [32 * 5, 32 * 0],
  noise0: [32 * 6, 32 * 0],
  noise1: [32 * 7, 32 * 0],
  empty2: [32 * 8, 32 * 0],
  white: [32 * 9, 32 * 0],

  blink0: [32 * 0, 32 * 1],
  blink1: [32 * 1, 32 * 1],
  blink2: [32 * 2, 32 * 1],
  blink3: [32 * 3, 32 * 1],
  blink4: [32 * 4, 32 * 1],
  blink5: [32 * 5, 32 * 1],
  blink6: [32 * 6, 32 * 1],
  blink7: [32 * 7, 32 * 1],
  dwLg: [32 * 8, 32 * 1],
  dyLg: [32 * 9, 32 * 1],

  foot0: [32 * 0, 32 * 2],
  foot1: [32 * 1, 32 * 2],
  foot2: [32 * 2, 32 * 2],
  foot3: [32 * 3, 32 * 2],
  foot4: [32 * 4, 32 * 2],
  foot5: [32 * 5, 32 * 2],
  foot6: [32 * 6, 32 * 2],
  foot7: [32 * 7, 32 * 2],
  dwSm: [32 * 8, 32 * 2 + 2],
  dySm: [32 * 9, 32 * 2 + 2],

  footblink0: [32 * 0, 32 * 3],
  footblink1: [32 * 1, 32 * 3],
  footblink2: [32 * 2, 32 * 3],
  footblink3: [32 * 3, 32 * 3],
  footblink4: [32 * 4, 32 * 3],
  footblink5: [32 * 5, 32 * 3],
  footblink6: [32 * 6, 32 * 3],
  footblink7: [32 * 7, 32 * 3],
  starwLg: [32 * 8, 32 * 3],
  staryLg: [32 * 9, 32 * 3],

  runleft0: [32 * 0, 32 * 4],
  runleft1: [32 * 1, 32 * 4],
  runleft2: [32 * 2, 32 * 4],
  runleft3: [32 * 3, 32 * 4],
  runleft4: [32 * 4, 32 * 4],
  runleft5: [32 * 5, 32 * 4],
  runleft6: [32 * 6, 32 * 4],
  runleft7: [32 * 7, 32 * 4],
  oparwSm: [32 * 8, 32 * 4],
  oparySm: [32 * 9, 32 * 4],
  cparwSm: [32 * 8, 32 * 4 + 16],
  cparySm: [32 * 9, 32 * 4 + 16],

  runright0: [32 * 0, 32 * 5],
  runright1: [32 * 1, 32 * 5],
  runright2: [32 * 2, 32 * 5],
  runright3: [32 * 3, 32 * 5],
  runright4: [32 * 4, 32 * 5],
  runright5: [32 * 5, 32 * 5],
  runright6: [32 * 6, 32 * 5],
  runright7: [32 * 7, 32 * 5],
  starwSm: [32 * 8, 32 * 5],
  starySm: [32 * 9, 32 * 5],

  clear: [32 * 5, 32 * 15],
  twall: [32 * 1, 32 * 6],
  ltwall: [32 * 1, 32 * 6],
  otwall: [32 * 2, 32 * 6],
  wall: [32 * 3, 32 * 6],
  mwall0: [32 * 4, 32 * 6],
  mwall1: [32 * 5, 32 * 6],
  mwall2: [32 * 6, 32 * 6],
  mwall3: [32 * 7, 32 * 6],
  empty3: [32 * 8, 32 * 6],
  empty4: [32 * 9, 32 * 6],

  boulder: [32 * 0, 32 * 7],
  dirt: [32 * 1, 32 * 7],
  susdiamond: [32 * 2, 32 * 7],
  susDeath: [32 * 3, 32 * 7],
  bfdeath0: [32 * 4, 32 * 7],
  bfdeath1: [32 * 5, 32 * 7],
  bfdeath2: [32 * 6, 32 * 7],
  bfdeath3: [32 * 7, 32 * 7],
  empty5: [32 * 8, 32 * 7],
  empty6: [32 * 9, 32 * 7],

  amoeba0: [32 * 0, 32 * 8],
  amoeba1: [32 * 1, 32 * 8],
  amoeba2: [32 * 2, 32 * 8],
  amoeba3: [32 * 3, 32 * 8],
  amoeba4: [32 * 4, 32 * 8],
  amoeba5: [32 * 5, 32 * 8],
  amoeba6: [32 * 6, 32 * 8],
  amoeba7: [32 * 7, 32 * 8],

  firefly0: [32 * 0, 32 * 9],
  firefly1: [32 * 1, 32 * 9],
  firefly2: [32 * 2, 32 * 9],
  firefly3: [32 * 3, 32 * 9],
  firefly4: [32 * 4, 32 * 9],
  firefly5: [32 * 5, 32 * 9],
  firefly6: [32 * 6, 32 * 9],
  firefly7: [32 * 7, 32 * 9],

  diamond0: [32 * 0, 32 * 10],
  diamond1: [32 * 1, 32 * 10],
  diamond2: [32 * 2, 32 * 10],
  diamond3: [32 * 3, 32 * 10],
  diamond4: [32 * 4, 32 * 10],
  diamond5: [32 * 5, 32 * 10],
  diamond6: [32 * 6, 32 * 10],
  diamond7: [32 * 7, 32 * 10],
  butterfly0: [32 * 0, 32 * 11],
  butterfly1: [32 * 1, 32 * 11],
  butterfly2: [32 * 2, 32 * 11],
  butterfly3: [32 * 3, 32 * 11],
  butterfly4: [32 * 4, 32 * 11],
  butterfly5: [32 * 5, 32 * 11],
  butterfly6: [32 * 6, 32 * 11],
  butterfly7: [32 * 7, 32 * 11],

  colonwSm: [32 * 8, 32 * 13],
  colonySm: [32 * 9, 32 * 13],
  semiwSm: [32 * 8, 32 * 13 + 16],
  semiySm: [32 * 9, 32 * 13 + 16],

  wSm0: [32 * 8, 32 * 8 + 1],
  ySm0: [32 * 9, 32 * 8 + 1],
  wLg0: [32 * 0, 32 * 12],
  yLg0: [32 * 1, 32 * 12],

  wSma: [32 * 8, 32 * 16 + 18],
  ySma: [32 * 9, 32 * 16 + 18],
};
