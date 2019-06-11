class Flake {
  constructor(morningstar, pos, width, height) {
    this.ctx = morningstar.ctx
    this.ms = morningstar
    this.pos = pos
    this.width = width
    this.height = height
    this.center = Morningstar.createVector(this.width / 2, this.height / 2)
    this.loaded = false
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 0;
    this.numberOfFrames = 6;
    this.loop = false
    this.image = new Image();
    this.image.src = 'img/soldier-sprite.png';
    this.image.onload = () => {
      this.loaded = true
    }
  }

  render() {
    if (this.loaded) {
      const { pos, width, height } = this
      this.ctx.drawImage(
        this.image,
        this.frameIndex * this.width / this.numberOfFrames,
        0,
        this.width / this.numberOfFrames,
        this.height,
        0,
        0,
        this.width / this.numberOfFrames,
        this.height);
      this.tickCount += 1;

      if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;

        if (this.frameIndex < this.numberOfFrames - 1) {
          // Go to the next frame
          this.frameIndex += 1;
        } else if (this.loop) {
          this.frameIndex = 0;
      }

      }
    }
  }
}

// http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/soldier-sprite.png

class Sprites extends Morningstar {
  constructor() {
    super({ fps: 60, bgColor: 'rgb(200, 148, 82)', width: window.innerWidth, height: window.innerHeight })

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

    this.sprite = new Flake(this, Morningstar.createVector(this.canvas.width / 2 - 50, this.canvas.height / 2 - 50), 100, 16)

    this.init()
  }


  render() {
    this.sprite.render()

    // this.stopAnimation()
  }
}

new Sprites