/**
 * Returns if the given string is a number.
 * @param {string} str String to validate against
 * @returns {boolean}
 */
const isNumber = (str: string): boolean => {
  return typeof str === "string" && !Number.isNaN(str);
};

export { isNumber };
