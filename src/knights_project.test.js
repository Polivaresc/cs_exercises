const knightsProject = require('./knights_project')
const knightFactory = knightsProject.knightFactory()
const gameBoard = knightsProject.gameBoard()

test('knight exists', () => {
    expect(knightFactory.position).toStrictEqual([0, 0])
})

test('gameBoard creates 8x8 board', () => {
    expect(gameBoard[44]).toStrictEqual([5, 4])
    expect(gameBoard[0]).toStrictEqual([0, 0])
    expect(gameBoard[63]).toStrictEqual([7, 7])
    expect(gameBoard[70]).toBeUndefined()
})

test('get next moves', () => {
    const nextMoves = knightFactory.nextMoves()
    expect(nextMoves).toStrictEqual([[2, 1], [1, 2]])
})

test('returns shortest path', () => {
    expect(knightsProject.knightMoves([4, 3], [5, 3])).toStrictEqual([[ 4, 3 ], [ 2, 2 ], [ 4, 1 ], [ 5, 3 ]])
    expect(knightsProject.knightMoves([4, 3], [4, 3])).toStrictEqual([[ 4, 3 ]])
})