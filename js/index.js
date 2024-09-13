window.addEventListener("load", () => {
  const startButton = document.querySelector(".start-button");
  const restartGameOverButton = document.querySelector(".gameOver");
  const restartScoreButton = document.querySelector(".yourScore");
  const musicButton = document.querySelector('.music');
musicButton.style.background = `center / contain no-repeat url('../img/music-off.png')`;
  let game;
  let audio = new Audio('/audio/POL-power-man-short.wav')

  function startGame() {
    game = new Game();
    game.start();
  }
  function music () {
    if(audio.paused) {
      musicButton.style.background = `center / contain no-repeat url('../img/music-off.png')`;
      audio.play()
    } else {
      musicButton.style.background = `center / contain no-repeat url('../img/music-on.png')`;
      audio.pause()
    }
    // audio.paused ?  : ;

  }
  //EventListeners
  musicButton.addEventListener('click', music)
  startButton.addEventListener("click", startGame);
  restartGameOverButton.addEventListener("click", startGame);
  restartScoreButton.addEventListener("click", startGame);
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp" || event.code === "KeyW") {
      game.player.directionY = -1;
    }
    if (event.code === "ArrowDown" || event.code === "KeyS") {
      game.player.directionY = 1;
    }
    if (event.code === "KeyB") {
      game.player.shoot();
    }
  });
  document.addEventListener("keyup", (event) => {
    if (
      event.code === "ArrowUp" ||
      event.code === "ArrowDown" ||
      event.code === "KeyW" ||
      event.code === "KeyS"
    ) {
      //make more responsive to click
      game.player.directionY = 0;
    }
  });
});
