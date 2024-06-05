'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0EL = document.querySelector('#current--0');
const current1EL = document.querySelector('#current--1');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;
const resetbuttons = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};
resetbuttons();
//Selecting elements

//Starting condition
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEL.classList.add('hidden');

// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

const switchPLayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//Roillong dice funtionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random Number
    const dice = Math.trunc(Math.random() * 6 + 1);

    // 2. Display the dice in picture
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    //Check if the number is 1.
    if (dice !== 1) {
      //add the dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //If true switch the player
      switchPLayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add the current score to the score of the active player and
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check the score if its at least 100

    if (scores[activePlayer] >= 100) {
      playing = false;
      //Finish the game
      document

        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
      diceEL.classList.add('hidden');
    } else {
    }
    //Switch to the next player
    switchPLayer();
  }
});

btnNew.addEventListener('click', function () {
  resetbuttons();
});
