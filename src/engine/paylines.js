// Each payline is an array of [row, col]
const PAYLINES = [
  [[0,0],[0,1],[0,2]], // top row
  [[1,0],[1,1],[1,2]], // middle row
  [[2,0],[2,1],[2,2]], // bottom row
  [[0,0],[1,1],[2,2]], // diagonal top-left → bottom-right
  [[2,0],[1,1],[0,2]]  // diagonal bottom-left → top-right
];

module.exports = { PAYLINES };
