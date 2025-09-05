const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const resetBtn = document.getElementById("resetBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
];

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    resetBtn.addEventListener("click", resetGame);
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function cellClicked() {
    const index = this.getAttribute("data-index");
    if(board[index] !== "" || !running) return;

    updateCell(this, index);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for(let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            highlightCells(a, b, c);
            break;
        }
    }

    if(roundWon) {
        statusText.textContent = `🔥 Player ${currentPlayer} wins!`;
        running = false;
    } else if(!board.includes("")) {
        statusText.textContent = "⚡ It's a draw!";
        running = false;
    } else {
        changePlayer();
    }
}

function highlightCells(a, b, c) {
    cells[a].classList.add("winner");
    cells[b].classList.add("winner");
    cells[c].classList.add("winner");
}

function resetGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    running = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O", "winner");
    });
}

initializeGame();