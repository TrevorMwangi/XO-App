let playerTurn = "x"; // Player 1 starts with "x"
let moves = 0;
let isGameOver = false;
let span = document.getElementsByTagName("span");
let player1Score = 0;
let computerScore = 0;
let gamesPlayed = 0;

function play(cell) {
    if (cell.dataset.player === "none" && !isGameOver) {
        cell.innerHTML = playerTurn;
        cell.dataset.player = playerTurn;
        moves++;
        checkWinner();

        if (!isGameOver && playerTurn === "x") {
            playerTurn = "o"; // Switch turns to Computer
            computerMove(); // Computer makes its move immediately
        }
    }
}

function computerMove() {
    let bestMove = null;

    // Find the first empty spot for the computer to play
    for (let i = 0; i < span.length; i++) {
        if (span[i].dataset.player === "none") {
            bestMove = i;
            break;
        }
    }

    if (bestMove !== null) {
        span[bestMove].innerHTML = "o"; // Computer makes its move
        span[bestMove].dataset.player = "o";
        moves++;
        checkWinner();
        if (!isGameOver) playerTurn = "x"; // Switch turn back to Player 1
    }
}

function checkWinner() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    // Check all win conditions
    for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (span[a].dataset.player === span[b].dataset.player && span[b].dataset.player === span[c].dataset.player && span[a].dataset.player !== "none") {
            gameOver(span[a].dataset.player); // Declare winner
            return;
        }
    }

    // Check for a draw
    if (moves === 9 && !isGameOver) {
        draw();
    }
}

function gameOver(winner) {
    isGameOver = true;
    if (winner === "x") {
        player1Score++;
        updateScore();
        displayMessage("Player 1 Wins!");
    } else if (winner === "o") {
        computerScore++;
        updateScore();
        displayMessage("Computer Wins!");
    }
}

function draw() {
    isGameOver = true;
    displayMessage("It's a Draw!");
}

function displayMessage(message) {
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert";
    alertDiv.innerHTML = `<b>${message}</b><br><br><button onclick="playAgain()">Play Again</button>`;
    document.body.appendChild(alertDiv);
}

function updateScore() {
    document.getElementById("player1Score").innerText = player1Score;
    document.getElementById("computerScore").innerText = computerScore;
}

function playAgain() {
    document.querySelectorAll(".alert").forEach(alert => alert.remove());
    resetGame();
    isGameOver = false;
}

function resetGame() {
    for (let i = 0; i < span.length; i++) {
        span[i].dataset.player = "none";
        span[i].innerHTML = "&nbsp;";
    }
    playerTurn = "x"; // Player 1 always starts
    moves = 0;
}