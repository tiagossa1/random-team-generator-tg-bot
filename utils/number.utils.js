const randomBetween = (min, max) => {
  if (min < 0 || max < 0) return 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getAlphabetCharacterBasedOnNumber = (number) => {
  if (number < 0) return "";
  return String.fromCharCode(number + 1 + 64);
};

export { randomBetween, getAlphabetCharacterBasedOnNumber };
