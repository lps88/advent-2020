
var test = `
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL
`;

function fromBinary(val, char0) {
  let number = 0;
  for(let i = 1; i <= val.length; i++){
    const is0 = val[val.length - i] === char0;
    number += is0 ? 0 : Math.pow(2, i-1);
  }
  return number;
}

function getSeatNumber(seat) {
  const row = fromBinary(seat.substring(0, 7), 'F');
  const column = fromBinary(seat.substring(7, 10), 'L');
  return 8 * row + column;
}

function day5a(passportData) {
  const seats = passportData.trim().split('\n').filter(Boolean);
  return seats.reduce((acc, seat) => {
    const seatNum = getSeatNumber(seat);
    return acc > seatNum ? acc : seatNum;
  }, 0);
}

 console.log(fromBinary('BFFFBBF', 'F')); //70
 console.log(fromBinary('FFFBBBF', 'F')); //14
 console.log(fromBinary('BBFFBBF', 'F')); //102

 console.log(day5a(test) === 820);


function fromBinary2(val, chars0 = 'FL') {
  let number = 0;
  for (let i = 1; i <= val.length; i++) {
    const is0 = chars0.indexOf(val[val.length - i]) > -1
    number += is0 ? 0 : Math.pow(2, i - 1);
  }
  return number;
}

function day5b(passportData) {
  const seats = passportData.trim().split('\n').filter(Boolean);
  const sortedSeats = seats.map(s => fromBinary2(s)).sort((a, b) => a - b)
  const firstSeat = sortedSeats[0];
  for (let i = 0; i < sortedSeats.length; i++) {
    if(i + firstSeat < sortedSeats[i]) {
      return i + firstSeat;
    }
  }

}

var test2 = `
BFFFBBFLLL
BFFFBBFLLR
BFFFBBFLRL
BFFFBBFLRR
BFFFBBFRLL
BFFFBBFRRL
BFFFBBFRRR
`;


 console.log(fromBinary2('BFFFBBFRRR', 'FL')); // 567
 console.log(fromBinary2('FFFBBBFRRR', 'FL')); // 119
 console.log(fromBinary2('BBFFBBFRLL', 'FL')); // 820

console.log(day5b(test2) === fromBinary2('BFFFBBFRLR'));

