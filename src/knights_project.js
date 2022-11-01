const gameBoard = () => {
    let matrix = []
    for (let i = 0; i < 8; i++) {
         for (let j = 0; j < 8; j++) {
             matrix.push([i, j])
         }
    }
    return matrix
}

const knight = () => {
    return { coordinate: [0, 0] }
}

const knightMoves = () => {

}

module.exports = {
    gameBoard,
    knight,
    knightMoves
}