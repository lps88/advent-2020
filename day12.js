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

function toInstruction2(action, num) {
  const noop = {
    moveWaypointNS: 0,
    moveWaypointEW: 0,
    rotateWaypoint: 0,
    goForward: 0,
  };
  switch (action) {
    case 'N':
      return { ...noop, moveWaypointNS: num };
    case 'S':
      return { ...noop, moveWaypointNS: -num };
    case 'E':
      return { ...noop, moveWaypointEW: num };
    case 'W':
      return { ...noop, moveWaypointEW: -num };
    case 'L':
      return { ...noop, rotateWaypoint: 4 - num / 90 };
    case 'R':
      return { ...noop, rotateWaypoint: num / 90 };
    default:
      return { ...noop, goForward: num };
  }
}

function followInstruction(start, instruction) {
  if (instruction.rotateWaypoint) {
    const newNS = [-start.waypointEW, -start.waypointNS, start.waypointEW];
    const newEW = [start.waypointNS, -start.waypointEW, -start.waypointNS];
    return {
      ...start,
      waypointNS: newNS[instruction.rotateWaypoint - 1],
      waypointEW: newEW[instruction.rotateWaypoint - 1],
    };
  }
  return {
    shipNS: start.shipNS + instruction.goForward * start.waypointNS,
    shipEW: start.shipEW + instruction.goForward * start.waypointEW,
    waypointNS: start.waypointNS + instruction.moveWaypointNS,
    waypointEW: start.waypointEW + instruction.moveWaypointEW,
  };
}

function day12b(data) {
  let instructions = data
    .trim()
    .split('\n')
    .map((i) => {
      const [_, action, num] = /([NSEWLRF])(\d+)/.exec(i);
      return toInstruction2(action, num * 1);
    });
  let position = {
    shipNS: 0,
    shipEW: 0,
    waypointNS: 1,
    waypointEW: 10,
  };
  for (let i = 0; i < instructions.length; i++) {
    position = followInstruction(position, instructions[i]);
  }
  return Math.abs(position.shipNS) + Math.abs(position.shipEW);
}

console.log(day12b(test)); // 25
