const readline = require("readline");
const { Player, spin } = require("./engine/gameEngine");
const { simulateRTP } = require("./engine/simulator");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const player = new Player(100);

console.log("🎰 Welcome to Mini Slot Machine!");
console.log("Type 'q' to quit.\n");

rl.question("Enter bet amount (or 'q' to quit, 's' to simulate RTP): ", (input) => {
  if (input.toLowerCase() === "q") {
    rl.close();
    return;
  }

  if (input.toLowerCase() === "s") {
    simulateRTP(100000, 1);
    return askBet();
  }

  const bet = Number(input);
  if (isNaN(bet)) {
    console.log("Invalid bet\n");
    return askBet();
  }

  try {
    spin(player, bet);
  } catch (err) {
    console.error(err.message);
  }

  console.log("");
  askBet();
});



function askBet() {
  console.log(`Balance: ${player.balance.toFixed(2)}`);
  rl.question("Enter bet amount (or 'q' to quit): ", (input) => {
    if (input.toLowerCase() === "q") {
      rl.close();
      return;
    }

    const bet = Number(input);
    if (isNaN(bet)) {
      console.log("Invalid bet\n");
      return askBet();
    }

    try {
      spin(player, bet);
    } catch (err) {
      console.error(err.message);
    }

    console.log("");
    askBet();
  });
}

askBet();


