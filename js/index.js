window.addEventListener("load", () => {
  const startButton = document.querySelector(".start-button");
  const restartButton = document.querySelector(".restart-button");
  // console.log(restartButton)
  let game;
  
  //EventListeners
  startButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", startGame);

 
 
  function startGame() {
    game = new Game();
    game.start();
    console.log(game.tomatoBullet)
  }


  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp" || event.code === "KeyW") {
      game.player.directionY = -1;
    }
    if (event.code === "ArrowDown" || event.code === "KeyS") {
      game.player.directionY = 1;
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
  document.addEventListener('keydown', (event) => {
    if(event.code === 'Space') {
      game.player.shoot();
    } 
  })
});
