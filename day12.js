const test = `
F10
N3
F7
R90
F11
`;

const compass = 'NESW';

function move(start, instruction) {
  let [_, action, num] = /([NSEWLRF])(\d+)/.exec(instruction);
  num = num * 1;
  switch (action) {
    case 'N':
      return {
        ...start,
        ns: start.ns + num,
      };
    case 'S':
      return {
        ...start,
        ns: start.ns - num,
      };
    case 'E':
      return {
        ...start,
        ew: start.ew + num,
      };
    case 'W':
      return {
        ...start,
        ew: start.ew - num,
      };
    case 'L':
    case 'R':
      const rotation = action === 'L' ? 4 - num / 90 : num / 90;
      return {
        ...start,
        direction: (start.direction + rotation) % 4,
      };
    case 'F':
      return move(start, compass[start.direction] + num);
  }
}

function day12a(data) {
  let instructions = data.trim().split('\n');
  let position = {
    ns: 0,
    ew: 0,
    direction: compass.indexOf('E'),
  };
  for (let i = 0; i < instructions.length; i++) {
    position = move(position, instructions[i]);
  }
  return Math.abs(position.ns) + Math.abs(position.ew);
}

console.log(day12a(test)); // 25
