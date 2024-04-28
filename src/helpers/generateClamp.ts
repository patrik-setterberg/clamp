import roundToThreeDecimals from "./roundToThreeDecimals";

/**
 * Generates a CSS clamp() function value for responsive design.
 *
 * @param {number} minViewportWidth - The minimum viewport width.
 * @param {number} maxViewportWidth - The maximum viewport width.
 * @param {number} minValue - The minimum value.
 * @param {number} maxValue - The maximum value.
 * @param {"px"|"rem"} unit - The unit of the min and max values.
 * @param {number} remSize - The size of 1rem in pixels.
 * @returns {string} The CSS clamp() function value.
 */
const generateClamp = (
  minViewportWidth: number,
  maxViewportWidth: number,
  minValue: number,
  maxValue: number,
  unit: "px" | "rem",
  remSize: number,
) => {
  // Check for invalid input
  if (minViewportWidth === maxViewportWidth) {
    throw new Error("minViewportWidth and maxViewportWidth cannot be equal");
  }
  if (minViewportWidth > maxViewportWidth) {
    throw new Error("minViewportWidth cannot be greater than maxViewportWidth");
  }
  if (
    minValue < 0 ||
    maxValue < 0 ||
    minViewportWidth < 0 ||
    maxViewportWidth < 0
  ) {
    throw new Error("Values cannot be negative");
  }
  if (unit !== "px" && unit !== "rem") {
    throw new Error("Unit must be either 'px' or 'rem'");
  }
  if (remSize <= 0) {
    throw new Error("remSize must be a positive number");
  }

  // Convert sizes to pixels if unit is 'rem'
  const minValuePx = unit === "rem" ? minValue * remSize : minValue;
  const maxValuePx = unit === "rem" ? maxValue * remSize : maxValue;

  // Calculate the slope of the line representing the rate of change of the value (in pixels) with respect to the viewport width
  const slope =
    (maxValuePx - minValuePx) / (maxViewportWidth - minViewportWidth);

  // Calculate the y-intercept, which represents the starting value (in pixels) when the viewport width is at its minimum
  const intercept = minValuePx - slope * minViewportWidth;

  // Convert slope and intercept to correct units
  const slopeVw = roundToThreeDecimals(slope * 100);
  const interceptRem = roundToThreeDecimals(intercept / remSize);

  // Check if slopeVw and interceptRem are negative
  const slopeStr = slopeVw < 0 ? `- ${Math.abs(slopeVw)}vw` : `${slopeVw}vw`;
  const interceptStr =
    interceptRem < 0
      ? `- ${Math.abs(interceptRem)}rem`
      : `+ ${interceptRem}rem`;

  return `clamp(${roundToThreeDecimals(minValuePx / remSize)}rem, ${slopeStr} ${interceptStr}, ${roundToThreeDecimals(maxValuePx / remSize)}rem)`;
};

export default generateClamp;
