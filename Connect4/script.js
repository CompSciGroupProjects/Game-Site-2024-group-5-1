document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const result = document.querySelector('#result');
    const displayCurrentPlayer = document.querySelector('#current-player');
    const resetButton = document.querySelector('#reset-button');
    let currentPlayer = 1;
    const width = 7;
    const height = 6;
    const squares = [];
    let gameOver = false;

    for (let i = 0; i < width * height; i++) {
        const square = document.createElement('div');
        square.setAttribute('data-id', i);
        square.classList.add('square');
        grid.appendChild(square);
        squares.push(square);

        square.addEventListener('click', () => {
            if (gameOver || square.classList.contains('player1') || square.classList.contains('player2')) {
                result.textContent = 'Spot already taken. Choose another spot.';
                return;
            }

            let position = parseInt(square.getAttribute('data-id'));
            const columnStart = position % width;

            if (squares[columnStart].classList.contains('player1') || squares[columnStart].classList.contains('player2')) {
                result.textContent = 'Column is full. Choose another column.';
                return;
            }

            while (position + width < width * height && !squares[position + width].classList.contains('player1') && !squares[position + width].classList.contains('player2')) {
                position += width;
            }

            if (currentPlayer === 1) {
                squares[position].classList.add('player1', 'filled');
                currentPlayer = 2;
            } else {
                squares[position].classList.add('player2', 'filled');
                currentPlayer = 1;
            }

            if (!gameOver) {
                displayCurrentPlayer.textContent = currentPlayer;
                result.textContent = '';
            }

            checkBoard();
        });
    }

    const winningArrays = [
        // Horizontal
        [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
        [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
        [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
        [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
        [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
        [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],
        // Vertical
        [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35], [1, 8, 15, 22],
        [8, 15, 22, 29], [15, 22, 29, 36], [2, 9, 16, 23], [9, 16, 23, 30],
        [16, 23, 30, 37], [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
        [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39], [5, 12, 19, 26],
        [12, 19, 26, 33], [19, 26, 33, 40], [6, 13, 20, 27], [13, 20, 27, 34],
        [20, 27, 34, 41],
        // Diagonal
        [3, 9, 15, 21], [4, 10, 16, 22], [5, 11, 17, 23], [6, 12, 18, 24],
        [10, 16, 22, 28], [11, 17, 23, 29], [12, 18, 24, 30], [13, 19, 25, 31],
        [17, 23, 29, 35], [18, 24, 30, 36], [19, 25, 31, 37], [20, 26, 32, 38],
        [0, 8, 16, 24], [1, 9, 17, 25], [2, 10, 18, 26], [3, 11, 19, 27],
        [7, 15, 23, 31], [8, 16, 24, 32], [9, 17, 25, 33], [10, 18, 26, 34],
        [14, 22, 30, 38], [15, 23, 31, 39], [16, 24, 32, 40], [17, 25, 33, 41]
    ];

    function checkBoard() {
        let tie = true;

        for (let y = 0; y < winningArrays.length; y++) {
            const [a, b, c, d] = winningArrays[y];
            const square1 = squares[a];
            const square2 = squares[b];
            const square3 = squares[c];
            const square4 = squares[d];

            if (
                square1.classList.contains('player1') &&
                square2.classList.contains('player1') &&
                square3.classList.contains('player1') &&
                square4.classList.contains('player1')
            ) {
                result.textContent = 'Player 1 Wins!';
                disableBoard();
                gameOver = true;
                displayCurrentPlayer.textContent = '';
                return;
            } else if (
                square1.classList.contains('player2') &&
                square2.classList.contains('player2') &&
                square3.classList.contains('player2') &&
                square4.classList.contains('player2')
            ) {
                result.textContent = 'Player 2 Wins!';
                disableBoard();
                gameOver = true;
                displayCurrentPlayer.textContent = '';
                return;
            }
        }

        squares.forEach(square => {
            if (!square.classList.contains('player1') && !square.classList.contains('player2')) {
                tie = false;
            }
        });

        if (tie) {
            result.textContent = 'It\'s a Tie!';
            disableBoard();
            gameOver = true;
            displayCurrentPlayer.textContent = '';
        }
    }

    function disableBoard() {
        squares.forEach(square => {
            square.style.pointerEvents = 'none';
        });
    }

    function resetBoard() {
        squares.forEach(square => {
            square.classList.remove('player1', 'player2', 'filled');
            square.style.pointerEvents = 'auto';
        });
        currentPlayer = 1;
        gameOver = false;
        displayCurrentPlayer.textContent = '1';
        result.textContent = '';
    }

    resetButton.addEventListener('click', resetBoard);
});