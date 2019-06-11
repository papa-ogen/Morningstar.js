class DNA {
  constructor(lifespan, genes) {
    this.genes = [] || []

    if(this.genes.length) return

    for (let i = 0; i < lifespan; i++) {
      this.genes.push(Morningstar.createRandom2DVector())
    }
  }
}