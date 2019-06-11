export class Particle {
  constructor(morningstar, position, velocity, acceleration, angle) {
    this.ctx = morningstar.ctx
    this.ms = morningstar
    this._position = position
    this.velocity = velocity
    this.acc = acceleration
    this.alpha = 1
    this.angle = angle
  }

  setColor(color) {
    return color
  }

  set position(position) {
    const { z } = position
    if (z > 5) {
      position.z = 3
    }
    this._position = position
  }

  get position() {
    return this._position
  }
}

export class SquareParticle extends Particle {
  constructor(morningstar, position, width, height, color, velocity, acceleration, angle) {
    super(morningstar, position, velocity, acceleration, angle)
    this.width = width
    this.height = height
    this.color = color
  }

  render() {
    const { position, width, height, color, alpha, angle, velocity } = this
    this.ms.rect({ ...position, width, height, color: `rgba(100, 100, 0, ${alpha})` })
    this.alpha -= 0.01

    this.position.x = this.position.x + Math.cos(angle) * velocity
    this.position.y = this.position.y + Math.sin(angle) * velocity

    this.velocity += this.acc
  }
}

export class CircleParticle extends Particle {
  constructor(morningstar, position, r, velocity, acceleration, angle) {
    super(morningstar, position, velocity, acceleration, angle)
    this.r = r
  }

  render(time) {
    const { position, r, alpha, angle, velocity } = this
    const radius = Math.sin(time / 200) + r

    this.ms.arc({ ...position, r: radius, color: `rgba(255, 100, 0, ${alpha})` })
    this.alpha -= 0.01

    this.position.x = this.position.x + Math.cos(angle) * velocity
    this.position.y = this.position.y + Math.sin(angle) * velocity

    this.velocity += this.acc
  }
}