const gameBoard = () => {
    let matrix = []
    for (let i = 0; i < 8; i++) {
         for (let j = 0; j < 8; j++) {
             matrix.push([i, j])
         }
    }
    return matrix
}

const knightFactory = (position = [0, 0], visited = [position]) => {
    function isPossibleMove(move) {
        if (visited.some((pos) => JSON.stringify(pos) === JSON.stringify(move))) {
            return false
        }
        return move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7
    }

    function nextMoves() {
        const modifiers = [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2]]
        const possibleMoves = []
        modifiers.forEach((modifier) => {
            const move = [position[0] + modifier[0], position[1] + modifier[1]]
            if (isPossibleMove(move)) {
                possibleMoves.push(move)
            }
        })
        return possibleMoves
    }

    return { position, nextMoves }
}

const node = (position = [0, 0], parent = null) => {
    return { position: position, parent: parent }
}

function knightMoves(start, end) {
    let previous = null
    const initialNode = node(start)
    const queue = [initialNode]
    const path = []
    while (queue.length) {
        if (queue.some((el) => JSON.stringify(el.position) === JSON.stringify(end))) {
            let finalNode = node(end, previous)
            path.unshift(finalNode.position)
            while (finalNode.parent) {
                finalNode = finalNode.parent
                path.unshift(finalNode.position)
            }
            return path
        }

        const current = queue[0]
        const knight = knightFactory(current.position, path)
        const moves = knight.nextMoves()

        moves.forEach((move) => {
            queue.push(node(move, current))
        })
        previous = queue.shift()
    }
    return null;
}

module.exports = {
    gameBoard,
    knightFactory,
    knightMoves
}