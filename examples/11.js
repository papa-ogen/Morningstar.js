import { Canvas, Calc } from '../src'

class Circle {
  constructor(ms, x, y, r, offsetFactor) {
    this.ms = ms
    this.x = x
    this.y = y
    this.r = r
    this.dots = []
    this.offsetFactor = offsetFactor
  }

  getCirclePoints() {
    const { x, y, r, offsetFactor } = this
    const steps = 300
    const dots = []

    for (var i = 0; i < steps; i++) {
      const randXOffset = Calc.randomOffset(offsetFactor)
      const randYOffset = Calc.randomOffset(offsetFactor)
      dots.push({
        x: (x + r * Math.cos(2 * Math.PI * i / steps)) + randXOffset,
        y: (y + r * Math.sin(2 * Math.PI * i / steps)) + randYOffset
      })
    }

    return dots
  }

  render(offsetFactor) {
    const { x, y, r } = this
    this.offsetFactor = offsetFactor

    this.dots = this.getCirclePoints()
    this.ms.arc({ x, y, r, strokeColor: '#fff', strokeWidth: 1 })

    for (let i = 1; i < this.dots.length; i++) {
      const { x: x1, y: y1 } = this.dots[i - 1]
      const { x: x2, y: y2 } = this.dots[i]
      const color = Math.random() > 0.5 ? 'pink' : 'white'
      const shadow = {
        offsetX: 3, offsetY: 2, blur: 15, color: 'rgba(244, 63, 190, 1)'
      }
      this.ms.line({
        x1, y1, x2, y2, color, lineWidth: 4, shadow
      })
    }

    this.ms.line({ x1: this.dots[this.dots.length - 1].x, y1: this.dots[this.dots.length - 1].y, x2: this.dots[0].x, y2: this.dots[0].y, color: 'pink', lineWidth: 4 })
  }
}
class Tesla extends Canvas {
  constructor() {
    super({ fps: 60, bgColor: '#000', hook: '.main' })

    const staticSlider = document.querySelector('#static')
    const staticSliderValue = document.querySelector('#value')
    this.offsetFactor = staticSlider.value
    staticSliderValue.innerHTML = staticSlider.value

    staticSlider.oninput = (e) => {
      this.offsetFactor = e.target.value;
      staticSliderValue.innerHTML = e.target.value
    }

    this.circle = new Circle(this, this.canvas.width / 2, this.canvas.height / 2, 200, this.offsetFactor)

    this.init()
  }

  render() {
    this.circle.render(this.offsetFactor)
    // this.stopAnimation()
  }
}

new Tesla