import Vector from './Vector'

export default class Calc {
  constructor() {
    this.HALF_PI = Math.PI / 2
    this.DOUBLE_PI = Math.PI * 2
  }

  static constrain(n, min, max) {
    return n < min ? min : n && n > max ? max : n;
  }

  static createVector(x, y) {
    return new Vector(x, y);
  }

  static createRandomVector() {
    const x = Math.random() > 0.5 ? Math.random() : -Math.random();
    const y = Math.random() > 0.5 ? Math.random() : -Math.random();

    return new Vector(x, y);
  }

  static create3DVector(x = 0, y = 0, z = 0) {
    return { x, y, z }
  }

  static dist(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
  }

  static heading(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
  }

  static toDegrees(angle) {
    return angle * (180 / Math.PI);
  }

  static toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  static invertAngle(angle) {
    return (angle + Math.PI) % (2 * Math.PI);
  }

  static circlesCollide(x1, y1, r1, x2, y2, r2) {
    return Math.abs((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) < (r1 + r2) * (r1 + r2);
  }

  static rectangleCollide(rect1, rect2) {
    return (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y)
  }

  static circleRectangleCollide(cX, cY, cR, rX, rY, rW, rH) {
    const distX = Math.abs(cX - rX - rW / 2);
    const distY = Math.abs(cY - rY - rH / 2);

    if (distX > (rW / 2 + cR)) { return false; }
    if (distY > (rH / 2 + cR)) { return false; }

    if (distX <= (rW / 2)) { return true; }
    if (distY <= (rH / 2)) { return true; }

    const dx = distX - rW / 2;
    const dy = distY - rH / 2;
    return (dx * dx + dy * dy <= (cR * cR));
  }

  static random(min = 0, max = 255) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static randomOffset(offset) {
    const rand = Math.random()
    return rand > 0.5 ? rand * offset : -rand * offset
  }

  static easingFunctions() {
    return {
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
  }

  static elasticEasingFunctions() {
    return {
      // elastic bounce effect at the beginning
      easeInElastic: function (t) { return (.04 - .04 / t) * Math.sin(25 * t) + 1 },
      // elastic bounce effect at the end
      easeOutElastic: function (t) { return .04 * t / (--t) * Math.sin(25 * t) },
      // elastic bounce effect at the beginning and end
      easeInOutElastic: function (t) { return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1 }
    }
  }
}
