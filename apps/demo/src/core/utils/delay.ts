/**
 * Delay execution for specified amount of time.
 *
 * @param {number} ms How milliseconds to delay.
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
