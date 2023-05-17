/**
 * Fills interior of a string with an ellipses and leaves charCountToLeave on both sides
 * @param { String } strToSplit - The string to split with the ellipses
 * @param { Number } charCountToLeave  - Characters to leave on the end of the string
 */
export function splitStringWithEllipses(strToSplit, charCountToLeave) {
    let start = strToSplit.slice(0, charCountToLeave);
    let end = strToSplit.slice(strToSplit.length - charCountToLeave, strToSplit.length);
    return start + "..." + end;
}

/**
 * Verify if the input string has valid amount characters
 * @param { String } string - String
 * @returns { Boolean }
 */
export function checkValidAmountCharacters(string) {
    const parsedString = string.toString();
    if (!/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(parsedString)) return false;

    const split = parsedString.split(".");
    if (split[0].length >= 15 || (split[1] && split[1].length > 10)) return false;

    return true;
}
