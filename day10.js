const test = `
16
10
15
5
1
11
7
19
6
12
4
`;

const test2 = `
28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3
`;

function day10a(data) {
  const nums = data
    .trim()
    .split('\n')
    .map((x) => x * 1)
    .sort((a, b) => a - b);

  let diffsOf1 = 0;
  let diffsOf3 = 1;
  let diff;

  for (let i = 0; i < nums.length; i++) {
    diff = nums[i] - (nums[i - 1] || 0);
    if (diff === 1) {
      diffsOf1 += 1;
    }
    if (diff === 3) {
      diffsOf3 += 1;
    }
  }
  return diffsOf1 * diffsOf3;
}

console.log(day10a(test)); // 35
console.log(day10a(test2)); // 220

// this falls over on the real data :( second attempt below
function day10bRecursive(data) {
  const adaptors = data
    .trim()
    .split('\n')
    .map((x) => x * 1)
    .sort((a, b) => a - b);

  function howManyWaysToReachEnd(startIndex = -1) {
    const currentAdaptor = adaptors[startIndex] || 0;
    if (startIndex >= adaptors.length - 1) {
      return 1;
    }
    let count = 0;
    for (
      let i = startIndex + 1;
      i < adaptors.length && adaptors[i] - currentAdaptor <= 3;
      i++
    ) {
      count += howManyWaysToReachEnd(i);
    }
    return count;
  }

  return howManyWaysToReachEnd();
}

console.log(day10bRecursive(test)); // 8
console.log(day10bRecursive(test2)); // 19208

function day10b(data) {
  const adaptors = data
    .trim()
    .split('\n')
    .map((x) => x * 1)
    .sort((a, b) => a - b)
    .map((jolts) => ({ jolts }));

  adaptors.unshift({jolts: 0});

  for (let i = adaptors.length - 1; i >= 0; i--) {
    let currentJolts = adaptors[i].jolts;
    const howManyWays = adaptors
      .slice(i + 1)
      .filter((a) => a && a.jolts - currentJolts <= 3)
      .reduce((acc, a) => acc + a.howManyWays, 0);
    adaptors[i].howManyWays = howManyWays || 1;
  }
  return adaptors[0].howManyWays
}

console.log(day10b(test)); // 8
console.log(day10b(test2)); // 19208
