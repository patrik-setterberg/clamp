import roundToFourDecimals from "./roundToFourDecimals";
import convertToPixels from "./convertToPixels";

type GenerateClampResult = {
    result?: string;
    errors?: { param: string; message: string }[];
    cautions?: { param: string; message: string }[];
};

/**
 * Generates a CSS clamp() function based on the provided parameters.
 *
 * @param {number} minViewportWidth - The minimum viewport width.
 * @param {"px"|"rem"} minViewportWidthUnit - The unit of the minimum viewport width (`px` or `rem`).
 * @param {number} maxViewportWidth - The maximum viewport width.
 * @param {"px"|"rem"} maxViewportWidthUnit - The unit of the maximum viewport width (`px` or `rem`).
 * @param {number} minValue - The minimum value.
 * @param {"px"|"rem"} minValueUnit - The unit of the minimum value (`px` or `rem`).
 * @param {number} maxValue - The maximum value.
 * @param {"px"|"rem"} maxValueUnit - The unit of the maximum value (`px` or `rem`).
 * @param {number} remSize - The size of 1 rem in pixels.
 * @returns The generated `clamp` function as a string, or an object containing errors if there are any.
 */
const generateClamp = (
    minViewportWidth: number,
    minViewportWidthUnit: "px" | "rem",
    maxViewportWidth: number,
    maxViewportWidthUnit: "px" | "rem",
    minValue: number,
    minValueUnit: "px" | "rem",
    maxValue: number,
    maxValueUnit: "px" | "rem",
    remSize: number,
): GenerateClampResult => {
    const errors = [];

    const convertedMinViewportWidth = convertToPixels(
        minViewportWidthUnit,
        minViewportWidth,
        remSize,
    );
    const convertedMaxViewportWidth = convertToPixels(
        maxViewportWidthUnit,
        maxViewportWidth,
        remSize,
    );
    const convertedMinValue = convertToPixels(minValueUnit, minValue, remSize);
    const convertedMaxValue = convertToPixels(maxValueUnit, maxValue, remSize);

    // Check for invalid input.
    if (convertedMinViewportWidth >= convertedMaxViewportWidth) {
        errors.push({
            param: "minViewportWidth",
            message:
                "Maximum viewport width must be greater than minimum viewport width.",
        });
        errors.push({
            param: "maxViewportWidth",
            message:
                "Maximum viewport width must be greater than minimum viewport width.",
        });
    }
    if (convertedMinValue < 0) {
        errors.push({
            param: "minValue",
            message: "Value cannot be negative.",
        });
    }
    if (convertedMaxValue < 0) {
        errors.push({
            param: "maxValue",
            message: "Value cannot be negative.",
        });
    }
    if (convertedMinViewportWidth < 0) {
        errors.push({
            param: "minViewportWidth",
            message: "Value cannot be negative.",
        });
    }
    if (convertedMaxViewportWidth < 0) {
        errors.push({
            param: "maxViewportWidth",
            message: "Value cannot be negative.",
        });
    }
    if (convertedMaxValue < convertedMinValue) {
        errors.push({
            param: "minValue",
            message:
                "Max value cannot be smaller than min value.",
        });
        errors.push({
            param: "maxValue",
            message:
                "Max value cannot be smaller than min value.",
        });
    }
    // Won't happen right now. Maybe in the future (if we allow changing rem size).
    if (remSize <= 0) {
        errors.push({
            param: "remSize",
            message: "Rem size must be a positive number.",
        });
    }

    if (errors.length > 0) {
        return { errors };
    }

    const cautions = [];

    if (convertedMaxValue === convertedMinValue) {
        cautions.push({
            param: "minValue",
            message: "Max value is equal to min value. No scaling will occur.",
        });
        cautions.push({
            param: "maxValue",
            message: "Max value is equal to min value. No scaling will occur.",
        });
    }

    /**
     * Calculate the slope of the line representing the rate of change of the value (in pixels)
     * with respect to the viewport width.
     */
    const slope =
        (convertedMaxValue - convertedMinValue) /
        (convertedMaxViewportWidth - convertedMinViewportWidth);

    /**
     * Calculate the y-intercept, which represents the starting value (in pixels)
     * when the viewport width is at its minimum.
     */
    const intercept = convertedMinValue - slope * convertedMinViewportWidth;

    // Convert slope and intercept to correct units.
    const slopeVw = roundToFourDecimals(slope * 100);
    const interceptRem = roundToFourDecimals(intercept / remSize);

    // Check if slopeVw and interceptRem are negative.
    const slopeStr = slopeVw < 0 ? `- ${Math.abs(slopeVw)}vw` : `${slopeVw}vw`;
    const interceptStr =
        interceptRem < 0
            ? `- ${Math.abs(interceptRem)}rem`
            : `+ ${interceptRem}rem`;

    return {
        result: `clamp(${roundToFourDecimals(convertedMinValue / remSize)}rem, ${slopeStr} ${interceptStr}, ${roundToFourDecimals(convertedMaxValue / remSize)}rem)`,
        cautions,
    };
};

export default generateClamp;
