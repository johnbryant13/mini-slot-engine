const { SYMBOL_POOL } = require("./symbols");

function spinGrid(rows = 3, reels = 3) {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const rowSymbols = [];
    for (let reel = 0; reel < reels; reel++) {
      const randomIndex = Math.floor(Math.random() * SYMBOL_POOL.length);
      rowSymbols.push(SYMBOL_POOL[randomIndex]);
    }
    grid.push(rowSymbols);
  }
  return grid;
}

module.exports = {
  spinGrid
};
