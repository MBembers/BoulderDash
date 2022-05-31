import Game from "./Game";
document.getElementById("play").addEventListener("click", () => {
  document.getElementById("play").remove();
  var game = new Game();
});
