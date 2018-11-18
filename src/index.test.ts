import { World, removeDuplicates } from './index';

describe('world', () => {
  it('can be created with zero cells', () => {
    const world = new World();
    expect(world.getCells().length).toBe(0);
  });

  it('adds new cell', () => {
    const world = new World();
    world.addCell({ x: 0, y: 0 });
    expect(world.getCells().length).toBe(1);
  });

  it('should evolve world with single cell into dead world', () => {
    const world = new World();
    world.addCell({ x: 0, y: 0 });
    const evolved = world.evolve();
    expect(evolved.getCells().length).toBe(0);
  });

  it('should check if cell on the position is alive', () => {
    const world = new World([{ x: 0, y: 0 }]);
    expect(world.isAliveOnPosition(0, 0)).toBe(true);
  });

  it('should check if cell on the position is dead', () => {
    const world = new World();
    expect(world.isAliveOnPosition(0, 0)).toBe(false);
  });

  it('leaves alive the center cell when are three cell in a row', () => {
    const world = new World([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }]);
    const evolved = world.evolve();
    expect(evolved.getCells().length).toBe(3);
    expect(evolved.isAliveOnPosition(1, 0)).toBe(true);
    expect(evolved.isAliveOnPosition(1, -1)).toBe(true);
    expect(evolved.isAliveOnPosition(1, 1)).toBe(true);
  });

  it('evolves diagonal cells', () => {
    const world = new World([{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }]);
    const evolved = world.evolve();
    expect(evolved.getCells().length).toBe(1);
    expect(evolved.isAliveOnPosition(1, 1)).toBe(true);
  });

  it('evolves four cells next to each other', () => {
    const world = new World([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ]);
    const evolved = world.evolve();
    expect(evolved.getCells().length).toBe(4);
    expect(evolved.isAliveOnPosition(1, 1)).toBe(true);
  });

  it('should remove duplicates', () => {
    const items = [
      {x: 1, y: 2},
      {x: 2, y: 2},
      {x: 2, y: 2},
      {x: 1, y: 2},
    ];
    expect(removeDuplicates(items).length).toBe(2);
  });

  it('should generate candidates around single cell', () => {
    const world = new World([{ x: 0, y: 0 }, { x: 1, y: 0 }]);
    const candidates = removeDuplicates(world.generateCandidates());
    expect(candidates.length).toBe(12);
  });
});
