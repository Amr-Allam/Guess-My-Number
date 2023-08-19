"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
const displayText = function (element, message) {
  document.querySelector(element).textContent = message;
};

const check = function () {
  if (
    document.querySelector(".score-label").textContent ===
      "💥 You lost the game!" ||
    document.querySelector(".message").textContent === "🎉 Correct Number!"
  ) {
    document.querySelector(".guess").value = "";
    return;
  }
  // Empty
  let guess = document.querySelector(".guess").value;
  if (guess === "") {
    displayText(".message", "⛔ No Number!");
    return;
  }
  // Out of range
  guess = Number(guess);
  if (guess > 20 || guess < 1) {
    displayText(".message", "Out of range!");
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayText(
        ".message",
        guess > secretNumber ? "📈 Too high!" : "📉 Too low!"
      );
      score--;
      displayText(".score", score);
    } else {
      displayText(".score-label", "💥 You lost the game!");
      document.querySelector("body").style.backgroundColor = "#700808";
      displayText(".number", secretNumber);
    }

    // Win
  } else if (guess === secretNumber) {
    displayText(".message", "🎉 Correct Number!");
    displayText(".number", secretNumber);
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "200px";
    if (score > highScore) {
      displayText(".highscore", score);
      highScore = score;
    }
  }
};

const restore = function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector("body").style.backgroundColor = "#222";
  displayText(".message", "Start guessing...");
  document.querySelector(
    ".score-label"
  ).innerHTML = `<p class="score-label">💯 Score: <span class="score">20</span></p>`;
  displayText(".number", "?");
  document.querySelector(".number").style.width = "150px";
  document.querySelector(".guess").value = "";
};

document.querySelector(".check").addEventListener("click", check);
document.querySelector(".again").addEventListener("click", restore);
