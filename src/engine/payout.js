const { SYMBOLS } = require("./symbols");

const PAYOUT_MULTIPLIERS = {
  [SYMBOLS.CHERRY]: 1,
  [SYMBOLS.LEMON]: 0.5,
  [SYMBOLS.BAR]: 2
};


function calculateLineWin(symbol, bet) {
  return PAYOUT_MULTIPLIERS[symbol] * bet;
}

module.exports = {
  calculateLineWin
};
