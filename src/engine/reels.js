// src/engine/reels.js

const { getRandomInt } = require("./rng");

/**
 * Define available symbols
 * In real slots, symbol frequency matters
 */
const SYMBOLS = {
  CHERRY: "CHERRY",
  LEMON: "LEMON",
  BAR: "BAR",
};

/**
 * Each reel is an array of symbols.
 * More entries = higher probability.
 */
const REELS = [
  [SYMBOLS.CHERRY, SYMBOLS.LEMON, SYMBOLS.CHERRY, SYMBOLS.BAR],
  [SYMBOLS.LEMON, SYMBOLS.CHERRY, SYMBOLS.LEMON, SYMBOLS.BAR],
  [SYMBOLS.CHERRY, SYMBOLS.LEMON, SYMBOLS.BAR, SYMBOLS.BAR],
];

/**
 * Spins all reels and returns the result
 */
function spinReels() {
  return REELS.map((reel) => {
    const index = getRandomInt(0, reel.length);
    return reel[index];
  });
}

module.exports = {
  spinReels,
  SYMBOLS,
};
