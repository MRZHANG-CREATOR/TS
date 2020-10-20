let winsArr = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
enum Player { X = 'x', O = 'o' }
let cells = document.querySelectorAll('.cell')
let currentPlayer: Player
let gameBoard = document.querySelector('.game-board')
let message = document.querySelector('#message') as HTMLDivElement
let winner = document.querySelector('#winner') as HTMLDivElement
let restart = document.querySelector('#restart') as HTMLButtonElement
let steps: number
startGame()
restart.addEventListener('click', startGame)
function startGame() {
    message.style.display = 'none'
    steps = 0
    currentPlayer = Player.X
    gameBoard.classList.remove(Player.X, Player.O)
    gameBoard.classList.add(Player.X)
    cells.forEach(function (item) {
        let cell = item as HTMLDivElement
        cell.classList.remove(Player.X, Player.O)
        cell.removeEventListener('click', clickCell)
        cell.addEventListener('click', clickCell, { once: true })//给每一个位置绑定点击事件
    })
}
console.log(cells)
function clickCell(e: MouseEvent) {
    console.log(e.target)
    let target = e.target as HTMLDivElement
    target.classList.add(currentPlayer)
    steps++
    let isWin = checkWin(currentPlayer)
    if (isWin) {
        message.style.display = 'block'
        winner.innerText = currentPlayer + '  获胜'
        console.log(currentPlayer + '玩家获胜')
        return
    }
    if (steps === 9) {
        message.style.display = 'block'
        winner.innerText = '平局'
        return
    }
    currentPlayer = currentPlayer === Player.X ? Player.O : Player.X
    gameBoard.classList.remove(Player.X, Player.O)
    gameBoard.classList.add(currentPlayer)
}
function checkWin(player: Player) {
    return winsArr.some(function (item) {
        if (hasClass(cells[item[0]], player) && hasClass(cells[item[1]], player) && hasClass(cells[item[2]], player)) {
            return true
        }
        return false
    })
}
function hasClass(el: Element, name: string) {
    return el.classList.contains(name)
}