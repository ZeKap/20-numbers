import React from "react";
import "./App.css";

/**
 *
 * @param max max number to get
 * @returns a new random number between 0 and max, as an integer
 */
function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 *
 * @param numbers list of number to check
 * @returns true if the list is sorted, false otherwise
 */
function isSorted(numbers: number[]): boolean {
  let sorted = true;
  let lastNumber = numbers[0];
  numbers.forEach((number, index) => {
    if (number !== null && index !== 0) {
      if (number < lastNumber) {
        sorted = false;
      }
      lastNumber = number;
    }
  });
  return sorted;
}

/**
 * Will try to place the number in the list, and return true if it can be placed, false otherwise
 * @param numbers list of numbers
 * @param numberToPlace number to check if it can be placed in the list
 */
function canPlaceNumber(numbers: number[], numberToPlace: number): boolean {
  let canPlace = false;
  // find the first number greater than the number to place
  numbers.forEach((number, index) => {
    if (number === null) {
      let newNumbers = numbers.map((number) => number);
      newNumbers[index] = numberToPlace;
      console.log(newNumbers);
      if (isSorted(newNumbers)) canPlace = true;
    }
  });
  return canPlace;
}

function App() {
  var [numbers, setNumbers] = React.useState(Array(20).fill(null));
  var [nextNumber, setNextNumber] = React.useState(getRandomInt(1000));
  var [displayAlredyUsed, setDisplayAlreadyUsed] = React.useState(false);
  var [displayIsNotSorted, setDisplayIsNotSorted] = React.useState(false);
  var [displayCanNotPlace, setDisplayCanNotPlace] = React.useState(false);

  function generateNewNumber(ns: number[]): void {
    let n = getRandomInt(1000);
    setNextNumber(n);
    if (!canPlaceNumber(ns, n)) {
      setDisplayCanNotPlace(true);
      return;
    } else setDisplayCanNotPlace(false);
  }

  /**
   * Will do the following:
   * - check if the case clicked is already used
   * - check if the list is sorted before placing the number
   * - place the number in the list
   * - get a new random number
   * @param index index of the case clicked
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

    // get a new random number
    generateNewNumber(n);
  }

  return (
    <>
      <h1>20 numbers sorted</h1>
      <p>
        A random number from 0 to 1000 will be randomly picked, choose where to
        put it in this list so the list is sorted at the end.
      </p>
      <p>
        WARNING! Once the place for the number is chosen, you can't move it.
      </p>

      <h2>Number: {nextNumber}</h2>

      <div className="numbers">
        {numbers.map((number, index) => (
          <div
            key={index}
            className="number"
            id={index.toString()}
            onClick={() => handleCaseClick(index)}
          >
            {number !== 0 ? number : ""}
          </div>
        ))}
      </div>

      {displayAlredyUsed && (
        <p style={{ color: "red" }}>This case has already a number</p>
      )}

      {displayIsNotSorted && (
        <p style={{ color: "red" }}>
          You can't place it here, or the list won't be sorted
        </p>
      )}

      {displayCanNotPlace && (
        <p style={{ color: "red" }}>
          The number can't be placed in the list... You lost!
        </p>
      )}
    </>
  );
}

export default App;
