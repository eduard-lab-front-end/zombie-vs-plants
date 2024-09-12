window.addEventListener("load", () => {
  const startButton = document.querySelector(".start-button");
  const restartButton = document.querySelector(".restart-button");

  let game;
    
  function startGame() {
    game = new Game();
    game.start();
  }
  
  //EventListeners
  startButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", startGame);
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp" || event.code === "KeyW") {
      game.player.directionY = -1;
    }
    if (event.code === "ArrowDown" || event.code === "KeyS") {
      game.player.directionY = 1;
    }
    if(event.code === 'KeyB') {
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
  