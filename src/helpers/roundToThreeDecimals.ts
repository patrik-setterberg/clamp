/**
 * Rounds a number to three decimal places.
 * @param {number} num - The number to be rounded.
 * @returns {number} The rounded number.
 */
const roundToThreeDecimals = (num: number) => {
  return Math.round((num + Number.EPSILON) * 1000) / 1000;
};

export default roundToThreeDecimals;
