const { Player, spin } = require("./engine/gameEngine");

const NUM_SPINS = 100000;  // simulate 100k spins
const BET = 1;              // 1 unit per spin

let totalBet = 0;
let totalWin = 0;

// Player needs enough balance for all spins in the simulation
const player = new Player(NUM_SPINS * BET);

for (let i = 0; i < NUM_SPINS; i++) {
  const result = spin(player, BET);
  totalBet += result.bet;
  totalWin += result.win;
}

// Calculate RTP
const rtp = (totalWin / totalBet) * 100;

console.log(`Simulated ${NUM_SPINS} spins`);
console.log(`Total Bet: ${totalBet}`);
console.log(`Total Win: ${totalWin}`);
console.log(`Estimated RTP: ${rtp.toFixed(2)}%`);
