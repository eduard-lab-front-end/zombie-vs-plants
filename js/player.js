class Player {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.width = 70;
    this.height = 100;
    this.left = 10;
    this.top = gameScreen.clientHeight / 2;

    this.directionY = 0;
    this.speed = 2;

    this.element = document.createElement("img");
    this.element.src = "../img/hero-one.png";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.width}px`;

    this.element.style.position = `absolute`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }

  render() {
    this.move();
    // this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    this.top += this.directionY * this.speed;
    if (this.top < GARDEN_BACKGROUND) {
      this.top = GARDEN_BACKGROUND; 
    }
    if (this.top > this.gameScreen.clientHeight - this.height - 70) {
      this.top = this.gameScreen.clientHeight - this.height - 70;
    }
  }
  //
  shoot() {
    const bulletPositionX = this.left + this.width; 
    const bulletPositionY = this.top + this.height / 2; 
    if (this.game) {
      this.game.addBullet(bulletPositionX, bulletPositionY); 
    }
  }
  didCollide(enemy) {
    const playerRect = this.element.getBoundingClientRect();
    const enemyRect = enemy.element.getBoundingClientRect();
    return (
      playerRect.left < enemyRect.right &&
      playerRect.right > enemyRect.left &&
      playerRect.top < enemyRect.bottom &&
      playerRect.bottom > enemyRect.top
    );
  }
}
