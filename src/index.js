const MAX = 7;
const MIN = 0;

class Move {
  constructor({ history = [], coor = [] }) {
    this.history = history;
    this.coor = coor;
  }
}

// Take coordinate of the cell and return an array of next cells
function availableCells(coor) {
  const [x, y] = coor;

  const up = [
    [x - 1, y + 2],
    [x + 1, y + 2],
  ];

  const left = [
    [x - 2, y + 1],
    [x - 2, y - 1],
  ];

  const bottom = [
    [x - 1, y - 2],
    [x + 1, y - 2],
  ];

  const right = [
    [x + 2, y + 1],
    [x + 2, y - 1],
  ];

  const cells = [...up, ...bottom, ...left, ...right];

  const filteredCellls = cells.filter((cell) => {
    const [x, y] = cell;

    const xInRange = x >= MIN && x <= MAX;
    const yInRange = y >= MIN && y <= MAX;

    if (xInRange && yInRange) return cell;
  });

  return filteredCellls;
}

function knightMoves(from, to) {
  if (from[0] === to[0] && from[1] === to[1]) return from;

  let fastestPath = null;

  const initialMove = new Move({ coor: from, history: [from] });
  const queue = [initialMove];

  while (!fastestPath) {
    const currentMove = queue.shift();

    const nextCells = availableCells(currentMove.coor);
    nextCells.forEach((cell) => {
      if (cell[0] === to[0] && cell[1] === to[1]) {
        fastestPath = [...currentMove.history, cell];
      }

      const move = new Move({
        history: [...currentMove.history, cell],
        coor: cell,
      });

      queue.push(move);
    });
  }

  return fastestPath;
}

console.log(knightMoves([3, 3], [4, 3]));
