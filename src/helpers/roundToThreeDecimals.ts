/**
 * Rounds a number to three decimal places.
 * @param num - The number to be rounded.
 * @returns The rounded number.
 */
const roundToThreeDecimals = (num: number) => {
  return Math.round((num + Number.EPSILON) * 1000) / 1000;
};

export default roundToThreeDecimals;
