import { Canvas, Calc } from '../src'

const GRAVITY = 0.03

class Ball {
  constructor(ms) {
    this.ms = ms
    this.pos = Calc.createVector(40, 150)
    this.vel = Calc.createVector()
    this.acc = Calc.createVector(0.1, 0.3)
    this.r = 30

    // this.pos.limit(undefined, ms.obstacle.y - this.r)
  }

  update() {
    this.acc.add(0, GRAVITY)
    this.vel.add(this.acc.x, this.acc.y)
    this.pos.add(this.vel.x, this.vel.y)
  }

  render() {
    const { ms, pos: { x, y }, r } = this
    ms.arc({ x, y, r, color: 'red' })
  }
}

class Obstacle {
  constructor(ms, x, y) {
    this.ms = ms
    this.x = x
    this.y = y
    this.width = ms.canvas.width
    this.height = 120
  }

  render() {
    const { ms, x, y, width, height } = this
    ms.rect({ x, y, width, height });
  }
}

class Obstacles extends Canvas {
  constructor() {
    super({ bgColor: '#BADA55', fps: 60, hook: '.main' })
    this.obstacles = []
    this.ball = new Ball(this)

    this.createObstacles()

    this.init()
  }

  createObstacles() {
    this.obstacles.push(new Obstacle(this, 0, this.canvas.height - 120))
    this.obstacles.push(new Obstacle(this, 110, 160))
  }

  render(time) {
    const { pos, r } = this.ball

    for (const obstacle of this.obstacles) {
      const { x, y, width, height } = obstacle

      // Hits obstacle
      if (Calc.circleRectangleCollide(pos.x, pos.y, r, x, y, width, height)) {
        this.ball.vel.mult(0, -1)
        this.ball.acc.sub(0, 0.2)

        // Todo: for each hit, loos acc and vel and finally stop

      }

      obstacle.render()
    }
    
    this.ball.render()
    this.ball.update()

    // Ball has lost all velocity and is sitting still ...
    // if (this.ball.vel.y <= 0.1 && this.ball.vel.y > -0.1) {
    //   this.ball.vel.y = 0
    //   this.ball.vel.x = 0
    //   this.ball.acc.mult(0)

    //   this.stopAnimation()
    // }
  }
}

new Obstacles()