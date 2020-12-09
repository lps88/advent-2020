var test = `
light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
`;

function getColourMap(data) {
  const bagsData = data.trim().split('\n').filter(Boolean);
  return bagsData.reduce((acc, stringDesc) => {
    const [_, colour, contents] = /([a-z]+ [a-z]+) bags contain ([^\.]+)/.exec(
      stringDesc
    );
    const contentsList = contents
      .split(', ')
      .filter((s) => s !== 'no other bags')
      .map((s) => {
        const [_, colour] = /\d+ ([a-z]+ [a-z]+) bag/.exec(s);
        return colour;
      });
    acc[colour] = contentsList;
    return acc;
  }, {});
}

function containsBags(colourMap, startColour, checkColour) {
  const containedBags = colourMap[startColour];
  return (
    containedBags.indexOf(checkColour) > -1 ||
    containedBags.some((c) => containsBags(colourMap, c, checkColour))
  );
}

function day7a(data) {
  const colourMap = getColourMap(data);
  return Object.keys(colourMap).filter((startColour) =>
    containsBags(colourMap, startColour, 'shiny gold')
  ).length;
}

console.log(day7a(test)); // 4

const test2 = `
shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.
`;

function getColourMapWithNumbers(data) {
  const bagsData = data.trim().split('\n').filter(Boolean);
  return bagsData.reduce((acc, stringDesc) => {
    const [_, colour, contents] = /([a-z]+ [a-z]+) bags contain ([^\.]+)/.exec(
      stringDesc
    );
    const contentsList = contents
      .split(', ')
      .filter((s) => s !== 'no other bags')
      .reduce((acc, s) => {
        const [_, number, colour] = /(\d+) ([a-z]+ [a-z]+) bag/.exec(s);
        acc[colour] = number;
        return acc;
      }, {});
    acc[colour] = contentsList;
    return acc;
  }, {});
}

function containsHowManyBags(colourMap, startColour) {
  const innerBags = colourMap[startColour];
  return Object.keys(innerBags).reduce((acc, innerBag) => {
    const numOfInnerBags = innerBags[innerBag] * 1;
    const bagsFurtherDown =
      numOfInnerBags * containsHowManyBags(colourMap, innerBag);
    return acc + numOfInnerBags + bagsFurtherDown;
  }, 0);
}

function day7b(data) {
  const colourMap = getColourMapWithNumbers(data);
  return containsHowManyBags(colourMap, 'shiny gold');
}

console.log(day7b(test2)); // 126
