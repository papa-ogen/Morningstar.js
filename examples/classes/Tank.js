class Tank {
  constructor(ms, x, y, width, height) {
    this.ms = ms
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.turret = {
      x: this.x - 30,
      y: this.y + this.height / 2 - 10,
      width: 30,
      height: 20
    }
    this.velocity = 10
    this.isMoving = false
    this.dir = 1

  }

  shoot() {
    const { ms, x, y } = this.turret
    const r = 10
    const bullet = new Bullet(this.ms, { x, y: y + r }, r)
    this.ms.bullets.push(bullet)
    this.ms.barrelDebree(x, y + r)
  }

  render() {
    const { ms, x, y, width, height, isMoving, dir, velocity } = this

    if (isMoving) {
      if (dir === 1 && y > 0) {
        this.y -= velocity
        this.turret.y -= velocity
      } else if (dir === 0 && y + height < ms.canvas.height) {
        this.y += velocity
        this.turret.y += velocity
      }
    }

    ms.rect({ x, y, width, height, color: '#fff' })
    ms.rect({ x: this.turret.x, y: this.turret.y, width: this.turret.width, height: this.turret.height, color: '#fff' })
  }
}
