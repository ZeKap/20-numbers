import React from "react";
import Box from "./Box";
import { getRandomInt, canPlaceNumber, isSorted, isEndGame } from "../utils/utils";

function AlreadyUsed(): React.ReactElement {
  return <p style={{ color: "red" }}>This case has already a number</p>;
}

function NotSorted(): React.ReactElement {
  return (
    <p style={{ color: "red" }}>
      You can't place it here, or the list won't be sorted
    </p>
  );
}

function CanNotPlace({
  restart,
}: {
  restart: CallableFunction;
}): React.ReactElement {
  return (
    <>
      <p style={{ color: "red" }}>
        The number can't be placed in the list... You lost!
      </p>
      <button onClick={() => restart()} className="restart_button">
        Restart the game
      </button>
    </>
  );
}

function EndGame({
  restart,
}: {
  restart: CallableFunction;
}): React.ReactElement {
  return (
    <>
      <h4>You finished! Congartulation!</h4>
      <button onClick={() => restart()} className="restart_button">
        Restart the game
      </button>
    </>
  )
}

export default function BoxManager({
  nextNumber,
  incrementScore,
  setNextNumber,
  restartGame,
  NUMBER_OF_BOXES,
  NUMBER_MIN,
  NUMBER_MAX,
  HUE_MIN,
  HUE_MAX,
}: {
  nextNumber: number;
  incrementScore: CallableFunction;
  setNextNumber: CallableFunction;
  restartGame: CallableFunction;
  NUMBER_OF_BOXES: number;
  NUMBER_MIN: number;
  NUMBER_MAX: number;
  HUE_MIN: number;
  HUE_MAX: number;
}): React.ReactElement {
  const [numbers, setNumbers] = React.useState(
    Array(NUMBER_OF_BOXES).fill(null)
  );
  const [displayAlredyUsed, setDisplayAlreadyUsed] = React.useState(false);
  const [displayIsNotSorted, setDisplayIsNotSorted] = React.useState(false);
  const [displayCanNotPlace, setDisplayCanNotPlace] = React.useState(false);
  const [displayEndGame, setDisplayEndGame] = React.useState(false);

  /**
   * Will generate a new number that's not already in the list
   * @param numbers list of numbers
   * @returns a new number
   */
  function generateNewNumber(numbers: number[]): void {
    let newNumber;
    do {
      newNumber = getRandomInt(NUMBER_MIN, NUMBER_MAX);
    } while (numbers.includes(newNumber));
    setNextNumber(newNumber);
    if (!canPlaceNumber(numbers, newNumber)) {
      if(isEndGame(numbers)) setDisplayEndGame(true);
      setDisplayCanNotPlace(true);
      return;
    } else setDisplayCanNotPlace(false);
  }

  /**
   * Will handle the click on a case
   * 
   * Check if the case is already used, if the list is sorted, and if the number can be placed
   * @param index index of the case
   */
  function handleCaseClick(index: number) {
    if (displayCanNotPlace) return;

    // check if the case is already used
    if (numbers[index] !== null) {
      setDisplayAlreadyUsed(true);
      return;
    } else setDisplayAlreadyUsed(false);

    // check if the list is sorted before placing the number
    let newNumbers = numbers.map((number) => number);
    newNumbers[index] = nextNumber;
    if (!isSorted(newNumbers)) {
      setDisplayIsNotSorted(true);
      return;
    } else setDisplayIsNotSorted(false);

    // place the number in the list
    let n = numbers.map((number, i) => {
      if (i === index) {
        return nextNumber;
      } else {
        return number;
      }
    });
    setNumbers(n);

    // increase the score
    incrementScore();

    // get a new random number
    generateNewNumber(n);
  }

  /**
   * Will restart the game
   * 
   * Reset the list, the score, and get a new random number
   * 
   * Then call the restartGame function that save in the cookies the best score
   */
  function restart() {
    setNumbers(Array(NUMBER_OF_BOXES).fill(null));
    setDisplayAlreadyUsed(false);
    setDisplayCanNotPlace(false);
    setDisplayIsNotSorted(false);
    setDisplayEndGame(false);
    setNextNumber(getRandomInt(NUMBER_MIN, NUMBER_MAX));
    restartGame();
  }

  return (
    <>
      <div className="numbers">
        {numbers.map((number, index) => (
          <Box
            key={index}
            boxValue={number}
            index={index}
            handleCaseClick={handleCaseClick}
            numberMin={NUMBER_MIN}
            numberMax={NUMBER_MAX}
            hueMin={HUE_MIN}
            hueMax={HUE_MAX}
          ></Box>
        ))}
      </div>
      {displayAlredyUsed && <AlreadyUsed />}
      {displayIsNotSorted && <NotSorted />}
      {displayCanNotPlace && <CanNotPlace restart={restart} />}
      {displayEndGame && <EndGame restart={restart} />}
    </>
  );
}
