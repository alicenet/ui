/**
 * Get the difference between two dates
 * @param { Date } startdate - Initial date
 * @param { Date } endDate - End of period
 * @returns { Number } months
 */
export function getDiffInMonths(startdate, endDate) {
    let months = (endDate.getFullYear() - startdate.getFullYear()) * 12;
    months -= startdate.getMonth();
    months += endDate.getMonth();
    return months <= 0 ? 0 : months;
}
