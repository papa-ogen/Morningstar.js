class Pixels extends Morningstar {
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

      this.dropBiome(this.mouseX, this.mouseY)
    }, false)

    this.init()
  }

  dropBiome(x, y) {
    const width = 10
    const height = 10
    var imgd = this.ctx.getImageData(x, y, width, height);
    var pix = imgd.data;
// https://en.wikipedia.org/wiki/Midpoint_circle_algorithm
    for (var i = 0, n = pix.length; i < n; i += 4) {
      pix[i] = 255 - pix[i]; // red
      pix[i + 1] = 255 - pix[i + 1]; // green
      pix[i + 2] = 255 - pix[i + 2]; // blue
      pix[i + 3] = 100
      // i+3 is alpha (the fourth element)
    }
console.log(pix.length)
    this.ctx.putImageData(imgd, x, y);
  }

  render() {
    this.rect({ x: 0, y: 0, width: this.canvas.width, height: this.canvas.height, color: this.colors[0] })
    
    this.stopAnimation()
  }
}

new Sprites