const GARDEN_BACKGROUND = 130;

class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameContainer = document.querySelector("#game-container");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameOverScreen = document.querySelector("#game-end");
    this.width = 700;
    this.height = 500;

    this.player;
    this.lives = 15;
    this.score = 0;
    this.isGameOver = false;

    this.framesPerSeconds = 1000 / 60;
    this.currentFrame = 0;

    this.enemies = [];
    this.bullets = [];
  }
  start() {
    this.startScreen.style.display = "none";
    this.gameOverScreen.style.display = "none";
    this.gameContainer.style.display = "flex";

    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.height}px`;

    this.player = new Player(this.gameScreen);
    //
    this.player.game = this;
    //
    this.enemies.push(new Enemy(this.gameScreen));
    this.gameLoop();
  }
  addBullet(startPositionX, startPositionY) {
    const bullet = new Bullet(this.gameScreen, startPositionX, startPositionY);
    this.bullets.push(bullet);
  }
  gameLoop() {
    const gameId = setInterval(() => {
      this.currentFrame += 1;
      this.player.render();

      if (this.currentFrame % 100 === 0) {
        this.enemies.push(new Enemy(this.gameScreen));
      }
      const nextEnemies = [];
      let nextBullets = [];

      this.enemies.forEach((enemy) => {
        const nextBulletsTemp = [];
        let wasEnemyHit = false
        enemy.render();
        this.bullets.forEach((bullet) => {
          bullet.render();
          if (bullet.didCollide(enemy)) {
            console.log("Hit");
            enemy.element.remove();
            bullet.remove();
            wasEnemyHit = true
          }
          if (bullet.isOffScreen()) {
            bullet.remove();
          } else {
            nextBulletsTemp.push(bullet);
          }
        });
        nextBullets = nextBulletsTemp
        if (this.player.didCollide(enemy) || enemy.left < -25) {
          console.log("Crash");
          this.lives -= 1;
          if (this.lives < 0) {
            this.isGameOver = true;
          }
          enemy.element.remove();
        } else if (enemy.left < this.gameScreen.clientWidth && !wasEnemyHit) {
          nextEnemies.push(enemy);
        } else {
          enemy.element.remove();
        }
      });

      this.bullets = nextBullets;
      this.enemies = nextEnemies;

      document.querySelector("#lives").innerText = this.lives;
      document.querySelector("#score").innerText = this.score;

      if (this.isGameOver) {
        clearInterval(gameId);
        this.gameContainer.style.display = "none";
        this.gameOverScreen.style.display = "flex";
        this.player.element.remove();
        this.enemies.forEach((enemy) => enemy.element.remove());
      }
    }, this.framesPerSeconds);
  }
}
