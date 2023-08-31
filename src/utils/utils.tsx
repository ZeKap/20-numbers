// TODO
/**
 *
 * @param max max number to get
 * @returns a new random number between 0 and max, as an integer
 */
export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max + 1);
}

// TODO
/**
 *
 * @param numbers list of number to check
 * @returns true if the list is sorted, false otherwise
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
