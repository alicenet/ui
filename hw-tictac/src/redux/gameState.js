export const PlayerType = {
    EMPTY: "0",
    X: "X",
    O: "O",
};

export const PlayerTypeToNum = {
    [PlayerType.EMPTY]: 0,
    [PlayerType.X]: 1,
    [PlayerType.O]: 2,
};

export const WinState = {
    NONE: "NULL",
    X: "X",
    O: "O",
    TIE: "TIE",
};

/**
 * turn: Current turn
 * winner: Game Over, Has Winner?
 * board: 2D Array -- 0 = Empty, 1=X, 2=O
 */
export const initialTttGameState = {
    turn: PlayerType.X, // "x" || "o" -- 1 || 2
    winner: WinState.NONE, // null || "x" || "o" || "tie" -- 0 | 1 | 2 | 3
    board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ], // 000000000 -- Board starts at top left as x0,y0
};

////////////////////
/** Serialization */
////////////////////

export function serializeTttGameState(unserializedTttGameState) {
    const uState = unserializedTttGameState;
    let serializedState = "";
    serializedState += uState.turn === PlayerType.X ? 1 : 2;
    serializedState +=
        uState.winner === WinState.TIE ? 3 : uState.winner === WinState.O ? 2 : uState.winner === WinState.X ? 1 : 0;
    for (let i = 0; i < uState.board.length; i++) {
        let xCol = uState.board[i];
        for (let j = 0; j < xCol.length; j++) {
            let xyPoint = xCol[j];
            serializedState += xyPoint;
        }
    }
    return serializedState;
}

export function deserializeTttGameState(serializedTttGameState) {
    let sState = serializedTttGameState;
    let boardState = sState.slice(2, sState.length);
    let unserializedState = {
        turn: String(sState[0]) === "1" ? PlayerType.X : PlayerType.O,
        winner:
            String(sState[1]) === "3"
                ? WinState.TIE
                : String(sState[1]) === "2"
                ? WinState.O
                : String(sState[1]) === "1"
                ? WinState.X
                : WinState.NONE,
        board: [],
    };
    const colLimit = 3;
    let colCount = 0;
    let colToPush = [];
    // +1 on length to push last column
    for (let i = 0; i < boardState.length + 1; i++) {
        let point = boardState[i];
        // If at limit, add y-column to array and reset it
        if (colCount === colLimit) {
            unserializedState.board.push(colToPush);
            colToPush = [];
            colCount = 0;
        }
        colToPush.push(point);
        colCount += 1;
    }
    return unserializedState;
}

/* Game State Modifiers used to modify gameState -- these DO NOT affect redux state */

/**
 *
 * @param {String} playerType - playerType from const PlayerType
 * @param {Array[Array]} location - XY location as point on two-dimensional array
 */
export function placeMark(gameState, playerType, location) {
    if (playerType !== PlayerType.X && playerType !== PlayerType.O) {
        console.warn("Invalid parameters for placeMark regarding game state update");
        return gameState;
    }
    let newGameState = { ...gameState };
    newGameState.board[location[0]][location[1]] = PlayerTypeToNum[playerType];
    return newGameState;
}
