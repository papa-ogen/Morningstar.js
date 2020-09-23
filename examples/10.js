import { Canvas, Calc } from '../src'

class Sprite {
  constructor(ms, src, pos, width, height, loop = true) {
    this.src = src
    this.ms = ms
    this.pos = pos
    this.width = width
    this.height = height
    this.center = Calc.createVector(this.width / 2, this.height / 2)
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 0;
    this.numberOfFrames = 12;
    this.loop = loop
  }

  render() {
    const { ms, pos: { x, y }, width, height, frameIndex, numberOfFrames, ticksPerFrame, src, loop } = this
    ms.createImage({
      src,
      sx: frameIndex * width / numberOfFrames,
      sy: 0,
      width: width / numberOfFrames,
      height,
      x,
      y,
      sWidth: width / numberOfFrames,
      sHeight: height
    });

    this.tickCount += 1;

    if (this.tickCount > ticksPerFrame) {
      this.tickCount = 0;

      if (this.frameIndex < 2) {
        // Go to the next frame
        this.frameIndex += 1;
      } else if (loop) {
        this.frameIndex = 0;
      }
    }
  }
}

// http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation
// http://www.williammalone.com/articles/create-html5-canvas-javascript-game-character/1/

class Sprites extends Canvas {
  constructor() {
    super({ fps: 10, hook: '.main' })

    this.sprites = []
    this.isLoaded = false
    this.colors = [
      'rgb(200, 148, 82)',
      'rgb(193, 200, 82)',
      'rgb(134, 200, 82)',
      'rgb(82, 200, 89)',
      'rgb(82, 200, 148)',
      'rgb(82, 193, 200)'
    ]

    this.canvas.addEventListener('mousedown', (e) => {
      this.mouseX = e.clientX - this.canvasPosition.left
      this.mouseY = e.clientY - this.canvasPosition.top

    }, false)

    this.image = new Image();
    this.image.src = require('/img/soldier-sprite.png');
    this.image.onload = () => {
      this.isLoaded = true
    }

    this.createSprites()

    this.init()
  }

  createSprites() {
    this.sprites.push(new Sprite(this, this.image, Calc.createVector(this.canvas.width / 2 - 50, this.canvas.height / 2 - 50), 192, 16))
    this.sprites.push(new Sprite(this, this.image, Calc.createVector(this.canvas.width / 2, this.canvas.height / 2 - 50), 192, 16))
    this.sprites.push(new Sprite(this, this.image, Calc.createVector(this.canvas.width / 2 + 50, this.canvas.height / 2 - 50), 192, 16))
  }

  createBg() {
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
    gradient.addColorStop(0, 'green');
    gradient.addColorStop(.5, 'cyan');
    gradient.addColorStop(1, 'green');

    this.rect({ x: 0, y: 0, color: gradient, width: this.canvas.width, height: this.canvas.height })
  }


  render() {
    this.createBg()
    if (this.isLoaded) {
      for (const sprite of this.sprites) {
        sprite.render()
      }
    }
  }
}

new Sprites