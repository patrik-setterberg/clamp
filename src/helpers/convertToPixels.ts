/**
 * Possibly converts a value from a rem to pixels.
 * 
 * @param unit The unit of the value ('px' or 'rem').
 * @param value The value to be converted.
 * @param remSize The size of 1 rem in pixels.
 * @returns The converted value in pixels.
 */
const convertToPixels = (unit: 'px' | 'rem', value: number, remSize: number) => {
    return unit === 'rem' ? value * remSize : value;
}

export default convertToPixels;