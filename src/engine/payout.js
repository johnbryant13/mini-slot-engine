// src/engine/payout.js

const { SYMBOLS } = require("./reels");

/**
 * Payout table
 * Multiplier is applied to the bet
 */
const PAYOUT_TABLE = {
  [SYMBOLS.CHERRY]: 4.8,
  [SYMBOLS.LEMON]: 3,
  [SYMBOLS.BAR]: 19,
};



/**
 * Evaluates the spin result and returns win amount
 * @param {string[]} symbols - result of spin, e.g. ["CHERRY", "CHERRY", "CHERRY"]
 * @param {number} bet
 */
function calculatePayout(symbols, bet) {
  // Check if all symbols match
  const allMatch = symbols.every(
    (symbol) => symbol === symbols[0]
  );

  if (!allMatch) {
    return 0;
  }

  const symbol = symbols[0];
  const multiplier = PAYOUT_TABLE[symbol] || 0;

  return bet * multiplier;
}

module.exports = {
  calculatePayout,
};
