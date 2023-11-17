// Your JS code
const cards = document.querySelectorAll(".memoryCard");
let isFlipped = false;
let firstCard, secondCard;
let lock = false;
let pairsMatched = 0;
const totalPairs = cards.length / 2;

cards.forEach((card) => card.addEventListener("click", flip));

function flip() {
  if (lock) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!isFlipped) {
    isFlipped = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  check();
}

function check() {
  const isMatch = firstCard.dataset.image === secondCard.dataset.image;
  isMatch ? success() : fail();
}

function success() {
  firstCard.removeEventListener("click", flip);
  secondCard.removeEventListener("click", flip);
  firstCard.classList.add("shine");
  secondCard.classList.add("shine");

  pairsMatched++;
  if (pairsMatched === totalPairs) {
    showCongratulations();
  } else {
    document.getElementById("matchSound").play();
    setTimeout(() => {
      firstCard.classList.add("remove-shine");
      secondCard.classList.add("remove-shine");
      firstCard.addEventListener(
        "transitionend",
        () => {
          firstCard.classList.remove("shine", "remove-shine");
          secondCard.classList.remove("shine", "remove-shine");
          reset();
        },
        { once: true }
      );
    }, 1000);
  }
}

function fail() {
  lock = true;
  document.getElementById("wrongSound").play();
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    reset();
  }, 1000);
}

function reset() {
  [isFlipped, lock] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function showCongratulations() {
  const overlay = document.getElementById("congratulationsOverlay");
  overlay.style.display = "block";

  const restartBtn = document.getElementById("restartBtn");
  restartBtn.addEventListener("click", restartGame);
}

function restartGame() {
  const overlay = document.getElementById("congratulationsOverlay");
  overlay.style.display = "none";

  // Add logic to reset the game state here if needed

  // Shuffle the cards again
  shuffle();
}

function shuffle() {
  cards.forEach((card) => {
    const position = Math.floor(Math.random() * 16);
    card.style.order = position;
  });
}

// Initial shuffle to avoid overlay at the beginning
shuffle();
