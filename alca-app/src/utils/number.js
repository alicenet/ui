// If number is "" , don't show nan return ""
export function formatNumberToLocale(number, precision) {
    if (!number) {
        return "";
    }
    number = number || 0;
    precision = precision || 4;
    return Number(number).toLocaleString(false, { maximumFractionDigits: precision });
}
