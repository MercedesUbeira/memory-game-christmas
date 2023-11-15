const cards = document.querySelectorAll(".memoryCard");
var isFlipped = false;
var firstCard, secondCard;
var lock = false;

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
  var isMatch = firstCard.dataset.image === secondCard.dataset.image;
  isMatch ? succes() : fail();
}

function succes() {
  firstCard.removeEventListener("click", flip);
  secondCard.removeEventListener("click", flip);
  firstCard.classList.add("shine");
  secondCard.classList.add("shine");

  // Play the match sound
  document.getElementById("matchSound").play();

  // Add the setTimeout to remove the shine class after 1 second
  setTimeout(() => {
    // Add a class to smoothly transition the shine class removal
    firstCard.classList.add("remove-shine");
    secondCard.classList.add("remove-shine");

    // Remove the shine class after the transition ends
    firstCard.addEventListener("transitionend", () => {
      firstCard.classList.remove("shine", "remove-shine");
      secondCard.classList.remove("shine", "remove-shine");
      reset();
    }, { once: true });
  }, 1000);
}

function fail() {
  lock = true;

  // Play the wrong sound immediately when the second card is clicked and it's not a match
  document.getElementById("wrongSound").play();

  // Remove the flip class and reset after a 1-second delay
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

(function suffle() {
  cards.forEach((card) => {
    var position = Math.floor(Math.random() * 16);
    card.style.order = position;
  });
})();
