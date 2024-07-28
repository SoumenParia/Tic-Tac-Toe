const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to handle cell clicks
function handleCellClick(cellIndex) {
    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cells[cellIndex].textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            status.textContent = `${currentPlayer} wins!`;
            gameActive = false;
        } else if (!gameBoard.includes('')) {
            status.textContent = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Current Player: ${currentPlayer}`;
        }
    }
}

// Function to check for a win
function checkWin(player) {
    for (const combo of winningCombos) {
        if (combo.every(index => gameBoard[index] === player)) {
            return true;
        }
    }
    return false;
}

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    status.textContent = `Current Player: ${currentPlayer}`;
}

// Event listener for cell clicks
cells.forEach((cell, index) => cell.addEventListener('click', () => handleCellClick(index)));

// Event listener for the reset button
resetButton.addEventListener('click', resetGame);

// Initialize the game
resetGame();
