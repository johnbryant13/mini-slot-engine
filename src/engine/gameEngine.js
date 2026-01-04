const { spinGrid } = require("./reels");
const { PAYLINES } = require("./paylines");
const { getSymbolsForPayline, isWinningLine } = require("./paylineEvaluator");
const { calculateLineWin } = require("./payout");

/**
 * Represents a player
 * In real casinos this would be server-side account info
 */
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

/**
 * Spins the slot machine for a player
 */
function spin(player, bet) {
  const actualBet = player.placeBet(bet);
  const grid = spinGrid();

  console.log("Spin result:");
  grid.forEach(row => console.log(row.join(" | ")));

  let totalWin = 0;

  PAYLINES.forEach((payline, index) => {
    const symbols = getSymbolsForPayline(grid, payline);

    if (isWinningLine(symbols)) {
      const win = calculateLineWin(symbols[0], actualBet);
      totalWin += win;

      console.log(
        `✔ Payline ${index + 1} WIN: ${symbols.join(" | ")} → ${win}`
      );
    }
  });

  if (totalWin > 0) {
    player.addWin(totalWin);
  }

  return {
    grid,
    bet: actualBet,
    win: totalWin,
    balance: player.balance
  };
}


module.exports = {
  Player,
  spin,
};
