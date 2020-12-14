const test = `
F10
N3
F7
R90
F11
`;

const compass = 'NESW';

function toInstruction(action, num) {
  const noop = {
    moveNS: 0,
    moveEW: 0,
    changeDirection: 0,
    goForward: 0,
  };
  switch (action) {
    case 'N':
      return { ...noop, moveNS: num };
    case 'S':
      return { ...noop, moveNS: -num };
    case 'E':
      return { ...noop, moveEW: num };
    case 'W':
      return { ...noop, moveEW: -num };
    case 'L':
      return { ...noop, changeDirection: 4 - num / 90 };
    case 'R':
      return { ...noop, changeDirection: num / 90 };
    default:
      return { ...noop, goForward: num };
  }
}

function move(start, instruction) {
  if (instruction.goForward) {
    return move(
      start,
      toInstruction(compass[start.direction], instruction.goForward)
    );
  }
  return {
    ns: start.ns + instruction.moveNS,
    ew: start.ew + instruction.moveEW,
    direction: (start.direction + instruction.changeDirection) % 4,
  };
}

function day12a(data) {
  let instructions = data
    .trim()
    .split('\n')
    .map((i) => {
      const [_, action, num] = /([NSEWLRF])(\d+)/.exec(i);
      return toInstruction(action, num * 1);
    });
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
