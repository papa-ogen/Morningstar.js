class Reflection extends Morningstar {
  constructor() {
    super({ fps: 60, bgColor: 'rgb(50, 50, 50)', width: window.innerWidth, height: window.innerHeight })

    this.image = new Image();

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
    this.image.src = 'img/logo.png';
    this.image.onload = () => {
      this.loaded = true
    }
  }

  render() {
    this.bg()

    if (this.loaded) {
      var REFLECTION_HEIGHT = 50;
      const height = 400
      const width = 400
      const centerX = this.canvas.width / 2 - (width / 2)
      const centerY = this.canvas.height / 2 - (height / 2)
      this.ctx.drawImage(this.image, centerX, centerY, height, width)
      this.ctx.save();
      //translate to a point from where we want to redraw the new image
      this.ctx.translate(0, centerY + height + REFLECTION_HEIGHT);
      this.ctx.scale(1, -1);
      // this.ctx.globalAlpha = 0.25;
    }
  }
}

new Reflection