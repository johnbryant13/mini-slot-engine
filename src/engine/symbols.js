const SYMBOLS = {
  CHERRY: "CHERRY",
  LEMON: "LEMON",
  BAR: "BAR"
};

const SYMBOL_WEIGHTS = {
  CHERRY: 5,
  LEMON: 4,
  BAR: 1
};

const SYMBOL_POOL = Object.entries(SYMBOL_WEIGHTS).flatMap(([symbol, weight]) =>
  Array(weight).fill(symbol)
);

module.exports = { SYMBOLS, SYMBOL_POOL };
