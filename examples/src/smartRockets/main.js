class SmartRockets extends Morningstar {
  constructor() {
    super({ bgColor: '#BADA55', fps: 60 })
    this.population = []
    this.target = {
      x: this.canvas.width / 2,
      y: 20
    }

    this.population = new Population(this, 200)

    this.init()
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
    this.arc({ x: this.target.x - 5, y: this.target.y, r: 10, color: 'rgba(255, 0, 0, 0.5)' })

    this.population.update()
    // this.stopAnimation()
  }
}

new SmartRockets()