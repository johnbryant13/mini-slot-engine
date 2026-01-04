const express = require("express");
const path = require("path");
const { Player, spin } = require("./src/engine/gameEngine");

const app = express();
const PORT = 3000;
const player = new Player(100);

app.use(express.static(path.join(__dirname, "ui")));
app.use(express.json());

app.post("/spin", (req, res) => {
  const { bet } = req.body;
  try {
    const result = spin(player, bet);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:3000`));
