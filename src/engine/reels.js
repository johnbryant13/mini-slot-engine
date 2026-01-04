const SYMBOL_POOL = ["CHERRY", "LEMON", "BAR"]; // simple pool, can add weights later

function spinGrid(rows = 3, reels = 3) {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < reels; c++) {
      const randomIndex = Math.floor(Math.random() * SYMBOL_POOL.length);
      row.push(SYMBOL_POOL[randomIndex]);
    }
    grid.push(row);
  }
  return grid; // must return a 2D array
}

module.exports = { spinGrid, SYMBOL_POOL };
    