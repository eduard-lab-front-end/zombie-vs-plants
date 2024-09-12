class Bullet {
  constructor(gameScreen, startPositionX, startPositionY) {
    this.gameScreen = gameScreen;
    // this.width = 60;
    // this.height = 30;
    this.left = startPositionX;
    this.top = startPositionY;
    this.display = "none";
    this.speed = 3;

    this.element = document.createElement("div");
    this.element.classList.add('flame-bullet')

    this.element.style.position = `absolute`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;


    this.gameScreen.appendChild(this.element);
  }
  render() {
    this.move();
    this.element.style.left = `${this.left - 10}px`;
    //
    this.element.style.top = `${this.top + 10}px`;
  }
  move() {
    this.left += this.speed;
    // if (this.left > this.gameScreen.clientWidth) {
      // console.log(this.left, 'Left bullet')
      // this.element.remove();
    // } // to fix
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
