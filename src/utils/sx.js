/**
 * Compose Material SX
 * @param { Object } sx - SX Arguments
 * @returns { Object }
 */
export function sx(...sx) {
    return sx.reduce((acc, curr) => {
        if (curr.condition) {
            return { ...acc, ...curr.sx };
        }

        return { ...acc, ...curr };
    }, {});
}
