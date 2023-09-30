/**
 * Generates a random integer between a minimum (inclusive) and maximum (inclusive) value.
 *
 * @param {number} min - The minimum value for the random number (inclusive).
 * @param {number} max - The maximum value for the random number (inclusive).
 * @returns {number} A random integer between the specified minimum and maximum values.
 */
const randomBetween = (min: number, max: number): number => {
  if (min < 0 || max < 0) return 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Converts a number to an uppercase alphabet character based on its position in the alphabet.
 *
 * @param {number} number - The number representing the position in the alphabet (0-25).
 * @returns {string} The uppercase alphabet character corresponding to the given number.
 *                  An empty string is returned if the number is negative.
 */
const getAlphabetCharacterBasedOnNumber = (number: number) => {
  if (number < 0) return "";
  return String.fromCharCode(number + 1 + 64);
};

export { randomBetween, getAlphabetCharacterBasedOnNumber };
