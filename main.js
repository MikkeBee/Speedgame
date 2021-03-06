const circle = document.querySelectorAll("#circle");
const start = document.querySelector(".button1");
const stopGame = document.querySelector(".button2");
const closeButton = document.querySelector(".closeButton");
const overlay = document.querySelector(".overlay");
const scoreText = document.querySelector("#score");
const result = document.querySelector(".result");
let active = 0;
let score = 0;
let timer;
let rounds = 0;
let pace = 1000;
const startMusic = new sound("vlad-gluschenko-good-times.mp3");
const endMusic = new sound("16 - Game Over.mp3");

const circleClicked = (i) => {
  if (i !== active) {
    endGame();
  } else {
    score++;
    rounds--;
    scoreText.textContent = score;
  }
};

const startGameMusic = () => {
  console.log("hey");
  startMusic.play();
};

const endGameMusic = () => {
  startMusic.stop();
  endMusic.play();
};

const startitAll = () => {
  startGameMusic();
  startGame();
};

const startGame = () => {
  start.style.display = "none";
  stopGame.style.display = "inline";
  let nextActive = pickNew(active);

  for (let i = 0; i < circle.length; i++) {
    circle[i].style.pointerEvents = "auto";
  }

  circle[nextActive].classList.toggle("active");
  circle[active].classList.remove("active");

  active = nextActive;
  timer = setTimeout(startGame, pace);
  pace = pace - 10;

  if (rounds >= 3) {
    endGame();
  }

  rounds++;

  function pickNew(active) {
    let nextActive = getRndInt(0, 3);

    if (nextActive != active) {
      return nextActive;
    } else {
      return pickNew(active);
    }
  }
};

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

const endGame = () => {
  endGameMusic();
  clearTimeout(timer);
  overlay.style.visibility = "visible";
  result.textContent = `Your final score was ${score}.`;
};

const reloadGame = () => {
  window.location.reload();
};

circle.forEach((circ, i) => {
  circ.addEventListener("click", () => circleClicked(i));
});

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

start.addEventListener("click", startitAll);
stopGame.addEventListener("click", endGame);
closeButton.addEventListener("click", reloadGame);
