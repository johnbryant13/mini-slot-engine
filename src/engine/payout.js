const { SYMBOLS } = require("./symbols");

const PAYOUT_MULTIPLIERS = {
  [SYMBOLS.CHERRY]: 1,
  [SYMBOLS.LEMON]: 1,
  [SYMBOLS.BAR]: 3
};

function calculateLineWin(symbol, bet) {
  return PAYOUT_MULTIPLIERS[symbol] * bet;
}

module.exports = { calculateLineWin };
