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
        op,
        num,
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

function followInstructions(instructions, startAcc = 0, startIndex = 0) {
  let acc = startAcc;
  let index = startIndex;
  let path = [];
  while (index < instructions.length && !instructions[index].visited) {
    instructions[index].visited = true;
    acc += instructions[index].acc;
    if (instructions[index].acc === 0) {
      path.push([index, acc]);
    }
    index += instructions[index].nextMove;
  }
  return index < instructions.length ? { path, acc } : { acc };
}

function day8b(data) {
  const instructions = getInstructions(data);
  const { acc, path } = followInstructions(instructions);

  if(!path) {
    return acc;
  }

  while (path.length) {
    let [index, previousAcc] = path.pop();
    index += instructions[index].op === 'jmp' ? 1 : instructions[index].num;
    const { path: hasHitLoop, acc: newAcc } = followInstructions(instructions, previousAcc, index)
    if(!hasHitLoop){
      return newAcc
    }
  }

  return acc;
}

console.log(day8b(test2)); // 8
console.log(day8b(test)); // 8
