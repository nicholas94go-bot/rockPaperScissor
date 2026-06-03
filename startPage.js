const CHOICES = ["rock", "paper", "scissors"];
const MAX_ROUNDS = 5;

const gameTracker = {
  humanChoices: [],
  computerChoices: [],
  stats: { humanWins: 0, computerWins: 0, ties: 0 },
};

function startBrowserGame() {
  alert(
    "=== WELCOME TO ROCK, PAPER, SCISSORS ===\nClick OK to start your 5-round match!",
  );

  while (gameTracker.humanChoices.length < MAX_ROUNDS) {
    const currentRound = gameTracker.humanChoices.length + 1;

    // Open a browser input popup
    const userInput = prompt(
      `[Round ${currentRound}/${MAX_ROUNDS}]\nType rock, paper, or scissors:`,
    );

    // Handle the user clicking "Cancel"
    if (userInput === null) {
      alert("Game canceled by user.");
      return;
    }

    const humanSelection = userInput.trim().toLowerCase();

    if (!CHOICES.includes(humanSelection)) {
      alert(
        "❌ Invalid choice! please check typos: rock, paper, or scissors.",
      );
      continue;
    }

    playRound(humanSelection);
  }
}

function playRound(humanSelection) {
  const computerSelection = CHOICES[Math.floor(Math.random() * CHOICES.length)];

  gameTracker.humanChoices.push(humanSelection);
  gameTracker.computerChoices.push(computerSelection);

  const result = getRoundWinner(humanSelection, computerSelection);
  updateStats(result);

  // Alert the result of the current round
  alert(
    `Round ${gameTracker.humanChoices.length}/${MAX_ROUNDS}\n\n` +
      `You chose: ${humanSelection.toUpperCase()}\n` +
      `Computer chose: ${computerSelection.toUpperCase()}\n\n` +
      `Winner: ${result === "tie" ? "IT'S A TIE!" : result.toUpperCase()}\n\n` +
      `Score: Human ${gameTracker.stats.humanWins} | Computer ${gameTracker.stats.computerWins} | Ties ${gameTracker.stats.ties}`,
  );

  if (gameTracker.humanChoices.length === MAX_ROUNDS) {
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

function displayFinalWinner() {
  const { humanWins, computerWins } = gameTracker.stats;
  let finalMessage = "=== FINAL MATCH RESULTS ===\n\n";

  if (humanWins > computerWins) {
    finalMessage += `🎉 You won the series (${humanWins} to ${computerWins})!`;
  } else if (computerWins > humanWins) {
    finalMessage += `🤖 The computer won the series (${computerWins} to ${humanWins}).`;
  } else {
    finalMessage += `🤝 The match ended in an overall tie (${humanWins} to ${computerWins})!`;
  }

  alert(finalMessage);
}

// Fire the game window loops immediately
startBrowserGame();
