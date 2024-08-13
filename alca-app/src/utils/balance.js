import { formatNumberToLocale } from "./number";

export function formattedAlcbBalance(balances) {
    if (balances.alcb.error || balances.alcb.value === "n/a") return "n/a";
    return formatNumberToLocale(balances.alcb.value);
}

export function formattedEthBalance(balances) {
    if (balances.ethereum.error || balances.ethereum.value === "n/a") return "n/a";
    return formatNumberToLocale(balances.ethereum.value);
}
