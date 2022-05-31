var canPlayFalling = true;
var audioList: HTMLAudioElement[] = new Array();
var sourceMp3 = {
  theme: "./sounds/bd1.mp3",
  boulder0: "./sounds/stone.mp3",
  boulder1: "./sounds/stone_2.mp3",
  diamond0: "./sounds/diamond_1.mp3",
  diamond1: "./sounds/diamond_2.mp3",
  diamond2: "./sounds/diamond_3.mp3",
  diamond3: "./sounds/diamond_4.mp3",
  diamond4: "./sounds/diamond_5.mp3",
  diamond5: "./sounds/diamond_6.mp3",
  diamond6: "./sounds/diamond_7.mp3",
  diamond7: "./sounds/diamond_8.mp3",
  collect: "./sounds/diamond_collect.mp3",
  walkdirt: "./sounds/walk_d.mp3",
  walkclear: "./sounds/walk_e.mp3",
  loading: "./sounds/cover.mp3",
  door: "./sounds/crack.mp3",
  spending: "./sounds/finished.mp3",
  explode: "./sounds/exploded.mp3",
  timeout9: "./sounds/timeout_1.mp3",
  timeout8: "./sounds/timeout_2.mp3",
  timeout7: "./sounds/timeout_3.mp3",
  timeout6: "./sounds/timeout_4.mp3",
  timeout5: "./sounds/timeout_5.mp3",
  timeout4: "./sounds/timeout_6.mp3",
  timeout3: "./sounds/timeout_7.mp3",
  timeout2: "./sounds/timeout_8.mp3",
  timeout1: "./sounds/timeout_9.mp3",
  amoeba: "./sounds/amoeba.mp3",
  mwall: "./sounds/magic_wall.mp3", // eeee
  woosh: "./sounds/whoosh.mp3",
  waash: "./sounds/whaash.mp3",
};
var audioKeys: string[] = Object.keys(sourceMp3);
for (var i of audioKeys) {
  let audio = new Audio();
  let source = document.createElement("source");
  source.src = sourceMp3[i as keyof typeof sourceMp3];
  audio.appendChild(source);
  audio.autoplay = false;
  audio.preload = "auto";
  audio.volume = 0.4;
  audioList.push(audio);
  // audio.addEventListener("canplaythrough", (e) => {
  //   audio_list[i].volume = 0;
  //   audio_list[i].loop = false;
  // });
  audio.load();
}

export function playAudio(name: string) {
  let index = audioKeys.indexOf(name);
  let audio = audioList[index];
  if (["amoeba", "mwall", "theme"].includes(name)) audio.loop = true;
  // if (name === "theme") audio.volume = 0;

  if (["theme", "amoeba", "mwall"].includes(name) && !audio.paused) return;

  if (
    audio.currentTime > 0.1 ||
    name.includes("walk") ||
    audio.ended ||
    audio.paused
  ) {
    if (
      (name.includes("boulder") || name.includes("diamond")) &&
      !canPlayFalling
    ) {
      return;
    }
    audio.currentTime = 0;
    audio.play();
  }
  if (name.includes("boulder") || name.includes("diamond")) {
    canPlayFalling = false;
    setTimeout(() => {
      canPlayFalling = true;
    }, 1000 / 10);
  }
}

export function stopAudio(name: string) {
  let index = audioKeys.indexOf(name);
  let audio = audioList[index];
  audio.pause();
  audio.currentTime = 0;
}

export function stopAll(stopTheme: boolean) {
  for (var i of audioKeys) {
    if (!(i === "theme" && !stopTheme)) stopAudio(i);
  }
}
