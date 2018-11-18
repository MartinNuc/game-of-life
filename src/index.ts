export interface Cell {
  x: number
  y: number
}

export class World {
  private cells: Cell[]
  constructor(cells: Cell[] = []) {
    this.cells = cells
  }

  getCells(): any {
    return this.cells
  }

  addCell(cell: Cell): any {
    this.cells.push(cell);
  }

  evolve(): World {
    const alives = this.generateAlivesForNextIteration();
    return new World(alives);
  }

  generateAlivesForNextIteration() {
    const candidates = this.generateCandidates();
    const surviveMap = candidates.map(cell => this.shouldSurvive(cell));
    const survivalsWithDuplicates = candidates.filter((_, index) => surviveMap[index]);
    return removeDuplicates(survivalsWithDuplicates);
  }

  shouldSurvive(cell: Cell) {
    const livingAround = this.countLivingAround(cell);
    const shouldRise = !this.isAliveOnPosition(cell.x, cell.y) && livingAround === 3;
    const shouldSurvive = this.isAliveOnPosition(cell.x, cell.y) && livingAround >= 2 && livingAround <= 3;
    return shouldRise || shouldSurvive;
  }
  
  countLivingAround(cell: Cell): any {
    const aroundMatrix = [
      [-1, -1], [0, -1], [1, -1],
      [-1, 0], [1, 0],
      [-1, 1], [0, 1], [1, 1],
    ];
  
    return aroundMatrix.reduce((acc, [x, y]) => {
      const lives = this.isAliveOnPosition(cell.x + x, cell.y + y);
      return lives ? acc+1 : acc;
    }, 0);
  }

  generateCandidates() {
    const candidates: Cell[] = [];
    this.cells.forEach(cell => {
      let neighbourhood = this.generateNeighbourhood(cell);
      candidates.push(...neighbourhood);
    })
    return candidates;
  }

  generateNeighbourhood(cell: Cell): Cell[] {
    return [
      {x: cell.x-1, y: cell.y-1}, {x: cell.x, y: cell.y-1},{x: cell.x+1, y: cell.y-1},
      {x: cell.x-1, y: cell.y},{x: cell.x+1, y: cell.y},
      {x: cell.x-1, y: cell.y+1}, {x: cell.x, y: cell.y+1},{x: cell.x+1, y: cell.y+1},
    ];
  }

  isAliveOnPosition(x: number, y: number): boolean {
    return this.cells.some((cell) => cell.x === x && cell.y === y)
  }

}

export function removeDuplicates(cells: Cell[]) {
  const set = new Map<string, Cell>();
  cells.forEach(cell => set.set(`${cell.x};${cell.y}`, cell));
  return Array.from(set.values());
}
