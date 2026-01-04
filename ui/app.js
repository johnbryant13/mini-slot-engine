// Weighted symbols
const SYMBOLS = ["CHERRY", "LEMON", "BAR"];
const SYMBOL_WEIGHTS = { CHERRY: 5, LEMON: 4, BAR: 1 };
const SYMBOL_POOL = Object.entries(SYMBOL_WEIGHTS).flatMap(([s, w]) => Array(w).fill(s));

// Paylines
const PAYLINES = [
  [0,0,0],
  [1,1,1],
  [2,2,2],
  [0,1,2],
  [2,1,0]
];

const PAYOUTS = { CHERRY: 0.5, LEMON: 1, BAR: 3 };

let balance = 100;

const gridEl = document.getElementById("grid");
const spinBtn = document.getElementById("spinBtn");
const balanceEl = document.getElementById("balance");
const messagesEl = document.getElementById("messages");
const betInput = document.getElementById("bet");

function spinGrid(rows=3, reels=3) {
  const grid = [];
  for (let r=0; r<rows; r++){
    const rowSymbols = [];
    for (let c=0; c<reels; c++){
      const randomIndex = Math.floor(Math.random()*SYMBOL_POOL.length);
      rowSymbols.push(SYMBOL_POOL[randomIndex]);
    }
    grid.push(rowSymbols);
  }
  return grid;
}

function getPaylineSymbols(grid, payline) {
  return payline.map((row, col) => grid[row][col]);
}

function isWinningLine(symbols) {
  return symbols.every(s => s === symbols[0]);
}

function calculateLineWin(symbol, bet) {
  return PAYOUTS[symbol] * bet;
}

function renderGrid(grid, winningCells=[]) {
  gridEl.innerHTML = "";
  for (let r=0; r<grid.length; r++){
    for (let c=0; c<grid[r].length; c++){
      const span = document.createElement("span");
      span.textContent = grid[r][c];
      if (winningCells.some(([wr, wc]) => wr===r && wc===c)) {
        span.classList.add("win");
      }
      gridEl.appendChild(span);
    }
  }
}

spinBtn.addEventListener("click", () => {
  const bet = Number(betInput.value);
  if (bet <= 0 || bet > balance) {
    messagesEl.textContent = "Invalid bet!";
    return;
  }

  balance -= bet;
  messagesEl.textContent = "";
  
  const grid = spinGrid();
  let totalWin = 0;
  const winningCells = [];

  PAYLINES.forEach((line, index) => {
    const symbols = getPaylineSymbols(grid, line);
    if (isWinningLine(symbols)) {
      const win = calculateLineWin(symbols[0], bet);
      totalWin += win;
      line.forEach((row, col) => winningCells.push([row, col]));
    }
  });

  balance += totalWin;
  balanceEl.textContent = balance.toFixed(2);
  renderGrid(grid, winningCells);

  if(totalWin>0){
    messagesEl.textContent = `🎉 You won ${totalWin.toFixed(2)}!`;
  } else {
    messagesEl.textContent = "No win this time 😢";
  }
});
