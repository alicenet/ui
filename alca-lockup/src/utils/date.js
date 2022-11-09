/**
 * Splits a string with an ellipses, leaving designated length on both sides
 * @param {string} str - String to split
 * @param {int} lengthOnSides - How many characters to leave on sides of the ellipses
 */
export function getDiffInMonths(startdate, endDate) {
    let months = (endDate.getFullYear() - startdate.getFullYear()) * 12;
    months -= startdate.getMonth();
    months += endDate.getMonth();
    return months <= 0 ? 0 : months;
}
