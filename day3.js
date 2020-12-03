
var test = `
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`;

function move([fromX, fromY], [shiftX, shiftY]) {
  return [fromX + shiftX, fromY + shiftY];
}

function isTree(trees, x, y) {
  const width = trees[0].length;
  const realX = (x - 1) % width;
  const realY = y - 1;
  return trees[realY][realX] === '#';
}

function countTrees(trees, start, shift){
    let treeCount = 0;
    for (
        let position = start;
        position[1] <= trees.length;
        position = move(position, shift)
    ) {
        treeCount += isTree(trees, ...position);
    }
    return treeCount;
}

function day3a(treeMap) {
  const trees = treeMap.split('\n').filter(Boolean);
  const start = [1, 1];
  const shift = [3, 1];
  return countTrees(trees, start, shift);
}

function day3b(treeMap) {
  const trees = treeMap.split('\n').filter(Boolean);
  const start = [1, 1];

  return [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]].reduce((accumulator, value) => accumulator * countTrees(trees, start, value), 1)
}

console.log(day3b(test));