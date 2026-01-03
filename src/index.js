const { Player, spin } = require("./engine/gameEngine");

// Create player with 100 balance
const player = new Player(100);

// Spin with bet of 5
const result = spin(player, 5);

console.log(result);
