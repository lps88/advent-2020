const test = `
939
7,13,x,x,59,x,31,19
`;

function day13a(data) {
  const [a, b] = data.trim().split('\n');
  const arrivalTime = a * 1;
  const buses = b
    .split(',')
    .filter((b) => b !== 'x')
    .map((b) => b * 1);
  let busTime = arrivalTime;
  while (true) {
    const bus = buses.find((b) => busTime % b === 0);
    if (bus) {
      return (busTime - arrivalTime) * bus;
    }
    busTime++;
  }
}

console.log(day13a(test)); // 295

function day13b(data) {
  const [_, b] = data.trim().split('\n');
  const buses = b
    .split(',')
    .map((b, i) => ({ id: b * 1, offset: i }))
    .filter((b) => !!b.id)
    .sort((a, b) => b.id - a.id);

  const longestBusRoute = buses[0].id;
  let checkPoint = longestBusRoute - buses[0].offset;
  while (true) {
    const isTheWinner = buses.every(bus => (checkPoint + bus.offset) % bus.id === 0)
    if (isTheWinner) {
      return checkPoint;
    }
    checkPoint += longestBusRoute;
  }
}

function day13bTest(buses){
  return day13b(`
    not a bus number
    ${buses}
  `)
}

console.log(day13bTest('17,x,13,19')); // 3417
console.log(day13bTest('67,7,59,61')); // 754018
console.log(day13bTest('67,x,7,59,61')); // 779210
console.log(day13bTest('67,7,x,59,61')); // 1261476
console.log(day13bTest('1789,37,47,1889')); // 1202161486

console.log(day13b(test)); // 1068781
