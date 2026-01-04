const spinBtn = document.getElementById("spinBtn");
const betInput = document.getElementById("bet");
const balanceEl = document.getElementById("balance");
const messagesEl = document.getElementById("messages");
const gridEl = document.getElementById("grid");

function renderGrid(grid, winningCells = []) {
  gridEl.innerHTML = "";
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const span = document.createElement("span");
      span.textContent = grid[r][c];
      if (winningCells.some(([wr, wc]) => wr === r && wc === c)) {
        span.classList.add("win");
      }
      gridEl.appendChild(span);
    }
  }
}

async function spinHandler() {
  const bet = Number(betInput.value);
  if (bet <= 0) {
    messagesEl.textContent = "Bet must be positive!";
    return;
  }

  spinBtn.disabled = true;

  try {
    const res = await fetch("/spin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bet })
    });
    const data = await res.json();

    if (data.error) {
      messagesEl.textContent = data.error;
      spinBtn.disabled = false;
      return;
    }

    renderGrid(data.grid, data.paylines);
    balanceEl.textContent = data.balance.toFixed(2);
    messagesEl.textContent = data.win > 0 ? `🎉 You won ${data.win.toFixed(2)}!` : "No win 😢";

  } catch (err) {
    messagesEl.textContent = "Server error!";
  }

  spinBtn.disabled = false;
}

spinBtn.addEventListener("click", spinHandler);
