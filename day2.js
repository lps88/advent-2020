
const regex = /(\d+)-(\d+) ([a-z]): (\S+)/

function day2a(passwords) {
    return passwords.split('\n').filter(Boolean).filter(isValid).length;
}

function isValid(string){
    const [ _, from, to, of, password ] = regex.exec(string);
    const count = password.split(of).length - 1;
    return count >= from && count <= to;
}

var testArray = `
1-3 a: abcde
1-3 b: cdefg
1-13 b: bsdasdasdasdb
2-9 c: ccccccccc
`;

function day2b(passwords) {
  return passwords.split('\n').filter(Boolean).filter(isValid2);
}

function isValid2(string) {
  const [_, index1, index2, letter, password] = regex.exec(string);
  const match1 = password[index1 - 1] === letter;
  const match2 = password[index2 - 1] === letter;
  return match1 != match2
}

console.log(day2b(testArray));
