// browserEngine.js

// SYMBOLS
const SYMBOLS = { CHERRY: "CHERRY", LEMON: "LEMON", BAR: "BAR" };

// REELS
const REELS = [
  [SYMBOLS.CHERRY, SYMBOLS.CHERRY, SYMBOLS.LEMON, SYMBOLS.BAR],
  [SYMBOLS.CHERRY, SYMBOLS.LEMON, SYMBOLS.CHERRY, SYMBOLS.BAR],
  [SYMBOLS.CHERRY, SYMBOLS.LEMON, SYMBOLS.BAR, SYMBOLS.CHERRY],
];

// RNG
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Spin reels
function spinReels() {
  return REELS.map((reel) => reel[getRandomInt(0, reel.length)]);
}

// Payout
const PAYOUT_TABLE = { CHERRY: 5, LEMON: 3, BAR: 20 };
function calculatePayout(symbols, bet) {
  const allMatch = symbols.every((s) => s === symbols[0]);
  if (!allMatch) return 0;
  return bet * (PAYOUT_TABLE[symbols[0]] || 0);
}

// Player class
class Player {
  constructor(balance = 100) { this.balance = balance; }
  placeBet(amount) { this.balance -= amount; return amount; }
  addWin(amount) { this.balance += amount; }
}

// Full spin
function spin(player, bet) {
  const actualBet = player.placeBet(bet);
  const resultSymbols = spinReels();
  const win = calculatePayout(resultSymbols, actualBet);
  if (win > 0) player.addWin(win);
  return { symbols: resultSymbols, bet: actualBet, win, balance: player.balance };
}

// Browser UI
const player = new Player(100);
const reelsEl = document.getElementById("reels");
const balanceEl = document.getElementById("balance");
const winEl = document.getElementById("win");
const betEl = document.getElementById("bet");
const spinBtn = document.getElementById("spinBtn");

spinBtn.addEventListener("click", () => {
  const bet = parseFloat(betEl.value);
  if (bet <= 0 || bet > player.balance) {
    alert("Invalid bet or insufficient balance!");
    return;
  }
  const result = spin(player, bet);
  reelsEl.textContent = result.symbols.join(" | ");
  winEl.textContent = result.win > 0 ? `🎉 You won: ${result.win}!` : "No win this time 😢";
  balanceEl.textContent = result.balance.toFixed(2);
  if (player.balance <= 0) {
    alert("💀 You are out of balance. Game over!");
    spinBtn.disabled = true;
  }
});
