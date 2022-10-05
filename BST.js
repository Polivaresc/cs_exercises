const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

function node(data = null, left = null, right = null) {
    return {data: data, left: left, right: right}
}

function tree(arr) {
    arr.sort((a, b) => a - b)
    const cleanArray = [...new Set(arr)]
    let root = buildTree(cleanArray, 0, cleanArray.length-1)

    const minValue = (root) => {
        let min = root.data
        while (root.left != null) {
            min = root.left.data
            root = root.left
        }
        return min
    }

    const deleteRec = (root, data) => {
        if (root === null) {
            return root
        }

        if (data < root.data) {
            root.left = deleteRec(root.left, data)
        } else if (data > root.data) {
            root.right = deleteRec(root.right, data)
        } else {
            if (root.left === null) {
                return root.right
            } else if (root.right === null) {
                return root.left
            } else {
                root.data = minValue(root.right)
                root.right = deleteRec(root.right, root.data)
            }
        }
        return root
    }

    const findRec = (root, data) => {
        if (root === null) {
            return false
        }
        if (root.data === data) {
            return true
        }
        if (root.data < data) {
            return findRec(root.right, data)
        }
        if (root.data > data) {
            return findRec(root.left, data)
        }
    }

    return {
        root: function () {
            return root
        },
        insert: function (data) {
            const newNode = node(data)
            if (!root) {
                root = newNode
                return
            }
            let prev = null
            let temp = root
            while (temp) {
                if (temp.data > data) {
                    prev = temp
                    temp = temp.left
                }
                if (temp.data < data) {
                    prev = temp
                    temp = temp.right
                }
                if (temp.data === data) {
                    return //do not insert a repeated value
                }
            }
            if (prev.data > data) {
                prev.left = newNode
            } else {
                prev.right = newNode
            }
        },
        delete: function (data) {
            root = deleteRec(root, data)
        },
        find: function (data) {
            return findRec(root, data)
        }
    }
}

function buildTree(arr, start, end) {
    if (start > end) return null

    const mid = Math.floor((start + end)/2)
    let root = node(arr[mid])

    root.left = buildTree(arr, start, mid-1)
    root.right = buildTree(arr, mid+1, end)
    return root
}


// SAMPLE DATA

const sample = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const newTree = tree(sample)
prettyPrint(newTree.root())

// console.log(newTree.find(33))

// console.log(cleanArray)
// const mainRoot = buildTree(cleanArray, 0, cleanArray.length-1)

// prettyPrint(newTree.root())

