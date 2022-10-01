function node(data = null, left = null, right = null) {
    return {data: data, left: left, right: right}
}

function tree(root) {
    return {
        root: function (root) {
            return root
        },
        // insert, delete functions
    }
}

function buildTree(arr, start, end) {
    if (start > end) return null

    const mid = Math.floor((start + end)/2)
    const root = node(arr[mid])

    root.left = buildTree(arr, start, mid-1)
    root.right = buildTree(arr, mid+1, end)
    return root
}


// SAMPLE DATA

function numbers(a, b) {
    return a - b
}

const sample = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
sample.sort(numbers)
const cleanArray = [...new Set(sample)]
console.log(cleanArray)
const mainRoot = buildTree(cleanArray, 0, cleanArray.length-1)

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

prettyPrint(mainRoot)