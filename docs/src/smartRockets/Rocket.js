class Rocket {
  constructor(ms, dna) {
    this.ms = ms
    this.width = 30
    this.height = 10
    this.pos = Morningstar.create2DVector(this.ms.canvas.width / 2 - this.width, this.ms.canvas.height - this.height - 10)
    this.velocity = Morningstar.create2DVector()
    this.acceleration = Morningstar.create2DVector()
    this.alpha = 0.8
    this.angle = 0
    this.lifespan = 200
    this.dna = dna || new DNA(this.lifespan)
    this.hasCrashed = false
    this.isCompleted = false
    this.fitness = 0
    this.count = 0
  }

  calcFitness() {
    this.fitness = Morningstar.getDistanceBetween(this.pos.x, this.pos.y, this.ms.target.x, this.ms.target.y);

    if (this.isCompleted) {
      this.fitness *= 10;
    }

    if (this.hasCrashed) {
      this.fitness /= 10;
    }
  }

  applyForce(force) {
    this.acceleration.x += force.x
    this.acceleration.y -= force.y
  }

  heading() {
    const { pos: { x, y }, velocity } = this
    const x2 = x + velocity.x
    const y2 = y + velocity.y

    return Morningstar.getAngleFromVelocity(x, y, x2, y2)
  }

  isOutOfBounds() {
    const { ms, pos: { x, y }, width, height } = this
    return x + width > ms.width || x <= 0 || y <= 0 || y + height >= ms.height
  }

  update() {
    const { velocity, acceleration, count, dna: { genes } } = this

    this.applyForce(genes[count])
    this.pos.x += velocity.x
    this.pos.y += velocity.y

    this.velocity.x += acceleration.x
    this.velocity.y += acceleration.y

    this.angle = this.heading()

    this.acceleration.x = 0
    this.acceleration.y = 0

    this.lifespan--
    this.count++
  }

  render() {
    const { ms, pos: { x, y }, width, height, alpha, angle } = this

    ms.rect({ x, y, width, height, color: `rgba(255, 255, 255, ${alpha})`, rotate: angle })
  }
}