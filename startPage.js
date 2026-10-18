const choices = ["rock", "paper", "scissors"];
const beats = { rock: "scissors", paper: "rock", scissors: "paper" };
const state = { round: 0, humanScore: 0, computerScore: 0, locked: false };

const roundNumber = document.querySelector("#roundNumber");
const humanScore = document.querySelector("#humanScore");
const computerScore = document.querySelector("#computerScore");
const gameStatus = document.querySelector("#gameStatus");
const choiceButtons = document.querySelectorAll(".choice-card");

function playRound(humanChoice) {
  if (state.locked) return;

  state.locked = true;
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  const result =
    humanChoice === computerChoice
      ? "tie"
      : beats[humanChoice] === computerChoice
        ? "human"
        : "computer";

  state.round += 1;
  if (result === "human") state.humanScore += 1;
  if (result === "computer") state.computerScore += 1;

  choiceButtons.forEach((button) => {
    button.classList.toggle("selected", button.dataset.choice === humanChoice);
  });
  humanScore.textContent = String(state.humanScore).padStart(2, "0");
  computerScore.textContent = String(state.computerScore).padStart(2, "0");

  const resultText =
    result === "tie" ? "It's a tie" : result === "human" ? "You win" : "CPU wins";
  gameStatus.textContent = `${resultText} — CPU played ${computerChoice}.`;
  roundNumber.textContent = String(Math.min(state.round + 1, 5)).padStart(2, "0");

  if (state.round === 5) {
    state.locked = true;
    gameStatus.textContent =
      state.humanScore === state.computerScore
        ? "Match draw — reset to play again."
        : state.humanScore > state.computerScore
          ? "Match won — you own the arena."
          : "Match lost — the machine takes this one.";
    return;
  }

  setTimeout(() => {
    state.locked = false;
  }, 600);
}

function resetGame() {
  state.round = 0;
  state.humanScore = 0;
  state.computerScore = 0;
  state.locked = false;
  roundNumber.textContent = "01";
  humanScore.textContent = "00";
  computerScore.textContent = "00";
  gameStatus.textContent = "The arena is yours.";
  choiceButtons.forEach((button) => button.classList.remove("selected"));
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => playRound(button.dataset.choice));
});
document.querySelector("#resetButton").addEventListener("click", resetGame);

const rulesDialog = document.querySelector("#rulesDialog");
document.querySelector("#helpButton").addEventListener("click", () => rulesDialog.showModal());
document.querySelector("#closeDialog").addEventListener("click", () => rulesDialog.close());
document.querySelector("#soundToggle").addEventListener("click", (event) => {
  const icon = event.currentTarget.querySelector(".mdi");
  icon.classList.toggle("mdi-volume-high");
  icon.classList.toggle("mdi-volume-off");
});
