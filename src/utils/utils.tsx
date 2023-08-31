import { Property } from "csstype";

/**
 * Will return a new random number between 0 and max, as an integer
 * @param max max number to get
 * @returns a random number
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * max + min);
}

/**
 * Will check if the list is sorted
 * @param numbers list of number to check
 * @returns boolean
 */
export function isSorted(numbers: number[]): boolean {
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
export function canPlaceNumber(
  numbers: number[],
  numberToPlace: number
): boolean {
  let canPlace = false;
  // find the first number greater than the number to place
  numbers.forEach((number, index) => {
    if (number === null) {
      let newNumbers = numbers.map((number) => number);
      newNumbers[index] = numberToPlace;
      if (isSorted(newNumbers)) canPlace = true;
    }
  });
  return canPlace;
}

/**
 * Calculate the color to set for the number given
 * @param number number to calculate the color
 * @param hueMin hue for minnimum number
 * @param hueMax hue for maximum number
 * @param numberMin max number
 * @param numberMax min number
 * @returns 
 */
export function calcColor(
  number: number,
  hueMin: number,
  hueMax: number,
  numberMin: number = 1,
  numberMax: number = 1000
): Property.BackgroundColor {
  if (number === null) return "white";

  let absoluteNumber = number - numberMin;
  let absoluteNumberMax = numberMax - numberMin;
  let hue = (absoluteNumber / absoluteNumberMax) * (hueMax - hueMin) + hueMin;
  return `hsl(${hue}, 100%, 60%)`;
}

/**
 * Check if it's the end of the game
 * @param numbers list of the numbers
 * @returns true if the game is ended, false otherwise
 */
export function isEndGame(numbers: number[]): boolean {
  if(!isSorted(numbers)) return false;
  let endGame = true;
  numbers.forEach((number) => {
    if (number === null) endGame = false;
  });
  return endGame;
}
