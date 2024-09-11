class Enemy {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.width = 85;
    this.height = 110;
    this.left = gameScreen.clientWidth - 100;
    this.bottom = Math.round(Math.random() * 200) + 90;
    
    this.element = document.createElement("img");
    this.element.src = "img/enemy.png";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.width}px`;

    this.element.style.position = `absolute`;
    this.element.style.left = `${this.left}px`;
    this.element.style.bottom = `${this.bottom}px`;

    this.gameScreen.appendChild(this.element);
  }
  render() {
    this.move();
    this.element.style.left = `${this.left}px`;
  }
  move() {
    this.left += -3;
  }
}
