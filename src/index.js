const readline = require("readline-sync");
const { Player, spin } = require("./engine/gameEngine");

// Create a player with starting balance
const player = new Player(100);

console.log("🎰 Welcome to Mini Slot Machine!");
console.log("Type 'q' to quit.\n");

while (true) {
  console.log(`Balance: ${player.balance.toFixed(2)}`);

  // Ask for bet
  let input = readline.question("Enter bet amount (or 'q' to quit): ");
  if (input.toLowerCase() === "q") break;

  const bet = parseFloat(input);
  if (isNaN(bet) || bet <= 0) {
    console.log("❌ Invalid bet. Try again.\n");
    continue;
  }

  if (bet > player.balance) {
    console.log("❌ Insufficient balance. Try again.\n");
    continue;
  }

  // Spin the slot
  const result = spin(player, bet);

  // Show symbols
  console.log("Spun: " + result.symbols.join(" | "));
  if (result.win > 0) {
    console.log(`🎉 You won: ${result.win.toFixed(2)}!`);
  } else {
    console.log("No win this time. 😢");
  }

  console.log("---------------------------\n");

  // Stop if player is broke
  if (player.balance <= 0) {
    console.log("💀 You are out of balance. Game over!");
    break;
  }
}

console.log("Thanks for playing! Goodbye!");
