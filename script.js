const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleClick = (e) => {
    const cell = e.target;
    const currentClass = currentPlayer === 'X' ? 'x' : 'o';

    if (cell.innerText === '' && gameActive) {
        cell.innerText = currentPlayer;
        if (checkWin(currentClass)) {
            gameActive = false;
            restartButton.classList.add('animate');
            alert(`${currentPlayer} wins!`);
        } else if (isDraw()) {
            gameActive = false;
            restartButton.classList.add('animate');
            alert('Draw!');
        } else {
            swapTurns();
        }
    }
};

const checkWin = (currentClass) => {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].innerText === currentPlayer;
        });
    });
};

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.innerText === 'X' || cell.innerText === 'O';
    });
};

const swapTurns = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const restartGame = () => {
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.innerText = '';
    });
    restartButton.classList.remove('animate');
};

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);
