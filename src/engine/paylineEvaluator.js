function getSymbolsForPayline(grid, payline) {
  return payline.map((rowIndex, reelIndex) => {
    return grid[rowIndex][reelIndex];
  });
}

function isWinningLine(symbols) {
  return symbols.every(symbol => symbol === symbols[0]);
}

module.exports = {
  getSymbolsForPayline,
  isWinningLine
};
