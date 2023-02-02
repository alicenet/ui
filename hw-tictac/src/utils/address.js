export const curveTypes = {
    SECP256K1: 1,
    BARRETO_NAEHRIG: 2,
};

/**
 * Removes the Hex prefix
 * @param { String } address
 * @returns Returns the address
 */
export function removeHexPrefix(address) {
    if (address.indexOf('0x') >= 0) {
        return address.slice(2);
    }
    return address;
}

/**
 * Returns true if the string is a BN address
 * @param {string} address - String to split
 * @returns Returns true if the address contains the BN prefix
 */
export function isBN(address) {
    if (typeof address !== "string") {
        return false;
    }
    return removeHexPrefix(address).indexOf('BN') === 0;
}
