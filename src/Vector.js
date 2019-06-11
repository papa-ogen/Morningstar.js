export default class Vector {
  constructor(x, y) {
    this._x = x || 0;
    this._y = y || 0;
    this.vectorLimit = undefined;
  }

  set x(x) {
    this._x =
      this.vectorLimit && x > this.vectorLimit.x ? this.vectorLimit.x : x;
  }

  get x() {
    return this._x;
  }

  set y(y) {
    this._y =
      this.vectorLimit && y > this.vectorLimit.y ? this.vectorLimit.y : y;
  }

  get y() {
    return this._y;
  }

  mult(factor, factor2 = undefined) {
    this.x *= factor;
    this.y *= factor2 || factor;
  }

  div(factor, factor2 = undefined) {
    this.x /= factor;
    this.y /= factor2 || factor;
  }

  add(factor, factor2 = undefined) {
    this.x += factor;
    this.y += factor2 || factor;
  }

  sub(factor, factor2 = undefined) {
    this.x -= factor;
    this.y -= factor2 || factor;
  }

  limit(limit, limit2 = undefined) {
    this.vectorLimit = {
      x: limit,
      y: limit2 || limit
    };

    this.x = this.x > this.vectorLimit.x ? this.vectorLimit.x : this.x;
    this.y = this.y > this.vectorLimit.y ? this.vectorLimit.y : this.y;
  }

  unLimit() {
    this.vectorLimit = undefined;
  }

  heading(x2, y2) {
    return Math.atan2(y2 - this.y, x2 - this.x);
  }
}
