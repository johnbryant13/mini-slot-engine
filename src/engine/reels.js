const { SYMBOLS } = require("./symbols");

const SYMBOL_VALUES = Object.values(SYMBOLS);

// OLD (kept temporarily)
function spinReels() {
  return [
    SYMBOL_VALUES[Math.floor(Math.random() * SYMBOL_VALUES.length)],
    SYMBOL_VALUES[Math.floor(Math.random() * SYMBOL_VALUES.length)],
    SYMBOL_VALUES[Math.floor(Math.random() * SYMBOL_VALUES.length)],
  ];
}

// NEW: 3x3 grid
function spinGrid(rows = 3, reels = 3) {
  const grid = [];

  for (let row = 0; row < rows; row++) {
    const rowSymbols = [];
    for (let reel = 0; reel < reels; reel++) {
      const randomSymbol =
        SYMBOL_VALUES[Math.floor(Math.random() * SYMBOL_VALUES.length)];
      rowSymbols.push(randomSymbol);
    }
    grid.push(rowSymbols);
  }

  return grid;
}

module.exports = {
  spinReels,
  spinGrid
};
