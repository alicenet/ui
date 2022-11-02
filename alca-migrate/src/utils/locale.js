export function formatNumberToLocale(number, precision) {
	number = number || 0
	precision = precision || 4

	return Number(number).toLocaleString(false, { maximumFractionDigits: precision })
}
