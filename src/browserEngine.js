// browserEngine.js
const spinSound = new Audio("spin.mp3");
const winSound = new Audio("win.mp3");

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

  spinBtn.disabled = true; // prevent multiple clicks

spinWithAnimation(player, bet, (symbols, win, balance) => {
  // Highlight winning symbols
  reelsEl.innerHTML = symbols
    .map(s => {
      if (win > 0 && s === symbols[0]) {
        return `<span style="color: gold; font-weight: bold;">${s}</span>`;
      }
      return s;
    })
    .join(" | ");

  winEl.textContent = win > 0 ? `🎉 You won: ${win}!` : "No win this time 😢";
  balanceEl.textContent = balance.toFixed(2);

  // Re-enable spin button if player still has balance
  if (balance > 0) {
    spinBtn.disabled = false;
  } else {
    alert("💀 You are out of balance. Game over!");
  }
});


});


function spinWithAnimation(player, bet, callback) {
  const actualBet = player.placeBet(bet);
  let win = 0;

  // Start spin sound
  spinSound.currentTime = 0;
  spinSound.play();

  const symbolsCount = REELS.length;
  const spinDuration = 1000;
  const intervalTime = 100;
  let elapsed = 0;

  const interval = setInterval(() => {
    const animSymbols = REELS.map(reel => reel[getRandomInt(0, reel.length)]);
    callback(animSymbols, 0, player.balance);
    elapsed += intervalTime;

    if (elapsed >= spinDuration) {
      clearInterval(interval);
      const finalSymbols = spinReels();
      win = calculatePayout(finalSymbols, actualBet);
      if (win > 0) {
        player.addWin(win);
        winSound.currentTime = 0;
        winSound.play(); // play win sound
      }
      callback(finalSymbols, win, player.balance);
    }
  }, intervalTime);
}

