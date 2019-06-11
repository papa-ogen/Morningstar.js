import { Canvas } from '../src'

// https://en.wikipedia.org/wiki/Maze_generation_algorithm

class Cell {
  constructor(morningstar, width, height, x, y) {
    this.ms = morningstar
    this.ctx = morningstar.ctx
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.visited = false;
    this.neighbors = [];
    // Top, Right, Bottom, Left
    this.walls = [1, 1, 1, 1];
  }

  show(currentCell) {
    if (this.walls[0]) {
      this.ms.line({
        x1: this.x, y1: this.y, x2: this.x + this.width, y2: this.y
      })
    }

    if (this.walls[1]) {
      this.ms.line({
        x1: this.x + this.width, y1: this.y, x2: this.x + this.width, y2: this.y + this.height
      })
    }

    if (this.walls[2]) {
      this.ms.line({
        x1: this.x + this.width, y1: this.y + this.height, x2: this.x, y2: this.y + this.height
      })
    }

    if (this.walls[3]) {
      this.ms.line({
        x1: this.x, y1: this.y + this.height, x2: this.x, y2: this.y
      })
    }

    if (currentCell) {
      this.ms.rect({
        x: this.x, y: this.y, width: this.width, height: this.height, color: '#9bf442'
      })
    }
  }

  createWall(x1, y1, x2, y2) {
    const shadow = {
      offsetX: 2
    }
    this.ms.line({ x1, y1, x2, y2, shadow })
  }
}

class Maze extends Canvas {
  constructor() {
    super({ bgColor: '#666', fps: 60, hook: '.main' })

    this.cols = 25;
    this.rows = 25;
    this.cellWidth = this.canvas.width / this.cols;
    this.cellHeight = this.canvas.height / this.rows;
    this.cells = [];
    this.stack = [];

    this.generateCells()
    this.getNeighbors()
    this.currentCell = this.cells[0];
    this.currentCell.visited = true;
    this.stack.push(this.currentCell)

    this.init()
  }

  generateCells() {
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        this.cells.push(new Cell(this, this.cellWidth, this.cellHeight, this.cellWidth * y, this.cellHeight * x))
      }
    }
  }

  getNeighbors() {
    for (let i = 0; i < this.cells.length - 1; i++) {
      const cell = this.cells[i];
      const top = i - this.rows;
      const right = i + 1;
      const bottom = i + this.cols;
      const left = i - 1;

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
    }
  }

  render() {
    const neighbors = this.currentCell.neighbors.filter(neighbor => !neighbor.visited);

    if (neighbors.length) {
      let neighbor
      if (neighbors.length === 1) {
        neighbor = neighbors[0]
      } else {
        neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      }

      // remove wall between neighbor and current cell
      if (this.currentCell.x < neighbor.x) {
        // remove current right- and neighbor left wall
        this.currentCell.walls[1] = 0;
        neighbor.walls[3] = 0;
      } else if (this.currentCell.x > neighbor.x) {
        // remove current left- and neighbor right wall
        this.currentCell.walls[3] = 0;
        neighbor.walls[1] = 0;
      } else if (this.currentCell.y > neighbor.y) {
        // remove current top- and neighbor bottom wall
        this.currentCell.walls[0] = 0;
        neighbor.walls[2] = 0;
      } else if (this.currentCell.y < neighbor.y) {
        // remove current bottom- and neighbor top wall
        this.currentCell.walls[2] = 0;
        neighbor.walls[0] = 0;
      }

      neighbor.visited = true;
      this.stack.push(neighbor)
      this.currentCell = neighbor;
    } else {
      // Take random unvisited cell
      this.currentCell = this.stack.splice(0, 1)[0]
    }

    for (let cell of this.cells) {
      cell.show(this.currentCell === cell)
    }

    if (this.cells.every(cell => cell.visited)) {
      console.warn("Maze Complete");
      this.stopAnimation()
    }
  }
}

new Maze()
