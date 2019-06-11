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

  collision(objects) {
    for (const object of objects) {
      if (object === this) break
      if (this.movingCircleCollision(this, object)) {
        return object
      }
    }

    return false
  }

  circleCollisionPoint(x1, y1, r1, x2, y2, r2) {
    const collisionPointX = ((x1 * r2) + (x2 * r1)) / (r1 + r2);
    const collisionPointY = ((y1 * r2) + (y2 * r1)) / (r1 + r2);

    return [collisionPointX, collisionPointY]
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

  destroy() {
    this.ms.circles.splice(this, 1)
  }

  update(objects) {
    const { ms, x, y, r, color } = this
    const collidedCircle = this.collision(objects)

    if (collidedCircle) {
      const { x: x2, y: y2, r: r2 } = collidedCircle
      const contactPoint = this.ms.create2DVector((x + x2) * 0.5, (y + y2) * 0.5)
      const contactAngle = Math.atan2(x2 - contactPoint.x, y2 - contactPoint.y)

      this.angle = Math.sin(contactAngle)
      collidedCircle.angle = Math.cos(contactAngle)


      // EXPLODE
      const [collisionX, collisionY] = this.circleCollisionPoint(x, y, r, x2, y2, r2)
      ms.createParticles(collisionX, collisionY, color)

      collidedCircle.destroy()
      this.r = this.r / 2

      if (this.r < 1) {
        this.destroy()
      }
    }
  }

  render() {
    const { x, y, r, velocity, angle } = this
    this.x = x + Math.cos(angle) * velocity
    this.y = y + Math.sin(angle) * velocity

    if (this.x > this.ms.canvas.width - r) {
      this.ms.health -= 1
      this.velocity = 0
      this.destroy()
    }

    if (this.y > this.ms.canvas.height - r) {
      this.angle = Morningstar.reflectionAngleTopBottom(angle)
    }

    if (this.y < r) {
      this.angle = Morningstar.reflectionAngleTopBottom(angle)
    }

    this.ms.arc({ x, y, r, color: this.color })
  }
}
