/**
 * Compose Material SX
 * @param { Object } sx - The string to split with the ellipses
 */
export function sx(...sx) {
    return sx.reduce((acc, curr) => {
        if (curr.condition) {
            return { ...acc, ...curr.sx };
        }

        return { ...acc, ...curr };
    }, {});
}
