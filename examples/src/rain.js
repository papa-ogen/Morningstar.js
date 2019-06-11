class Drop {
  constructor(ms, x, y, x2, y2, distance, angle, velocity) {
    this.ms = ms
    this.x = x
    this.y = y
    this.x2 = x2
    this.y2 = y2
    this.distance = distance
    this.angle = angle
    this.velocity = velocity
  }

  outOfBounds() {
    if(this.y + this.distance > this.ms.canvas.height) {
      this.y = - 50
    }

    if(this.x < 0) {
      this.x = Morningstar.random(0, this.ms.canvas.width)
    }
  }

  update() {
    const { x, y, angle, velocity } = this
    this.x = x + Math.cos(angle) * velocity
    this.y = y + Math.sin(angle) * velocity
  }

  render() {
    const { ms, x, y, distance, angle } = this
    const x2 = x + Math.cos(angle) * distance
    const y2 = y + Math.sin(angle) * distance

    ms.line({ x1: x, y1: y, x2, y2,lineWidth: 0.5 })
  }
}

class Rain extends Morningstar {
  constructor() {
    super({ bgColor: '#BADA55', fps: 60 })
    this.MAX_DROPS = 300
    this.drops = []

    this.init()
  }

  bg() {
    var grd = this.ctx.createLinearGradient(0, this.canvas.height, 0, 0);
    grd.addColorStop(0, "#1f3342");
    grd.addColorStop(1, "black");

    this.ctx.fillStyle = grd;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createDrop() {
    const angle = (Math.random() * (1.7 - 1.8) + 1.8)
    const distance = Morningstar.random(10, 25)
    const x = Morningstar.random(0, this.canvas.width)
    const y = Morningstar.random(0, -100)
    const x2 = x + Math.cos(angle) * distance
    const y2 = y + Math.sin(angle) * distance
    const velocity = Morningstar.random(10, 20)

    this.drops.push(new Drop(this, x, y, x2, y2, distance, angle, velocity))
  }

  createDrops() {
    for (let i = 0; i < 100; i++) {
      this.createDrop()
    }
  }

  render(time) {
    this.bg()

    if(Math.random() > 0.8 && this.drops.length < this.MAX_DROPS) {
      this.createDrop()
    }

    for (const particle of this.drops) {
      particle.render()
    }

    for (const particle of this.drops) {
      particle.update()
      particle.outOfBounds()
    }

    // this.stopAnimation()
  }
}

const rain = new Rain()