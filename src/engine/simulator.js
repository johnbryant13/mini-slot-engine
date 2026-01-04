const { Player, spin } = require("./gameEngine");

/**
 * Simulate many spins to estimate RTP
 * @param {number} spinsCount
 * @param {number} bet
 */
function simulateRTP(spinsCount = 100000, bet = 1) {
  const player = new Player(1000000); // big balance to never run out

  let totalBet = 0;
  let totalWin = 0;

  for (let i = 0; i < spinsCount; i++) {
    const result = spin(player, bet);
    totalBet += result.bet;
    totalWin += result.win;
  }

  const rtp = (totalWin / totalBet) * 100;
  console.log(`\nSimulated ${spinsCount} spins`);
  console.log(`Total Bet: ${totalBet}`);
  console.log(`Total Win: ${totalWin}`);
  console.log(`Estimated RTP: ${rtp.toFixed(2)}%\n`);
}

module.exports = {
  simulateRTP
};
