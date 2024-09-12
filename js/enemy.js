const enemies = ['sprite-egg-monster', 'sprite-ghost-monster', 'sprite-zombi', 'sprite-ghost-two', 'sprite-walking-skeleton', 'sprite-angry-ball',  ]

class Enemy {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = gameScreen.clientWidth;
    this.bottom = Math.round(Math.random() * 230) + 230;
    this.randomEnemy = Math.floor(Math.random() * enemies.length)

    this.element = document.createElement("div");
    this.element.classList.add(enemies[this.randomEnemy])
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
