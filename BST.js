// NODE FACTORY FUNCTION

const node = (data = null, left = null, right = null) => {
    return {data: data, left: left, right: right}
}


// Build tree from array
function buildTree(arr, start, end) {
    if (start > end) return null

    const mid = Math.floor((start + end)/2)
    let root = node(arr[mid])

    root.left = buildTree(arr, start, mid-1)
    root.right = buildTree(arr, mid+1, end)
    return root
}


// TREE FACTORY FUNCTION

const tree = (arr) => {

    function root() {
        arr.sort((a, b) => a - b)
        const cleanArray = [...new Set(arr)]
        return buildTree(cleanArray, 0, cleanArray.length-1)
    }

    function insert(data) {
        let newNode = node(data)
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
    }

    function __minValue(root){
        let min = root.data
        while (root.left != null) {
            min = root.left.data
            root = root.left
        }
        return min
    }

    function __removeRec(root, data) {
        if (root === null) {
            return root
        }

        if (data < root.data) {
            root.left = __removeRec(root.left, data)
        } else if (data > root.data) {
            root.right = __removeRec(root.right, data)
        } else {
            if (root.left === null) {
                return root.right
            } else if (root.right === null) {
                return root.left
            } else {
                root.data = __minValue(root.right)
                root.right = __removeRec(root.right, root.data)
            }
        }
        return root
    }

    function remove(data) {
        root = __removeRec(root, data)
    }

    function __findRec(root, data) {
        if (root === null || root.data === data) {
            return root
        }
        if (root.data < data) {
            return __findRec(root.right, data)
        }
        if (root.data > data) {
            return __findRec(root.left, data)
        }
    }

    function find(data) {
        return __findRec(root, data)
    }

    // Breath-first LevelOrder
    function levelOrder(callbackFn) {
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
    }

    // Depth-first Preorder, Inorder, Postorder

    // Preorder ROOT-LEFT-RIGHT
    function preorder(callbackFn, node = root, result = []) {
        if (!node) {
            return node
        }
        callbackFn ? callbackFn(node) : result.push(node.data)
        this.preorder(callbackFn, node.left, result)
        this.preorder(callbackFn, node.right, result)

        return result
    }

    // Inorder LEFT-ROOT-RIGHT
    function inorder(callbackFn, node = root, result = []) {
        if (!node) {
            return node
        }
        this.inorder(callbackFn, node.left, result)
        callbackFn ? callbackFn(node) : result.push(node.data)
        this.inorder(callbackFn, node.right, result)

        return result
    }

    // Postorder LEFT-RIGHT-ROOT
    function postorder(callbackFn, node = root, result = []) {
        if (!node) {
            return node
        }
        this.postorder(callbackFn, node.left, result)
        this.postorder(callbackFn, node.right, result)
        callbackFn ? callbackFn(node) : result.push(node.data)

        return result
    }

    function height(node) {
        if (!node) {
            return 0
        }
        const leftHeight = this.height(node.left)
        const rightHeight = this.height(node.right)

        return Math.max(leftHeight, rightHeight) + 1
    }

    function depth(node, current = root) {
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
    }

    function isBalanced(root) {
        if (root === null) {
            return true
        }
        const leftSubtree = root.left
        const rightSubtree = root.right

        return Math.abs(this.height(leftSubtree) - this.height(rightSubtree)) <= 1
    }

    function __traverse (root, arr) {
        if (arr) {
            arr.push(root.data)
        }
        if (root.left !== null) {
            __traverse(root.left, arr)
        }
        if (root.right !== null) {
            __traverse(root.right, arr)
        }
        return arr
    }

    function rebalance() {
        if (isBalanced(root)) {
            return root
        }
        let rebalancedArray = []
        rebalancedArray = __traverse(root, rebalancedArray)
        const balancedTree = buildTree(rebalancedArray)

        return balancedTree.root
    }

    // Function provided by The Odin project
    function prettyPrint (node, prefix = '', isLeft = true) {
        if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    return {
        root,
        insert,
        remove,
        find,
        levelOrder,
        preorder,
        inorder,
        postorder,
        height,
        depth,
        isBalanced,
        rebalance,
        prettyPrint
    }
}


// SAMPLE DATA

const sample = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const newTree = tree(sample)
newTree.prettyPrint(newTree.root())
