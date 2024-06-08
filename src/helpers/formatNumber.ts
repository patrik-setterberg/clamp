/**
 * Formats a number by rounding it to 3 decimal places if it is not an integer.
 *
 * @param {number} num - The number to be formatted.
 * @returns The formatted number.
 */
function formatNumber(num: number): number {
    return Number.isInteger(num) ? num : Number(num.toFixed(3));
}

export default formatNumber;
