/**
 * Rounds a number to four decimal places.
 * 
 * @param {number} num - The number to be rounded.
 * @returns {number} The rounded number.
 */
const roundToFourDecimals = (num: number) => {
  return Math.round((num + Number.EPSILON) * 10000) / 10000;
};

export default roundToFourDecimals;
