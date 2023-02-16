export const searchTypes = {
    TRANSACTIONS: 0,
    BLOCKS: 1,
    DATASTORES: 2,
};

export const ellipsesSplit = (str, count) => {
    if (!str) {
        return "";
    }
    str = str.split("");
    let split = "";
    for (let i = 0; i < count; i++) {
        split += str[i];
    }
    split += "...";
    for (let i = str.length - 1; i > str.length - 1 - count; i--) {
        split += str[i];
    }
    return split;
};
