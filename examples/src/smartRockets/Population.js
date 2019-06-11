class Population {
  constructor(ms, populationSize) {
    this.ms = ms
    this.populationSize = populationSize
    this.rockets = []
    this.rocketsDone = []
    this.defaultLifespan = 200

    this.createPopulation()
  }

  createPopulation() {
    for (let i = 0; i < this.populationSize; i++) {
      this.rockets.push(new Rocket(this.ms));
    }
  }

  crossover(rocket1, rocket2) {
    // Crossover rules combine two parents to form children for the next generation.
    const newGenes = []
    const mid = Math.floor(Morningstar.random(0, this.defaultLifespan));

    for (var i = 0; i < this.defaultLifespan; i++) {
      if (i > mid) {
        newGenes[i] = rocket1.dna.genes[i];
      }
      // If i < mid new gene should come from other partners gene's
      else {
        newGenes[i] = rocket2.dna.genes[i];
      }
    }
    // Gives DNA object an array
    return new DNA(this.defaultLifespan, newGenes);
  }

  update() {
    if (this.rockets.length === 0) {
      for (const rocket of this.rocketsDone) {
        rocket.calcFitness()
      }
  
      // Selection rules select the individuals, called parents, that contribute to the population at the next generation.
      const parents = this.rocketsDone.sort((rocketA, rocketB) => rocketA.fitness > rocketB.fitness ? -1 : 1)
        .slice(0, 10)
  
      const topTier = []
      for (let i = 0; i < parents.length; i+= 2) {
        const rocket1 = parents[i];
        const rocket2 = parents[i+1];

        topTier.push(this.crossover(rocket1, rocket2))
      }

      // Mutation rules apply random changes to individual parents to form children.
      for (const topDog of topTier) {
        for (let j = 0; j < 40; j++) {
          this.rockets.push(new Rocket(this.ms, topDog.dna));
        }
      }
      console.log('new BATCH')
    } else {
      for (let i = this.rockets.length - 1; i >= 0; i--) {
        const rocket = this.rockets[i]

        if (!rocket.isCompleted && !rocket.hasCrashed) {
          const distanceFromTarget = Morningstar.getDistanceBetween(rocket.pos.x, rocket.pos.y, this.ms.target.x, this.ms.target.y)

          if (rocket.lifespan <= 0) {
            rocket.isCompleted = true
            rocket.alpha = 0
            this.rocketsDone.push(rocket)
            this.rockets.splice(i, 1)
          } else if (distanceFromTarget < 20) {
            console.log('target is buggy')
            rocket.isCompleted = true
            rocket.alpha = 0
            this.rocketsDone.push(rocket)
            this.rockets.splice(i, 1)
          } else if (rocket.isOutOfBounds()) {
            rocket.hasCrashed = true
            rocket.alpha = 0
            this.rocketsDone.push(rocket)
            this.rockets.splice(i, 1)
          } else {
            rocket.render()
            rocket.update()
          }
        }
      }
    }
  }
}