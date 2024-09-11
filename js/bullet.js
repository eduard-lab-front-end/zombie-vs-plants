class Bullet {
  constructor(gameScreen, startPositionX, startPositionY) {
    this.gameScreen = gameScreen;
    this.width = 30;
    this.height = 30;
    this.left = startPositionX;
    this.top = startPositionY;
    this.display = "none";

    this.directionX = 0;
    this.speed = 1;

    this.element = document.createElement("img");
    this.element.src = "img/tomato-bullet.png";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.width}px`;

    this.element.style.position = `absolute`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.transform = " scale(-1, 1)";

    this.gameScreen.appendChild(this.element);
  }
  render() {
    this.move();
    this.element.style.left = `${this.left}px`;
    //
    this.element.style.top = `${this.top - 33}px`;
  }
  move() {
    this.left += this.speed;
    if (this.left > this.gameScreen.clientWidth) {
      this.remove();
    }
  }
  didCollide(enemy) {
    const bullet = this.element.getBoundingClientRect();
    const enemyRect = enemy.element.getBoundingClientRect();
    return (
      bullet.left < enemyRect.right &&
      bullet.right > enemyRect.left &&
      bullet.top < enemyRect.bottom &&
      bullet.bottom > enemyRect.top
    );
  }
  isOffScreen() {
    return this.left > this.gameScreen.clientWidth;
  }
  remove() {
    this.element.remove();
  }
}
