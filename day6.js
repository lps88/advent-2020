var test = `
abc

a
b
c

ab
ac

a
a
a
a

b
`;

function countAnswers(group) {
  return [...new Set(group)].filter((x) => /[a-z]/.test(x)).length;
}

function day6a(data) {
  const groups = data.trim().split('\n\n').filter(Boolean);
  return groups.reduce(
    (accumulator, group) => accumulator + countAnswers(group),
    0
  );
}

console.log(day6a(test)); // 11

function countAnswersEvery(group) {
  const people = group.split('\n');
  return [...new Set(people[0])].filter((x) => people.slice(1).every(p => p.indexOf(x) > -1)).length;
}

function day6b(data) {
  const groups = data.trim().split('\n\n').filter(Boolean);
  return groups.reduce(
    (accumulator, group) => accumulator + countAnswersEvery(group),
    0
  );
}

console.log(day6b(test)); // 6
