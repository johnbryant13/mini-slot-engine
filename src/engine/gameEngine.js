const { spinGrid } = require("./reels");
const { calculateLineWin } = require("./payouts");
const { PAYLINES } = require("./paylines");

// helper
function getSymbolsForPayline(grid, payline) {
  return payline.map(([row, col]) => grid[row][col]);
}

function isWinningLine(symbols) {
  return symbols.every(s => s === symbols[0]);
}

class Player {
  constructor(balance = 100) {
    this.balance = balance;
  }

  placeBet(amount) {
    if (amount <= 0) throw new Error("Bet must be positive");
    if (amount > this.balance) throw new Error("Insufficient balance");
    this.balance -= amount;
    return amount;
  }

  addWin(amount) {
    this.balance += amount;
  }
}

function spin(player, bet) {
  const actualBet = player.placeBet(bet);
  const grid = spinGrid();

  let totalWin = 0;
  const winningCells = [];

  PAYLINES.forEach(line => {
    const symbols = getSymbolsForPayline(grid, line);
    if (isWinningLine(symbols)) {
      totalWin += calculateLineWin(symbols[0], actualBet);
      line.forEach(([row, col]) => winningCells.push([row, col]));
    }
  });

  if (totalWin > 0) player.addWin(totalWin);

  return {
    grid,             // ✅ must be 2D array
    win: totalWin,
    balance: player.balance,
    paylines: winningCells // ✅ array of [row,col]
  };
}

module.exports = { Player, spin };
