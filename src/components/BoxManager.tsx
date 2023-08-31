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

  // TODO
  /**
   *
   * @param ns
   * @returns
   */
  function generateNewNumber(ns: number[]): void {
    let n;
    do {
      n = getRandomInt(NUMBER_MIN, NUMBER_MAX);
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
    setNumbers(Array(NUMBER_OF_BOXES).fill(null));
    setDisplayAlreadyUsed(false);
    setDisplayCanNotPlace(false);
    setDisplayIsNotSorted(false);
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
    </>
  );
}
