import { Canvas, Calc } from '../../src/Morningstar'
import { SquareParticle } from '../classes/Particle'

class Circle {
  constructor(morningstar, pos, r, vel, acc, angle, color) {
    this.ctx = morningstar.ctx
    this.ms = morningstar
    this.x = pos.x
    this.y = pos.y
    this.velocity = vel
    this.acceleration = acc
    this.r = r
    this.angle = angle
    this.color = color
  }

  circleCollisionPoint(x1, y1, r1, x2, y2, r2) {
    const collisionPointX = ((x1 * r2) + (x2 * r1)) / (r1 + r2);
    const collisionPointY = ((y1 * r2) + (y2 * r1)) / (r1 + r2);

    return [collisionPointX, collisionPointY]
  }

  collision() {
    for (const circle of this.ms.circles) {
      if (circle === this) break
      if (this.movingCircleCollision(this, circle)) {
        return circle
      }
    }

    return false
  }

  circlesCollide(x1, y1, r1, x2, y2, r2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const radii = r1 + r2;

    return ((dx * dx) + (dy * dy) < radii * radii)
  }

  movingCircleCollision(c1, c2) {
    let combinedRadii,
      overlap,
      xSide,
      ySide,
      s = {},
      p1A = {},
      p1B = {},
      p2A = {},
      p2B = {};

    c1.mass = c1.mass || 1;
    c2.mass = c2.mass || 1;
    c1.vx = c1.x + Math.cos(c1.angle) * c1.velocity
    c1.vy = c1.y + Math.sin(c1.angle) * c1.velocity
    c2.vx = c2.x + Math.cos(c2.angle) * c2.velocity
    c2.vy = c2.y + Math.sin(c2.angle) * c2.velocity

    s.vx = c2.x - c1.x;
    s.vy = c2.y - c1.y;

    s.magnitude = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
    combinedRadii = c1.r + c2.r;

    if (s.magnitude < combinedRadii) {
      overlap = combinedRadii - s.magnitude;
      overlap += 0.3;

      // Normalize vector
      s.dx = s.vx / s.magnitude;
      s.dy = s.vy / s.magnitude;

      s.vxHalf = Math.abs(s.dx * overlap / 2);
      s.vyHalf = Math.abs(s.dy * overlap / 2);

      c1.x > c2.x ? (xSide = 1) : (xSide = -1);
      c1.y > c2.y ? (ySide = 1) : (ySide = -1);

      c1.x = c1.x + s.vxHalf * xSide;
      c1.y = c1.y + s.vyHalf * ySide;

      c2.x = c2.x + s.vxHalf * -xSide;
      c2.y = c2.y + s.vyHalf * -ySide;

      s.lx = s.vy;
      s.ly = -s.vx;

      let dp1 = c1.vx * s.dx + c1.vy * s.dy;
      p1A.x = dp1 * s.dx;
      p1A.y = dp1 * s.dy;

      let dp2 = c1.vx * (s.lx / s.magnitude) + c1.vy * (s.ly / s.magnitude);
      p1B.x = dp2 * (s.lx / s.magnitude);
      p1B.y = dp2 * (s.ly / s.magnitude);

      let dp3 = c2.vx * s.dx + c2.vy * s.dy;
      p2A.x = dp3 * s.dx;
      p2A.y = dp3 * s.dy;

      let dp4 = c2.vx * (s.lx / s.magnitude) + c2.vy * (s.ly / s.magnitude);
      p2B.x = dp4 * (s.lx / s.magnitude);
      p2B.y = dp4 * (s.ly / s.magnitude);

      c1.bounce = {};
      c1.bounce.x = p1B.x + p2A.x;
      c1.bounce.y = p1B.y + p2A.y;

      c2.bounce = {};
      c2.bounce.x = p1A.x + p2B.x;
      c2.bounce.y = p1A.y + p2B.y;

      const vx = c1.bounce.x / c1.mass;
      const vy = c1.bounce.y / c1.mass;
      const vx2 = c2.bounce.x / c2.mass;
      const vy2 = c2.bounce.y / c2.mass;
      const deltaX = vx - c1.x;
      const deltaY = vy - c1.y;
      const deltaX2 = vx2 - c2.x;
      const deltaY2 = vy2 - c2.y;
      c2.angle = Math.atan2(deltaY, deltaX);
      c1.angle = Math.atan2(deltaY2, deltaX2);

      return true;
    }
  }

  update() {
    const { ms, x, y, r: r } = this
    const collidedCircle = this.collision()

    if (collidedCircle) {
      const { x: x2, y: y2, r: r2 } = collidedCircle
      console.log('hit')

      // EXPLODE
      const [collisionX, collisionY] = this.circleCollisionPoint(x, y, r, x2, y2, r2)
      ms.createParticles(collisionX, collisionY)

      collidedCircle.r = collidedCircle.r / 2
      this.r = this.r / 2

      // this.ms.stopAnimation()
    }
  }

  reflectionAngleLeftRight(angle) {
    return Math.PI - angle
  }

  reflectionAngleTopBottom(angle) {
    return -angle
  }

  render() {
    const { x, y, r: r, velocity, angle } = this
    this.x = x + Math.cos(angle) * velocity
    this.y = y + Math.sin(angle) * velocity

    if (this.x > this.ms.canvas.width - r) {
      this.angle = this.reflectionAngleLeftRight(angle)
    }

    if (this.x < r) {
      this.angle = this.reflectionAngleLeftRight(angle)
    }

    if (this.y > this.ms.canvas.height - r) {
      this.angle = this.reflectionAngleTopBottom(angle)
    }

    if (this.y < r) {
      this.angle = this.reflectionAngleTopBottom(angle)
    }

    this.ms.arc({ x, y, r, color: this.color })
  }
}

class Circles extends Canvas {
  constructor() {
    super({ fps: 60, bgColor: 'rgb(50, 50, 50)', width: window.innerWidth, height: window.innerHeight })

    this.circles = []
    this.particles = []
    this.colors = [
      'rgb(200, 148, 82)',
      'rgb(193, 200, 82)',
      'rgb(134, 200, 82)',
      'rgb(82, 200, 89)',
      'rgb(82, 200, 148)',
      'rgb(82, 193, 200)',
    ]

    this.createCircles()

    this.init()
  }

  bg() {
    var grd = this.ctx.createLinearGradient(0, this.canvas.height, 0, 0);
    grd.addColorStop(0, "#1f3342");
    grd.addColorStop(1, "black");

    this.ctx.fillStyle = grd;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createCircles() {
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Calc.random(10, 20)
      const pos = Calc.createVector(Calc.random(r, this.width - r), Calc.random(r, this.height - r))
      const velocity = Calc.random(5, 10)
      const acceleration = Math.random()
      const color = Calc.random(0, 5)
      this.circles.push(new Circle(this, pos, r, velocity, acceleration, angle, this.colors[color]))
    }
  }

  createParticles(x, y) {
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random()
      const acceleration = Math.random() / 50
      const vx = x + Math.cos(angle) * velocity
      const vy = y + Math.sin(angle) * velocity
      const r = Calc.random(1, 5)

      this.particles.push(new SquareParticle(this, Calc.create3DVector(vx, vy), r, r, 'red', velocity, acceleration, angle))
    }
  }

  render() {
    this.bg()

    for (const circle of this.circles) {
      if(circle.r < 1) {
        this.circles.splice(circle, 1)
        continue
      }

      circle.render()
    }

    for (const circle of this.circles) {
      circle.update(this.circles)
    }

    for (const particle of this.particles) {
      if (particle.alpha <= 0) {
        this.particles.splice(particle, 1)
        continue
      }

      particle.render()
    }
  }
}

new Circles
