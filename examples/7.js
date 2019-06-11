import { Canvas, Calc } from '../src'

// https://codepen.io/xerxesnoble/pen/JNgmJR?editors=0010

class Particle {
  constructor(morningstar, pos, width, height, color, speed) {
    this.ctx = morningstar.ctx
    this.ms = morningstar
    this.pos = pos
    this.width = width
    this.height = height
    this.center = Calc.createVector(this.width / 2, this.height / 2)
    this.color = color
    this.speed = speed / 5
  }

  render() {
    const { pos, width, height, color } = this
    this.ms.rect({ ...pos, width, height, color })
  }
}

class Tween {
  constructor(duration, object) {
    this.duration = duration
    this.object = object
    this.startTime = null
    this.isRunning = false
    this.toPos = null
  }

  start(time, toPos) {
    if (this.isRunning) return

    this.startTime = time
    this.isRunning = true
    this.toPos = { x: toPos.x - this.object.center.x, y: toPos.y - this.object.center.y }
    this.fromPos = this.object.pos
  }

  animate(time) {
    const deltaTime = (time - this.startTime) / this.duration

    if (this.isRunning && this.object.pos.x === this.toPos.x && this.object.pos.y === this.toPos.y) {
      this.isRunning = false
      this.toPos = null

      console.log('stop tween')
    } else if (this.isRunning) {
      const currentX = this.object.pos.x + ((this.toPos.x - this.object.pos.x) * deltaTime);
      const currentY = this.object.pos.y + ((this.toPos.y - this.object.pos.y) * deltaTime);

      // TODO: implement easings and refactor in to Calc
      const t = this.duration > 0 ? deltaTime : 1

      this.object.pos.x = currentX
      this.object.pos.y = currentY

      // console.log('tween a little', this.object.pos, this.toPos, currentX, currentY)
    }
  }
}

class Tweens extends Canvas {
  constructor() {
    super({ fps: 60, bgColor: '#AEFEDF', width: 800, height: 600 })

    this.colors = [
      'rgb(245, 254, 174)',
      'rgb(205, 254, 174)',
      'rgb(174, 254, 183)',
      'rgb(174, 254, 223)',
      'rgb(174, 245, 254)',
      'rgb(174, 205, 254)'
    ]

    this.object1 = new Particle(this, Calc.createVector(150, 150), 100, 100, this.colors[0], 2)
    this.object2 = new Particle(this, Calc.createVector(100, 50), 50, 50, this.colors[1], 1)
    this.objects = [this.object1, this.object2]
    this.tweens = [new Tween(1000, this.object1), new Tween(2000, this.object2)]

    this.canvas.addEventListener('mousedown', (e) => {
      this.mouseX = e.clientX - this.canvasPosition.left
      this.mouseY = e.clientY - this.canvasPosition.top

      this.tweens.forEach((tween) => {
        tween.start(this.time, Calc.createVector(this.mouseX, this.mouseY))
      })
    }, false)

    this.init()

  }

  render(time) {
    this.tweens.forEach((tween) => {
      tween.animate(time)
    })

    if(this.tweens.every((tween) => !tween.isRunning)) {
      this.canvas.style.cursor = 'move';
    } else {
      this.canvas.style.cursor = 'no-drop';
    }

    this.objects.forEach((object) => {
      object.render()
    })
  }
}

new Tweens()
