const CHOICES = ["rock", "paper", "scissors"];
const MAX_ROUNDS = 5; // Maximum round cap

const gameTracker = {
  humanChoices: [],
  computerChoices: [],
  stats: { humanWins: 0, computerWins: 0, ties: 0 },
};

function playRound(humanChoice) {
  // 1. Check if the maximum rounds limit has already been reached
  const totalRoundsPlayed = gameTracker.humanChoices.length;
  if (totalRoundsPlayed >= MAX_ROUNDS) {
    console.warn(`Game Over! Maximum limit of ${MAX_ROUNDS} rounds reached.`);
    displayFinalWinner();
    return;
  }

  // 2. Validate input
  const humanSelection = humanChoice.toLowerCase();
  if (!CHOICES.includes(humanSelection)) {
    console.error("Invalid choice! Choose rock, paper, or scissors.");
    return;
  }

  // 3. Generate computer choice
  const randomIndex = Math.floor(Math.random() * CHOICES.length);
  const computerSelection = CHOICES[randomIndex];

  // 4. Save choices to history
  gameTracker.humanChoices.push(humanSelection);
  gameTracker.computerChoices.push(computerSelection);

  // 5. Calculate winner and track data
  const result = getRoundWinner(humanSelection, computerSelection);
  updateStats(result);
  logRoundSummary(humanSelection, computerSelection, result);

  // 6. Proactively check if this was the final round
  if (gameTracker.humanChoices.length === MAX_ROUNDS) {
    console.log("FINAL ROUND COMPLETED");
    displayFinalWinner();
  }
}

function getRoundWinner(human, computer) {
  if (human === computer) return "tie";
  const winConditions = { rock: "scissors", paper: "rock", scissors: "paper" };
  return winConditions[human] === computer ? "human" : "computer";
}

function updateStats(result) {
  if (result === "human") gameTracker.stats.humanWins++;
  else if (result === "computer") gameTracker.stats.computerWins++;
  else gameTracker.stats.ties++;
}

function logRoundSummary(human, computer, result) {
  console.log(`Round ${gameTracker.humanChoices.length}/${MAX_ROUNDS}`);
  console.log(
    `Human: ${human.toUpperCase()} | Computer: ${computer.toUpperCase()}`,
  );
  console.log(`Winner: ${result.toUpperCase()}`);
  console.log("Current Score:", gameTracker.stats);
  console.log("------------------------");
}

// New helper function to declare the absolute winner
function displayFinalWinner() {
  const { humanWins, computerWins } = gameTracker.stats;
  console.log("=== FINAL MATCH RESULTS ===");
  if (humanWins > computerWins) {
    console.log(`🎉 Human wins the series (${humanWins} to ${computerWins})!`);
  } else if (computerWins > humanWins) {
    console.log(
      `🤖 Computer wins the series (${computerWins} to ${humanWins})!`,
    );
  } else {
    console.log(
      `🤝 The entire match is a tie (${humanWins} to ${computerWins})!`,
    );
  }
}
