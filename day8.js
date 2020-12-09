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
  return data.trim().split('\n').filter(Boolean).map((string) => {
    const [op, num] = string.split(' ');
    if (op === 'nop') {
      return [+1, 0];
    }
    if (op === 'acc') {
      return [+1, num * 1];
    }
    if (op === 'jmp') {
      return [num * 1, 0];
    }
  });
}

function day8a(data) {
  const instructions = getInstructions(data);
  let index = 0;
  let acc = 0;
  while (instructions[index].length < 3) {
    instructions[index].push('x');
    acc += instructions[index][1];
    index += instructions[index][0];
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
  while (index < instructions.length && instructions[index].length < 3) {
    instructions[index].push('x');
    acc += instructions[index][1];
    index += instructions[index][0];
  }
  return acc;
}

console.log(day8b(test2)); // 8
