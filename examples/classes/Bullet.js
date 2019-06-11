class Bullet {
  constructor(ms, pos, r) {
    this.ms = ms
    this.r = r
    this.x = pos.x
    this.y = pos.y
    this.velocity = 10
  }

  destroy() {
    this.ms.bullets.splice(this, 1)
  }

  render() {
    const { ms, x, y, r } = this
    ms.arc({ x, y, r, color: 'red' })
    this.x -= this.velocity
  }
}
