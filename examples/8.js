import { Canvas, Calc } from '../src'
import { CircleParticle, SquareParticle } from './classes/Particle'

//  https://cal.cs.umbc.edu/Courses/CS6967-F08/Papers/Reeves-1983-PSA.pdf
/*
-The Fireball
-The Flaming Debris
-The Smoke
-The Shattering of the Object
*/

class Particles extends Canvas {
  constructor() {
    super({ bgColor: '#BADA55', fps: 60, hook: '.main' })
    this.particles = []

    this.mouseClick()

    this.init()
  }

  createParticles(x, y) {
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() > 0.3 ? Math.random() / 2 : Math.random() * 3
      const acceleration = -0.05
      const vx = x + Math.cos(angle) * velocity
      const vy = y + Math.sin(angle) * velocity
      const r = Calc.random(1, 5)

      if (Math.random() > 0.5) {
        this.particles.push(new CircleParticle(this, Calc.create3DVector(vx, vy), r, velocity, acceleration, angle))
      } else {
        this.particles.push(new SquareParticle(this, Calc.create3DVector(vx, vy), r, r, 'red', velocity, acceleration, angle))
      }
    }
  }

  mouseClick() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.mouseX = e.clientX - this.canvasPosition.left
      this.mouseY = e.clientY - this.canvasPosition.top

      this.createParticles(this.mouseX, this.mouseY)
    }, false)
  }

  render(time) {
    for (const particle of this.particles) {
      if (particle.alpha <= 0) {
        this.particles.splice(particle, 1)
        continue
      }

      particle.render(time)
    }
  }
}

new Particles()