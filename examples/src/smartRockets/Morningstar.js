class Morningstar {
  constructor(config = {}) {
    this.width = config.width || 600
    this.height = config.height || 600
    this.bgColor = config.bgColor || '#000'
    this.fps = config.fps || 60

    const c = document.createElement('canvas')
    c.width = this.width
    c.height = this.height
    c.style.background = this.bgColor

    document.body.append(c)

    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext("2d")
    this.canvasPosition = this.canvas.getBoundingClientRect()
    this.stop = false
  }

  startAnimation(stop = false) {
    this.stop = stop
  }

  stopAnimation(stop = true) {
    this.stop = stop
  }

  static getDistanceBetween(x1, x2, y1, y2) {
    const a = x1 - x2;
    const b = y1 - y2;
    
    return Math.sqrt(a * a + b * b);
  }

  static getAngleFromVelocity(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    
    return Math.atan2(deltaY, deltaX);
  }

  static getRadianFromDegree(degrees) {
    return degrees * Math.PI / 180
  }

  static invertAngle(angle) {
    return (angle + Math.PI) % (2 * Math.PI);
  }

  static reflectionAngleLeftRight(angle) {
    return Math.PI - angle
  }

  static reflectionAngleTopBottom(angle) {
    return -angle
  }

  circlesCollide(x1, y1, r1, x2, y2, r2) {
    return Math.abs((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) < (r1 + r2) * (r1 + r2);
  }

  static create2DVector(x = 0, y = 0) {
    return { x, y }
  }

  static create3DVector(x = 0, y = 0, z = 0) {
    return { x, y, z }
  }

  static createRandom2DVector() {
    const randomX = Math.random() > 0.5 ? Math.random() : -Math.random()
    const randomY = Math.random() > 0.5 ? Math.random() : -Math.random()
    return { x: randomX, y: randomY }
  }

  // static createRandom2DVector() {
  //   return {
  //     x: Math.random() > 0.5 ? Math.random() : -Math.random(),
  //     y: Math.random() > 0.5 ? Math.random() : -Math.random()
  //   }
  // }

  static random(min = 0, max = 255) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static createRandom2DRadianVector(radius) {
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    }
  }

  static easingFunctions = {
    // no easing, no acceleration
    linear: function (t) { return t },
    // accelerating from zero velocity
    easeInQuad: function (t) { return t * t },
    // decelerating to zero velocity
    easeOutQuad: function (t) { return t * (2 - t) },
    // acceleration until halfway, then deceleration
    easeInOutQuad: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
    // accelerating from zero velocity 
    easeInCubic: function (t) { return t * t * t },
    // decelerating to zero velocity 
    easeOutCubic: function (t) { return (--t) * t * t + 1 },
    // acceleration until halfway, then deceleration 
    easeInOutCubic: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
    // accelerating from zero velocity 
    easeInQuart: function (t) { return t * t * t * t },
    // decelerating to zero velocity 
    easeOutQuart: function (t) { return 1 - (--t) * t * t * t },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
    // accelerating from zero velocity
    easeInQuint: function (t) { return t * t * t * t * t },
    // decelerating to zero velocity
    easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t },
    // acceleration until halfway, then deceleration 
    easeInOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t }
  }

  static ElasticEasingFunctions = {
    // elastic bounce effect at the beginning
    easeInElastic: function (t) { return (.04 - .04 / t) * Math.sin(25 * t) + 1 },
    // elastic bounce effect at the end
    easeOutElastic: function (t) { return .04 * t / (--t) * Math.sin(25 * t) },
    // elastic bounce effect at the beginning and end
    easeInOutElastic: function (t) { return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1 }
  }

  rect({ x, y, width, height, color, strokeWidth, strokeColor, shadow, rotate }) {
    this.ctx.fillStyle = color;

    if (strokeWidth) {
      this.ctx.strokeWidth = strokeWidth
      this.ctx.strokeStyle = strokeColor;
    }

    if (shadow) {
      this.addShadow(shadow)
    }

    if (rotate) {
      this.ctx.translate(x + width / 2, y + height / 2);
      this.ctx.rotate(rotate);
      this.ctx.fillRect(-width / 2, -height / 2, width, height);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      return
    }

    this.ctx.fillRect(x, y, width, height);
  }

  line({ x1, y1, x2, y2, lineWidth = 1, shadow, color = '#fff' }) {
    this.ctx.beginPath();

    if (shadow) {
      this.addShadow(shadow)
    }

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  arc({ x, y, r, color, strokeWidth, strokeColor }) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, Math.PI * 2, true);

    if (strokeWidth) {
      this.ctx.stroekeWidth = strokeWidth
      this.ctx.strokeStyle = strokeColor
      this.ctx.stroke();
    }

    if (color) {
      this.ctx.fillStyle = color;
      this.ctx.fill();
    }
  }

  addShadow({ offsetX = 2, offsetY = 2, blur = 2, color = 'rgba(0, 0, 0, 0.5)' }) {
    this.ctx.shadowOffsetX = offsetX;
    this.ctx.shadowOffsetY = offsetY;
    this.ctx.shadowBlur = blur;
    this.ctx.shadowColor = color;
  }

  init(time = 0) {
    this.time = time

    if (!this.stop) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.render(time)

      setTimeout(() => {
        window.requestAnimationFrame(this.init.bind(this));
      }, 1000 / this.fps);
    }
  }

  render(time) {
    // extend Morningstar and overwrite
  }
}


// img.setAttribute('width', '100%');
// img.setAttribute('height', '100%');