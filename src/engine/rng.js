// src/engine/rng.js

/**
 * Generates a random integer between min (inclusive) and max (exclusive)
 * In real iGaming systems, this would be a certified RNG
 */
function getRandomInt(min, max) {
  if (min >= max) {
    throw new Error("Invalid RNG range");
  }

  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  getRandomInt,
};
