const knightsProject = require('./knights_project')
const knight = knightsProject.knight()
const gameBoard = knightsProject.gameBoard()
const moves = knightsProject.knightMoves()

test('knight exists', () => {
    expect(knight).toStrictEqual({ coordinate: [0, 0] })
})

test('gameBoard creates 8x8 board', () => {
    expect(gameBoard[44]).toStrictEqual([5, 4])
    expect(gameBoard[0]).toStrictEqual([0, 0])
    expect(gameBoard[63]).toStrictEqual([7, 7])
    expect(gameBoard[70]).toBeUndefined()
})

