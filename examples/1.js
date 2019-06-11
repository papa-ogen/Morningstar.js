import { Canvas, Calc } from '../src'

// https://en.wikipedia.org/wiki/A*_search_algorithm

class Cell {
  constructor(ctx, width, height, x, y) {
    this.ctx = ctx
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.cameFrom = null
    this.neighbors = []
    this.visited = false
    this.gScore = 0
    this.fScore = 0
    this.wall = false

    if(Math.random() < 0.3) {
      this.wall = true
    }
  }

  render(current) {
    if(this.wall) {
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    } else if (current) {
      this.ctx.fillStyle = '#33ECFF';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    } else if (this.visited) {
      this.ctx.fillStyle = '#E7FCD8';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  renderAsNeighbor() {
    this.ctx.fillStyle = '#AECDFE';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class AStar extends Canvas {
  constructor() {
    super({ width: 600, height: 600, bgColor: '#BADA55', fps: 16 })

    this.cols = 50;
    this.rows = 50;
    this.cellWidth = this.canvas.width / this.cols;
    this.cellHeight = this.canvas.height / this.rows;
    this.cells = [];
    this.openSet = [];
    this.totalPath = [];
    this.goal = {
      x: this.width - this.cellWidth,
      y: this.height - this.cellHeight
    }
    this.gScore = 0
    this.diagonals = true

    this.generateCells()

    const startCell = this.cells[0]
    startCell.wall = false

    // Goal
    const goalCell = this.cells[this.cells.length-1]
    goalCell.wall = false
    
    // For the first node, that value is completely heuristic.
    startCell.fScore = Calc.dist(startCell.x, startCell.y, this.goal.x, this.goal.y)

    this.openSet = [startCell]

    this.init()
  }

  generateGrid() {
    for (let x = 0; x < this.cols; x++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, x * this.cellHeight);
      this.ctx.lineTo(this.canvas.width, x * this.cellHeight);
      this.ctx.strokeStyle = "#666";
      this.ctx.stroke();
    }

    for (let y = 0; y < this.cols; y++) {
      this.ctx.beginPath();
      this.ctx.moveTo(y * this.cellWidth, 0);
      this.ctx.lineTo(y * this.cellWidth, this.canvas.height);
      this.ctx.strokeStyle = "#666";
      this.ctx.stroke();
    }
  }

  generateCells() {
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        this.cells.push(new Cell(this.ctx, this.cellWidth, this.cellHeight, this.cellWidth * y, this.cellHeight * x))
      }
    }
  }

  getNeighbors(cell) {
    const index = this.cells.map(function (e) { return e; }).indexOf(cell);
    const top = index - this.rows;
    const right = index + 1;
    const bottom = index + this.cols;
    const left = index - 1;

    if (this.cells[top]) {
      cell.neighbors.push(this.cells[top]);
    }

    if (this.cells[bottom]) {
      cell.neighbors.push(this.cells[bottom]);
    }

    if (this.cells[left] && cell.x > 0) {
      cell.neighbors.push(this.cells[left]);
    }

    if (this.cells[right] && cell.x + this.cellWidth < this.width) {
      cell.neighbors.push(this.cells[right]);
    }

    if(this.diagonals) {
      const topRight = index + 1 - this.rows;
      const topLeft = index - 1 - this.rows;
      const bottomRight = index + 1 + this.cols;
      const bottomLeft = index - 1 + this.cols;

      if(this.cells[topRight] && cell.x + this.cellWidth < this.width) {
        cell.neighbors.push(this.cells[topRight]);
      }

      if(this.cells[topLeft] && cell.x > 0) {
        cell.neighbors.push(this.cells[topLeft]);
      }

      if(this.cells[bottomRight] && cell.x + this.cellWidth < this.width) {
        cell.neighbors.push(this.cells[bottomRight]);
      }

      if(this.cells[bottomLeft] && cell.x > 0) {
        cell.neighbors.push(this.cells[bottomLeft]);
      }
    }
  }

  getLowestFScoreNode() {
    const lowestScoringNode = this.openSet.reduce(function (res, obj) {
      return (obj.fScore < res.fScore) ? obj : res;
    });

    const remainingOpenSet = [...this.openSet].filter(node => node !== lowestScoringNode);

    return [lowestScoringNode, remainingOpenSet]
  }

  hasReachedGoal(currentCell) {
    return (currentCell.x === this.goal.x && currentCell.y === this.goal.y)
  }

  reconstructPath(currentCell) {
    const totalPath = [currentCell]

    while (currentCell.cameFrom) {
      totalPath.push(currentCell.cameFrom)
      currentCell = currentCell.cameFrom
    }

    return totalPath
  }

  render() {
    this.generateGrid();

    // Stop animation when openSet is empty
    this.stopAnimation(!this.openSet.length)

    // A STAR ALGORITHM

    // Render cells?
    for (let cell of this.cells) {
      cell.render()
    }

    // get node with lowset fScore and remove from set
    const [currentCell, openSet] = this.getLowestFScoreNode()
    // update openSet
    this.openSet = openSet
    // add current to closedSet
    currentCell.visited = true
    // highlight current
    currentCell.render(true)
    // get neighbors
    this.getNeighbors(currentCell)

    for (const neighbor of currentCell.neighbors) {
      if (neighbor.visited || neighbor.wall) continue

      const cost = Calc.dist(currentCell.x, currentCell.y, neighbor.x, neighbor.y)
      const tentativeGScore = currentCell.gScore + cost + neighbor.fScore

      // if neighbor not in open set
      if (!this.openSet.find((cell) => cell === neighbor)) {
        this.openSet.push(neighbor)
      } else if (tentativeGScore >= neighbor.gScore) {
        continue
      }

      neighbor.renderAsNeighbor()
      neighbor.cameFrom = currentCell
      neighbor.gScore = tentativeGScore
      neighbor.fScore = neighbor.gScore + Calc.dist(neighbor.x, neighbor.y, this.goal.x, this.goal.y)
    }
    
    if (this.hasReachedGoal(currentCell)) {
      const path = this.reconstructPath(currentCell)
      
      console.warn('You reached the goal!', path)
      
      for (let cell of this.cells) {
        cell.render(path.find((c) => c === cell))
      }

      this.stopAnimation()
    }

    const path = this.reconstructPath(currentCell)
    for (let cell of this.cells) {
      cell.render(path.find((c) => c === cell))
    }
  }
}

new AStar()
