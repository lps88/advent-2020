const test = `
L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
`;

function getOccupiedNeighbours(rows, rowIndex, colIndex) {
  let isOccupied = rows[rowIndex][colIndex] === '#';
  let occupiedNeighbours = isOccupied ? -1 : 0;
  for (let r = rowIndex - 1; r <= rowIndex + 1; r++) {
    for (let c = colIndex - 1; c <= colIndex + 1; c++) {
      if (rows[r] && rows[r][c] === '#') {
        occupiedNeighbours += 1;
      }
    }
  }
  return occupiedNeighbours;
}

function getOccupiedNeighboursBySightline(rows, rowIndex, colIndex) {
  let isOccupied = rows[rowIndex][colIndex] === '#';
  let occupiedNeighbours = isOccupied ? -1 : 0;
  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      let distance = 1;
      let neighbour, neighbourRow, neighbourCol;
      do {
        neighbourRow = rowIndex + distance * r;
        neighbourCol = colIndex + distance * c;
        neighbour = rows[neighbourRow] && rows[neighbourRow][neighbourCol];
        distance += 1;
      } while (neighbour && neighbour === '.' && (r || c));
      if (neighbour === '#') {
        occupiedNeighbours += 1;
      }
    }
  }
  return occupiedNeighbours;
}

function getNewState(rows, rowIndex, colIndex, maxNeighbours, bySight) {
  const currentState = rows[rowIndex][colIndex];
  if (currentState === '.') {
    return '.';
  }
  const occupiedNeighbours = bySight
    ? getOccupiedNeighboursBySightline(rows, rowIndex, colIndex)
    : getOccupiedNeighbours(rows, rowIndex, colIndex);
  if (currentState === 'L' && occupiedNeighbours === 0) {
    return '#';
  }
  if (currentState === '#' && occupiedNeighbours >= maxNeighbours) {
    return 'L';
  }
  return currentState;
}

function iterate(rows, maxNeighbours = 4, bySight = false) {
  const newRows = [];
  let hasChanged = false;
  for (let r = 0; r <= rows.length - 1; r++) {
    let newRow = '';
    for (let c = 0; c <= rows[r].length - 1; c++) {
      const newState = getNewState(rows, r, c, maxNeighbours, bySight);
      newRow += newState;
      if (!hasChanged && newState !== rows[r][c]) {
        hasChanged = true;
      }
    }
    newRows.push(newRow);
  }
  return [newRows, hasChanged];
}

function countOccupiedSeats(rows) {
  return rows.join('').split('#').length - 1;
}

function day11a(data) {
  let rows = data.trim().split('\n');
  let hasChanged = true;
  while (hasChanged) {
    [rows, hasChanged] = iterate(rows);
  }
  return countOccupiedSeats(rows);
}

console.log(day11a(test)); // 37

function day11b(data) {
  let rows = data.trim().split('\n');
  let hasChanged = true;
  while (hasChanged) {
    [rows, hasChanged] = iterate(rows, 5, true);
  }
  return countOccupiedSeats(rows);
}

console.log(day11b(test)); // 26
