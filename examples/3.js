import { Canvas, Calc } from '../src'

class Flake {
  constructor(morningstar, pos, r, vel, acc, alpha = 1) {
    this.ctx = morningstar.ctx
    this.ms = morningstar
    this.pos = pos
    this.vel = vel
    this.acc = acc
    this.r = r
    this.alpha = alpha
  }

  render() {
    const { pos: { x, y, z }, r, alpha } = this
    const radius = (z * r) + r
    this.ms.arc({ x, y, r: radius, color: `rgba(255, 255, 255, ${alpha}` })

    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.pos.z += this.vel.z
    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.vel.z += this.acc.z
    
    if(this.pos.z < 0) {
      this.pos.z = 0
    }
    
    if(this.vel.z < (-1)) {
//      console.log(radius, this.vel.z, this.acc.z)
    }

    if (this.pos.y > this.ms.canvas.height) {
      this.pos.y = -this.r
      this.vel.x = Math.random() < 0.5 ? -Math.random() : Math.random();
      this.vel.y = Calc.random(1, 15 / r)
      this.z = Calc.random(-0.5, 2)
    }
  }
}

class Snow extends Canvas {
  constructor() {
    super({ fps: 60, bgColor: 'rgb(50, 50, 50)', width: 800, height: 600 })
    this.flakesForeground = []
    this.flakesBackground = []
    this.flakesFarAway = []

    this.image = new Image();

    this.createFlakes()
    this.createFlakes2()
    this.createFlakes3()
    this.loadLogo()

    this.init()
  }

  bg() {
    var grd = this.ctx.createLinearGradient(0, this.canvas.height, 0, 0);
    grd.addColorStop(0, "#1f3342");
    grd.addColorStop(1, "black");

    this.ctx.fillStyle = grd;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  loadLogo() {
    this.image.src = require('/img/logo.png');
    this.image.onload = () => {
      this.loaded = true
    }
  }

  createFlakes() {
    for (let i = 0; i < 50; i++) {
      const x = Calc.random(0, this.canvas.width)
      const y = Calc.random(0, this.canvas.height) - this.canvas.height - 100
      const z = Calc.random(-0.5, 2)
      const r = Calc.random(1, 4)
      const velX = Math.random() < 0.5 ? -Math.random() : Math.random();
      const velY = Calc.random(1, 6 / r)
      const velZ = Calc.random(0, 1)
      const accX = 0
      const accY = Calc.random(0, 0.5)
      const accZ = Calc.random(-0.005, 0.005)

      this.flakesForeground.push(new Flake(this, Calc.create3DVector(x, y, z), r, Calc.create3DVector(velX, velY, velZ), Calc.create3DVector(accX, accY, accZ)))
    }
  }

  createFlakes2() {
    for (let i = 0; i < 50; i++) {
      const x = Calc.random(0, this.canvas.width)
      const y = Calc.random(0, this.canvas.height) - this.canvas.height - 100
      const r = Calc.random(2, 5)
      const velX = Math.random() < 0.5 ? -Math.random() : Math.random();
      const velY = Calc.random(1, 2)
      const accX = 0
      const accY = Calc.random(0, 0.5)

      this.flakesBackground.push(new Flake(this, Calc.create3DVector(x, y), r, Calc.create3DVector(velX, velY), Calc.create3DVector(accX, accY)))
    }
  }

  createFlakes3() {
    for (let i = 0; i < 50; i++) {
      const x = Calc.random(0, this.canvas.width)
      const y = Calc.random(0, this.canvas.height) - this.canvas.height - 100
      const r = Calc.random(2, 5)
      const velX = Math.random() < 0.5 ? -Math.random() : Math.random();
      const velY = Calc.random(1, 1.5)
      const accX = 0
      const accY = Calc.random(0, 0.2)

      this.flakesBackground.push(new Flake(this, Calc.create3DVector(x, y), r, Calc.create3DVector(velX, velY), Calc.create3DVector(accX, accY), 0.3))
    }
  }

  render() {
    this.bg()
    for (const flake of this.flakesFarAway) {
      flake.render()
    }
    
    for (const flake of this.flakesBackground) {
      flake.render()
    }
    
    if (this.loaded) {
      const height = 400
      const width = 400
      const centerX = this.canvas.width / 2 - (width / 2)
      const centerY = this.canvas.height / 2 - (height / 2)
      this.ctx.drawImage(this.image, centerX, centerY, height, width)
    }
    
    for (const flake of this.flakesForeground) {
      flake.render()
    }
  }
}

new Snow