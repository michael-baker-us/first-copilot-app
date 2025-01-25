function handleResponse(elementId, data, isError = false) {
    const responseElement = document.getElementById(elementId);
    responseElement.innerHTML = isError ? '<code>Error: ' + data + '</code>' : '<code>' + data + '</code>';
    responseElement.style.display = 'block';
}

function pingServer() {
    fetch('/ping')
        .then(response => response.text())
        .then(data => handleResponse('pingResponse', data))
        .catch(error => handleResponse('pingResponse', error, true));
}

function clearResponse() {
    const pingResponse = document.getElementById('pingResponse');
    pingResponse.innerHTML = '';
    pingResponse.style.display = 'none';
}

function addRecord() {
    const value = document.getElementById('recordInput').value;
    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: value })
    })
    .then(response => response.json())
    .then(data => handleResponse('addResponse', 'Added: ' + JSON.stringify(data)))
    .catch(error => handleResponse('addResponse', error, true));
}

function readRecords() {
    fetch('/read')
        .then(response => response.json())
        .then(data => handleResponse('readResponse', JSON.stringify(data, null, 2)))
        .catch(error => handleResponse('readResponse', error, true));
}

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function initializeGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => makeMove(index));
    });
    updateBoard();
}

function makeMove(index) {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateBoard();
        checkWinner();
    }
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            handleResponse('gameStatus', `Player ${board[a]} wins!`);
            gameActive = false;
            animateWinningCells(combination);
            return;
        }
    }

    if (!board.includes('')) {
        handleResponse('gameStatus', 'It\'s a draw!');
        gameActive = false;
    }
}

function animateWinningCells(combination) {
    combination.forEach(index => {
        const cell = document.querySelectorAll('.cell')[index];
        cell.classList.add('winning-cell');
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    updateBoard();
    const gameStatus = document.getElementById('gameStatus');
    gameStatus.innerHTML = '';
    gameStatus.style.display = 'none';
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('winning-cell');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    document.getElementById('resetButton').addEventListener('click', resetGame);
    updateCalcDisplay();
});

function calculate(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    let result;

    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            result = num1 / num2;
            break;
        default:
            result = 'Invalid operation';
    }

    document.getElementById('calcResult').innerText = `Result: ${result}`;
}

let calcDisplay = '';

function updateCalcDisplay() {
    document.getElementById('calcDisplay').innerText = calcDisplay || '0';
}

function appendToCalcDisplay(value) {
    calcDisplay += value;
    updateCalcDisplay();
}

function clearCalcDisplay() {
    calcDisplay = '';
    updateCalcDisplay();
}

function calculateResult() {
    try {
        calcDisplay = eval(calcDisplay).toString();
    } catch (e) {
        calcDisplay = 'Error';
    }
    updateCalcDisplay();
}
