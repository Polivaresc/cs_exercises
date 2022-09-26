// QUESTION 1

function sumRange(n) {
    if (n === 1) {
        return 1
    }
    return n + sumRange(n-1)
}
sumRange(3)


// QUESTION 2

function power(x, n) {
    if (x === 0) {
        return 1
    }
    return n * power(x-1, n)
}
power(2, 4)


// QUESTION 3

function factorial(n) {
    if (n === 1) {
        return 1
    }
    return n * factorial(n-1)
}
factorial(5)


// QUESTION 4

function all(arr, callback) {
    if (arr.length) {
        let value = arr.pop()
        const validation = callback(value)
        if (validation) {
            return all(arr, callback) && validation
        }
        return false
    }
    return true
}

let allAreLessThanSeven = all([1,2,9], function(num){
    return num < 7;
});

let allAreLessThanTen = all([1,2,9], function(num){
    return num < 10;
});


// QUESTION 5

function productOfArray(array) {
    if (array.length) {
        return array.pop() * productOfArray(array)
    }
    return 1
}


// QUESTION 6

function contains(obj, value) {
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            return contains(obj[key], value)
        }
        if (obj[key] === value) {
            return true
        }
    }
    return false
}

let nestedObject = {
    data: {
        info: {
            stuff: {
                thing: {
                    moreStuff: {
                        magicNumber: 44,
                        something: 'foo2'
                    }
                }
            }
        }
    }
}


// QUESTION 7

function totalIntegers(arr) {
    if (arr.length === 0) return 0

    let total = 0
    const value = arr.pop()

    if (Array.isArray(value)) {
        total += totalIntegers(value)
    } else if (Number.isInteger(value)) {
        total += 1
    }
    return total + totalIntegers(arr)
}

var seven = totalIntegers([[[5], 3], 0, 2, ['foo'], [], [4, [5, 6]]]);


// FIBONACCI

function fibs(n) {
    let total = [0, 1]

    if (n === 0) return []

    if (n === 1) return [0]

    if (n > 1) {
        for (let i = 2; i < n; ++i) {
            total[i] = total[i-2] + total[i-1]
        }
        return total
    }
}

function fibsRec(n) {
    if (n === 0) return []
    if (n === 1) return [0]
    if (n === 2) return [0, 1]
    const arr = fibsRec(n - 1)
    return [...arr, arr[n-2] + arr[n-3]]
}
