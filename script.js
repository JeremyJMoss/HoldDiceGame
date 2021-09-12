'use strict';

const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const holdScore = document.querySelector('.btn--hold');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore1 = document.querySelector('#current--0');
const currentScore2 = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');

/*starting data*/
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let playing = true;

/*creating random number*/
const random = () => Math.trunc(Math.random() * 6 + 1);

/*function for swapping active player*/
const swapActivePlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

/*roll Dice button pressed*/
rollDice.addEventListener('click', function () {
  if (playing === true) {
    let diceRoll = random();
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;
    if (diceRoll !== 1) {
      /*add dice to current score*/
      currentScore += diceRoll;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      /*switch to next player*/
      swapActivePlayer();
    }
  }
});

holdScore.addEventListener('click', function () {
  if (playing === true) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      swapActivePlayer();
    }
  }
});

newGame.addEventListener('click', function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  for (let i = 0; i < scores.length; i++) {
    document.querySelector(`#score--${i}`).textContent = 0;
    document.querySelector(`#current--${i}`).textContent = 0;
  }
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  activePlayer = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  if (!diceEl.hasAttribute('hidden')) {
    diceEl.classList.add('hidden');
  }
});
