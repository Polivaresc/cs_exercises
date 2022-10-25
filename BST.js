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
        if (root === null || root.data === data) {
            return root
        }
        if (root.data < data) {
            return findRec(root.right, data)
        }
        if (root.data > data) {
            return findRec(root.left, data)
        }
    }

    const traverse = (root, arr) => {
        if (arr) {
            arr.push(root.data)
        }
        if (root.left !== null) {
            traverse(root.left, arr)
        }
        if (root.right !== null) {
            traverse(root.right, arr)
        }
        return arr
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
        },
        // Breath-first LevelOrder
        levelOrder: function (callbackFn) {
            if (!root) {
                return root
            }
            const queue = [root]
            const result = []
            while(queue.length) {
                const current = queue[0]
                callbackFn ? callbackFn(current) : result.push(current.data)
                if (current.left) {
                    queue.push(current.left)
                }
                if (current.right) {
                    queue.push(current.right)
                }
                queue.shift()
            }
            return result
        },
        // Depth-first Preorder, Inorder, Postorder
        // Preorder ROOT-LEFT-RIGHT
        preorder: function (callbackFn, node = root, result = []) {
            if (!node) {
                return node
            }
            callbackFn ? callbackFn(node) : result.push(node.data)
            this.preorder(callbackFn, node.left, result)
            this.preorder(callbackFn, node.right, result)

            return result
        },
        // Inorder LEFT-ROOT-RIGHT
        inorder: function (callbackFn, node = root, result = []) {
            if (!node) {
                return node
            }
            this.inorder(callbackFn, node.left, result)
            callbackFn ? callbackFn(node) : result.push(node.data)
            this.inorder(callbackFn, node.right, result)

            return result
        },
        // Postorder LEFT-RIGHT-ROOT
        postorder: function (callbackFn, node = root, result = []) {
            if (!node) {
                return node
            }
            this.postorder(callbackFn, node.left, result)
            this.postorder(callbackFn, node.right, result)
            callbackFn ? callbackFn(node) : result.push(node.data)

            return result
        },
        height: function (node) {
            if (!node) {
                return 0
            }
            const leftHeight = this.height(node.left)
            const rightHeight = this.height(node.right)

            return Math.max(leftHeight, rightHeight) + 1
        },
        depth: function (node, current = root) {
            if (!node || !current) {
                return 0
            }
            if (current.data > node.data) {
                return this.depth(node, current.left) + 1
            }
            if (current.data < node.data) {
                return this.depth(node, current.right) + 1
            }
            if (current.data === node.data) {
                return 1
            }
        },
        isBalanced: function (root) {
            if (root === null) {
                return true
            }
            const leftSubtree = root.left
            const rightSubtree = root.right

            return Math.abs(this.height(leftSubtree) - this.height(rightSubtree)) <= 1
        },
        rebalance: function () {
            if (this.isBalanced(root)) {
                return root
            }
            let rebalancedArray = []
            rebalancedArray = traverse(root, rebalancedArray)
            const balancedTree = buildTree(rebalancedArray)

            return balancedTree.root
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

console.log(newTree.rebalance())

// console.log(newTree.isBalanced(newTree.root()))

// console.log(newTree.depth(newTree.find(6345)))
// newTree.depth(newTree.find(77))

// newTree.height(newTree.root())
// console.log(newTree.height(newTree.find(77)))

// console.log(newTree.postorder())
// newTree.postorder((a) => a.data *= 2)
// prettyPrint(newTree.root())

// console.log(newTree.find(33))

// console.log(cleanArray)
// const mainRoot = buildTree(cleanArray, 0, cleanArray.length-1)

// prettyPrint(newTree.root())

