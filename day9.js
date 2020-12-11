var test = `
35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576
`;

function hasPair(nums, check) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (check(nums[i], nums[j])) {
        return true;
      }
    }
  }
  return false;
}

function day9a(data, preamble) {
  const nums = data
    .trim()
    .split('\n')
    .map((x) => x * 1);

  for (let i = preamble; i < nums.length; i++) {
    if (!hasPair(nums.slice(i - preamble, i), (a, b) => a + b === nums[i])) {
      return nums[i];
    }
  }
}

console.log(day9a(test, 5)); // 127

const invalidNumber = day9a(test, 5); //127

function day9b(data, targetNumber) {
  const nums = data
    .trim()
    .split('\n')
    .map((x) => x * 1);

  let rangeStart = 0;
  let rangeEnd = 0;
  let sum = 0;
  while (rangeStart < nums.length) {
    sum += nums[rangeEnd];
    rangeEnd += 1;
    if (sum === targetNumber) {
      return nums
        .slice(rangeStart, rangeEnd)
        .reduce((acc, val) => [
          Math.min(acc.length ? acc[0] : acc, val),
          Math.max(acc.length ? acc[1] : acc, val),
        ])
        .reduce((acc, val) => acc + val, 0);
    }
    if (sum > targetNumber) {
      rangeStart += 1;
      rangeEnd = rangeStart;
      sum = 0;
    }
  }
}

console.log(day9b(test, invalidNumber)); // 62
