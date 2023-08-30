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

function App() {
  var [numbers, setNumbers] = React.useState(Array(20).fill(null));
  var [nextNumber, setNextNumber] = React.useState(getRandomInt(1000));
  var [displayAlredyUsed, setDisplayAlreadyUsed] = React.useState(false);
  var [displayIsNotSorted, setDisplayIsNotSorted] = React.useState(false);

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
    console.log(numbers);

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
    setNumbers(
      numbers.map((number, i) => {
        if (i === index) {
          return nextNumber;
        } else {
          return number;
        }
      })
    );

    // get a new random number
    setNextNumber(getRandomInt(1000));
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
        <p style={{ color: "red" }}>You can't place it here, or the list won't be sorted</p>
      )}
    </>
  );
}

export default App;
