// If number is "" , don't show nan return ""
export function formatNumberToLocale(number, precision = 4) {
    if (!number) return 0;
    return Number(number).toLocaleString(false, {
        maximumFractionDigits: precision,
    });
}
