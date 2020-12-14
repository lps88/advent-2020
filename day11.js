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

function getNewState(rows, rowIndex, colIndex) {
  const currentState = rows[rowIndex][colIndex];
  if (currentState === '.') {
    return '.';
  }
  const occupiedNeighbours = getOccupiedNeighbours(rows, rowIndex, colIndex);
  if (currentState === 'L' && occupiedNeighbours === 0) {
    return '#';
  }
  if (currentState === '#' && occupiedNeighbours >= 4) {
    return 'L';
  }
  return currentState;
}

function iterate(rows) {
  const newRows = [];
  let hasChanged = false;
  for (let r = 0; r <= rows.length - 1; r++) {
    let newRow = '';
    for (let c = 0; c <= rows[r].length - 1; c++) {
      const newState = getNewState(rows, r, c);
      newRow += newState;
      if(!hasChanged && newState !== rows[r][c]){
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
