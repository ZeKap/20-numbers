import React from "react";
import Box from "./Box";
import { getRandomInt, canPlaceNumber, isSorted } from "../utils/utils";

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

export default function BoxManager({
  nextNumber,
  incrementScore,
  setNextNumber,
  restartGame,
  numberOfBoxes,
}: {
  nextNumber: number;
  incrementScore: CallableFunction;
  setNextNumber: CallableFunction;
  restartGame: CallableFunction;
  numberOfBoxes: number;
}): React.ReactElement {
  const [numbers, setNumbers] = React.useState(Array(numberOfBoxes).fill(null));
  const [displayAlredyUsed, setDisplayAlreadyUsed] = React.useState(false);
  const [displayIsNotSorted, setDisplayIsNotSorted] = React.useState(false);
  const [displayCanNotPlace, setDisplayCanNotPlace] = React.useState(false);

  // TODO
  /**
   *
   * @param ns 
   * @returns 
   */
  function generateNewNumber(ns: number[]): void {
    let n;
    do {
      n = getRandomInt(1000);
    } while (ns.includes(n));
    setNextNumber(n);
    if (!canPlaceNumber(ns, n)) {
      setDisplayCanNotPlace(true);
      return;
    } else setDisplayCanNotPlace(false);
  }

  // TODO
  /**
   * 
   * @param index 
   * @returns 
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

  // TODO
  /**
   * 
   */
  function restart() {
    setNumbers(Array(numberOfBoxes).fill(null));
    setDisplayAlreadyUsed(false);
    setDisplayCanNotPlace(false);
    setDisplayIsNotSorted(false);
    setNextNumber(getRandomInt(1000));
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
          ></Box>
        ))}
      </div>
      {displayAlredyUsed && <AlreadyUsed />}
      {displayIsNotSorted && <NotSorted />}
      {displayCanNotPlace && <CanNotPlace restart={restart} />}
    </>
  );
}
