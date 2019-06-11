import { Canvas, Calc } from '../src'
import { Tank } from './classes/Tank'
import { Circle } from './classes/Circle'
import { SquareParticle } from './classes/Particle'

class BallsAndTanks extends Canvas {
  constructor() {
    super({ fps: 60, bgColor: 'rgb(50, 50, 50)', width: 800, height: 600, hook: '.main' })

    this.circles = []
    this.bullets = []
    this.particles = []
    this.colors = [
      'rgb(200, 148, 82)',
      'rgb(193, 200, 82)',
      'rgb(134, 200, 82)',
      'rgb(82, 200, 89)',
      'rgb(82, 200, 148)',
      'rgb(82, 193, 200)',
    ]
    this.health = 20

    this.tank = new Tank(
      this,
      this.canvas.width - 30,
      this.canvas.height / 2 - 50,
      50,
      100
    )

    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 38) {
        this.tank.isMoving = true
        this.tank.dir = 1
      }

      if (e.keyCode === 40) {
        this.tank.isMoving = true
        this.tank.dir = 0
      }
    })

    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 32) {
        this.tank.shoot()
      }

      this.tank.isMoving = false

    }, false)

    setInterval(() => {
      this.createCircle()
    }, 1000)

    this.init()
  }

  bg() {
    var grd = this.ctx.createLinearGradient(0, this.canvas.height, 0, 0);
    grd.addColorStop(0, "#1f3342");
    grd.addColorStop(1, "black");

    this.ctx.fillStyle = grd;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createCircle() {
    const angle = 0
    const r = Calc.random(10, 20)
    const pos = Calc.createVector(-r, Calc.random(r, this.height - r))
    const velocity = Calc.random(1, 3)
    const acceleration = Math.random()
    const color = Calc.random(0, 5)
    this.circles.push(new Circle(this, pos, r, velocity, acceleration, angle, this.colors[color]))
  }

  createCircles() {
    for (let i = 0; i < 3; i++) {
      this.createCircle()
    }
  }

  createParticles(x, y, color = 'red') {
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random()
      const acceleration = Math.random() / 50
      const vx = x + Math.cos(angle) * velocity
      const vy = y + Math.sin(angle) * velocity
      const r = Calc.random(1, 5)

      this.particles.push(new SquareParticle(this, Calc.create3DVector(vx, vy), r, r, color, velocity, acceleration, angle))
    }
  }

  barrelDebree(x, y, color = 'red') {
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI;
      const velocity = Math.random()
      const acceleration = Math.random() / 50
      const vx = x + Math.cos(angle) * velocity
      const vy = y + Math.sin(angle) * velocity
      const r = Calc.random(1, 5)

      this.particles.push(new SquareParticle(this, Calc.create3DVector(vx, vy), r, r, color, velocity, acceleration, angle))
    }
  }

  render() {
    this.bg()

    for (const bullet of this.bullets) {
      bullet.render()
    }

    this.tank.render()

    for (const circle of this.circles) {
      circle.render()
    }

    for (const circle of this.circles) {
      circle.update(this.bullets)
    }

    for (const particle of this.particles) {
      if (particle.alpha <= 0) {
        this.particles.splice(particle, 1)
        continue
      }

      particle.render()
    }

    this.text({
      x: 17,
      y: 48,
      fontSize: 44,
      text: `Health: ${this.health}`,
      center: false
    })

    if (this.health> 0) {
      this.text({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        fontSize: 68,
        text: 'Game Over',
      })

      this.stopAnimation()
    }
  }
}

new BallsAndTanks
