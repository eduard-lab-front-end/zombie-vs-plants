const GARDEN_BACKGROUND = 270;
const GAME_BACKGROUNDS = ['bamboo-bridge-bg', 'castle-bridge-bg', 'forest-bridge-bg', 'sky-bridge-bg']

class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameContainer = document.querySelector("#game-container");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameOverScreen = document.querySelector("#game-end");
    this.width = 800;
    this.height = 800;

    this.player;
    this.lives = 3;
    this.score = 0;
    this.yourRecord = 0;
    this.isGameOver = false;

    this.framesPerSeconds = 1000 / 60;
    this.currentFrame = 0;

    this.randomBackground = Math.floor(Math.random() * GAME_BACKGROUNDS.length)
    this.enemies = [];
    this.bullets = [];
  }
  start() {
    this.startScreen.style.display = "none";
    this.gameOverScreen.style.display = "none";

    this.gameContainer.style.display = "flex";

    this.gameScreen.style.background = `center / contain no-repeat url('../img/${GAME_BACKGROUNDS[this.randomBackground]}.png')`
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.height}px`;

    this.player = new Player(this.gameScreen);
    this.player.game = this;
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
        let wasEnemyHit = false
        enemy.render()
        this.bullets.forEach((bullet) => {
          bullet.render(); 
          //
          if (bullet.didCollide(enemy)) {
            console.log(wasEnemyHit)
            console.log("Hit");
            this.score += 100;
            wasEnemyHit = true;
            enemy.element.remove();
            bullet.remove();
          } else if(bullet.isOffScreen()) {
            bullet.remove();
          } else {
            nextBullets.push(bullet);
          }
          console.log(wasEnemyHit)
          ///
        })
        // this.bullets = nextBullets; // fix it
        if (!wasEnemyHit && this.player.didCollide(enemy) || enemy.left < -25) {
            console.log("Crash");
            this.lives -= 1;
            if (this.lives < 0) {
              this.isGameOver = true;
            }
            enemy.element.remove();
          } else if (enemy.left < this.gameScreen.clientWidth) {
            if(!wasEnemyHit) {
              nextEnemies.push(enemy);
            }
          } else {
            enemy.element.remove();
          }
      })

      document.querySelector("#lives").innerText = this.lives;
      document.querySelector("#score").innerText = this.score;

      if (this.isGameOver) {
        clearInterval(gameId);
        this.gameContainer.style.display = "none";
        if(localStorage.getItem('score') < this.score) {
          console.log('lose')
          console.log(localStorage.getItem('score'))
        } else {
          this.gameOverScreen.style.display = "flex";
        }
        this.player.element.remove();
        this.enemies.forEach((enemy) => enemy.element.remove());
        this.bullets.forEach((bullet) => bullet.element.remove());
        localStorage.setItem('score', this.score)
      }
      this.enemies = nextEnemies;
    }, this.framesPerSeconds);
  }
}
