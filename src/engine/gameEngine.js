// src/engine/gameEngine.js

const { spinReels } = require("./reels");
const { calculatePayout } = require("./payout");

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
 * @param {Player} player
 * @param {number} bet
 * @returns {object} spin result
 */
function spin(player, bet) {
  // 1. Validate and deduct bet
  const actualBet = player.placeBet(bet);

  // 2. Spin reels
  const resultSymbols = spinReels();

  // 3. Calculate payout
  const win = calculatePayout(resultSymbols, actualBet);

  // 4. Update balance
  if (win > 0) {
    player.addWin(win);
  }

  // 5. Return full spin result
  return {
    symbols: resultSymbols,
    bet: actualBet,
    win,
    balance: player.balance,
  };
}

module.exports = {
  Player,
  spin,
};
