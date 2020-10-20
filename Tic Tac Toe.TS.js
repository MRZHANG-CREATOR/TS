var winsArr = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var Player;
(function (Player) {
    Player["X"] = "x";
    Player["O"] = "o";
})(Player || (Player = {}));
var cells = document.querySelectorAll('.cell');
var currentPlayer;
var gameBoard = document.querySelector('.game-board');
var message = document.querySelector('#message');
var winner = document.querySelector('#winner');
var restart = document.querySelector('#restart');
var steps;
startGame();
restart.addEventListener('click', startGame);
function startGame() {
    message.style.display = 'none';
    steps = 0;
    currentPlayer = Player.X;
    gameBoard.classList.remove(Player.X, Player.O);
    gameBoard.classList.add(Player.X);
    cells.forEach(function (item) {
        var cell = item;
        cell.classList.remove(Player.X, Player.O);
        cell.removeEventListener('click', clickCell);
        cell.addEventListener('click', clickCell, { once: true }); //给每一个位置绑定点击事件
    });
}
console.log(cells);
function clickCell(e) {
    console.log(e.target);
    var target = e.target;
    target.classList.add(currentPlayer);
    steps++;
    var isWin = checkWin(currentPlayer);
    if (isWin) {
        message.style.display = 'block';
        winner.innerText = currentPlayer + '  获胜';
        console.log(currentPlayer + '玩家获胜');
        return;
    }
    if (steps === 9) {
        message.style.display = 'block';
        winner.innerText = '平局';
        return;
    }
    currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;
    gameBoard.classList.remove(Player.X, Player.O);
    gameBoard.classList.add(currentPlayer);
}
function checkWin(player) {
    return winsArr.some(function (item) {
        if (hasClass(cells[item[0]], player) && hasClass(cells[item[1]], player) && hasClass(cells[item[2]], player)) {
            return true;
        }
        return false;
    });
}
function hasClass(el, name) {
    return el.classList.contains(name);
}
