var test = `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
`;

function getInstructions(data) {
  return data
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((string) => {
      let [op, num] = string.split(' ');
      num = num * 1;
      return {
        nextMove: op === 'jmp' ? num : 1,
        acc: op === 'acc' ? num : 0,
      };
    });
}

function day8a(data) {
  const instructions = getInstructions(data);
  let index = 0;
  let acc = 0;
  while (!instructions[index].visited) {
    instructions[index].visited = true;
    acc += instructions[index].acc;
    index += instructions[index].nextMove;
  }
  return acc;
}

console.log(day8a(test)); // 5

var test2 = `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
nop -4
acc +6
`;

function day8b(data) {
  const instructions = getInstructions(data);
  let index = 0;
  let acc = 0;
  while (index < instructions.length && !instructions[index].visited) {
    instructions[index].visited = true;
    acc += instructions[index].acc;
    index += instructions[index].nextMove;
  }
  return acc;
}

console.log(day8b(test2)); // 8
