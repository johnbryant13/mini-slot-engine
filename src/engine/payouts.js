const PAYOUTS = {
  CHERRY: 0.5,
  LEMON: 1,
  BAR: 3
};

function calculateLineWin(symbol, bet) {
  return (PAYOUTS[symbol] || 0) * bet;
}

module.exports = { calculateLineWin };
