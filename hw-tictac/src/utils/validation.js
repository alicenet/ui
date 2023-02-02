export const isValidHash = (hash) => hash && /^(0x)?([A-Fa-f0-9]{64})$/.test(hash);
export const isValidBlockHeight = (height) => height && /^\+?(0|[1-9]\d*)$/.test(height);