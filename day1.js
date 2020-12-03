
function day1a(nums) {
    for (let i = 0; i < nums.length- 1; i++) {
        for (let j = i+1; j < nums.length; j++) {
            var num1 = nums[i] * 1;
            var num2 = nums[j] * 1;
            if(num1 + num2 === 2020) {
                return num1 * num2;
            }
        }
    }
}

var testArray = [ '1', 3, 5, 7, '1000', 1020 ]

console.log(day1a(testArray))


function day1b(nums) {
    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = i+1; j < nums.length-1; j++) {
            for (let k = j+1; k < nums.length; k++) {
                var num1 = nums[i] * 1;
                var num2 = nums[j] * 1;
                var num3 = nums[k] * 1;
                if(num1 + num2 + num3 === 2020) {
                    return num1 * num2 * num3;
                }
            }
        }
    }
    return 0;
}

var testArray1 = [ '1', 3, 5, 7, '350', '650', 1056, 1020 ]

console.log(day1b(testArray1))


function choose(x, ofY) {
    return factorial(ofY) / (factorial(x) * factorial(ofY -x))
}

function factorial(x) {
    if(x <= 0) {
        return 1;
    }
    return x * factorial(x-1);
}

//console.log(choose(5, 52), 2598960)
function integerDiv(a,b) {
    var float = a%b;
    return (a-float)/b;
}
//https://stackoverflow.com/questions/1776442/nth-combination
function chooseNonRecursive(k, n) {
    var reflect = n - k;
    if (k > reflect) {
        if (k > n) {
            return 0;
        }
        k = reflect;
    }
    if (k == 0) {
        return 1;
    }
    let returnVal = n;
    for (let i = n - k, j=k+1; i < n; i++, j--) {
        returnVal = integerDiv(returnVal * j, 1);
    }
    return returnVal;
}

console.log(chooseNonRecursive(2, 30), choose(2, 30))















