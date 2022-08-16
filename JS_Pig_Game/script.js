/*
  Name: Yuhao Peng
  Title: Pig Game
  Date: 2022-08-13
*/

"use strict";

/***************************************************
 ************** global variables********************
 ***************************************************/
//store html elements
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
//declare variables to store score information, track player term and playing status
let totalScores, currentScore, activePlayer, playing;

/***************************************************
 ***************** functions************************
 ***************************************************/
const loadGame = function () {
  //set both player's total score to 0
  totalScores = [0, 0];
  //set rolling dice current score to 0
  currentScore = 0;
  //set player to player 1
  activePlayer = 0;
  //set playing status to true
  playing = true;

  //remove winner effect and active effect, reset player term
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player1EL.classList.remove("player--active");
  player0EL.classList.add("player--active");

  //hide dice image
  diceEl.classList.add("hidden");

  //reset displaying content
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
};

const switchPlayer = function () {
  //set current score back to 0
  currentScore = 0;
  //set current player's current score to 0
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  //switch player
  activePlayer = activePlayer === 0 ? 1 : 0;
  //apply player switch effect, toggle method will remove class if it is contained in the element, or add class if it is not contained.
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};

//calling method to initilize the game
loadGame();

/***************************************************
 ************ button click events*******************
 ***************************************************/
//rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //generating a ramdom dice roll (1-6)
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //check for rolled 1
    if (dice !== 1) {
      //add dice to the current score
      currentScore += dice;
      //adding dice to the current score dinamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//hold current point functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    //add current score to active player's score
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    //check if player score is >=100, determine winner
    if (totalScores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      //disable all controls when there is a winner
      playing = false;
      //hide the dice img
      diceEl.classList.add("hidden");
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

//reset game functionality
btnNew.addEventListener("click", loadGame);
