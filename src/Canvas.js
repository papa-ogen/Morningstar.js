export default class Canvas {
  constructor(config = {}) {
    this.width = config.width || 600
    this.height = config.height || 600
    this.bgColor = config.bgColor || '#000'
    this.fps = config.fps || 60

    this.appendToBody()

    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext("2d")
    this.canvasPosition = this.canvas.getBoundingClientRect()
    this.stop = false
  }

  appendToBody() {
    const c = document.createElement('canvas')
    c.width = this.width
    c.height = this.height
    c.style.background = this.bgColor

    document.body.append(c)
  }

  startAnimation(stop = false) {
    this.stop = stop
  }

  stopAnimation(stop = true) {
    this.stop = stop
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
    // extend Canvas and overwrite
  }
}


// img.setAttribute('width', '100%');
// img.setAttribute('height', '100%');