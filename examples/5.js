import { Canvas, Calc } from '../src'

class Bob {
  constructor(ms, r, a) {
    this.ms = ms
    this.r = r
    this.a = a
  }

  render() {
    const { ms, r, a } = this
    const x = r * Math.cos(a)
    const y = r * Math.sin(a)

    ms.line({ x1: 0, y1: 0, x2: x, y2: y })
    ms.arc({ x, y, r: 30, color: '#fff' })
  }
}

class Pendulum extends Canvas {
  constructor() {
    super({ fps: 60, bgColor: 'rgb(50, 50, 50)', width: 800, height: 600, hook: '.main' })

    this.angle = Math.PI / 4
    this.radius = 150
    this._velocity = 0.01
    this.acceleration = 0.001
    this.max_velocity = 0.5

    this.amplitude = 360
    this.period = 200

    this.bob = new Bob(this, this.radius, this.angle)

    this.init()
  }

  set velocity(velocity) {
    this._velocity = velocity > this.max_velocity ? this.max_velocity : velocity
  }

  get velocity (){
    return this._velocity
  }

  bg() {
    var grd = this.ctx.createLinearGradient(0, this.canvas.height, 0, 0);
    grd.addColorStop(0, "#1f3342");
    grd.addColorStop(1, "black");

    this.ctx.fillStyle = grd;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render(time) {
    this.bg()
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

    // this.bob.render()

    // this.angle += this.velocity
    // this.velocity += this.acceleration

    // this.bob.a = this.angle
    const x = this.amplitude * Math.sin(time / this.period)
    this.arc({ x, y: 0, r: 30, color: '#fff' })

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

}

new Pendulum