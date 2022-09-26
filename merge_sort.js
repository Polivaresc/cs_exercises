// MERGE SORT

function mergeSort(arr) {
    if (arr.length === 1) {
        return arr
    }
    const half = Math.ceil(arr.length/2)

    const leftHalf = mergeSort(arr.slice(0, half))
    const rightHalf = mergeSort(arr.slice(half))

    console.log({leftHalf, rightHalf, arr})

    return mergeStep(leftHalf, rightHalf)
}

function mergeStep(arr1, arr2) {
    let sortedArr = []
    const totalLength = arr1.length + arr2.length
    for (let i = 0; i < totalLength; i++) {
        if (!arr1.length) {
            return sortedArr.concat(arr2)
        }
        if (!arr2.length) {
            return sortedArr.concat(arr1)
        }
        const nextNumber = arr1[0] < arr2[0] ? arr1.shift() : arr2.shift()
        sortedArr.push(nextNumber)
    }
}

const a = [8, 6, 1, 7, 3, 0]

// console.log(mergeSort(a))
// console.log(mergeStep([6, 2, 3], [5, 7]))