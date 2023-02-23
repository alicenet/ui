import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { Board, HelpDialog } from "components";
import { useDispatch, useSelector } from "react-redux";
import { loadGameStateFromIndex } from "redux/actions";
import { setGameState, walletKeyByNumber } from "redux/reducers";
import { PlayerType, unserializeBoardState, WinState } from "redux/gameState";

const boardSize = 9;

const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/**
 * Adrian:
 *
 *  All actions can be dispatched via dispatch()
 *  After each move the following needs to happen via these are in actions.js and exported for dispatching
 *
 * Order of Action:
 *
 * 1. createGameStateTransaction - Creates the baseline transaction for signing
 * ( After a move this must happen. Prevent the player from moving until signed & sent, you can use signed/sent statuses loaded in below at sueSelector)
 *
 * 2. xSignsGameStateTransaction - X Must sign the txData ( Use X Sign Button )
 * 3. oSignsGameStateTransaction - O Must sign the txData ( Use O Sign Button )
 * 4. sendGameStateTransactions - Actually send the transaction ( Use X Sends button -- Can be renamed to send )
 *
 * OTHER NOTES:
 *
 * App status will update accordingly to reflect the current status of actions
 * These statuses will be one of globalStatus in reducers.js and is loaded in useSelector below as currentStatus
 *
 * There is current a hard coded game index in reducers.js, you can change it with dispatch(setGameIndex(INDEXTOUSE))
 * The transaction actions use the redux state's game index as a source of truth. Was easier to use same for now.
 * If you spin a new one, you can randomly generate any 256bit string of hex.
 *
 * If a state is missing/misplaces that you need to change but they should be able to be modified easily within reducer.js
 * You can modify the state object directly in the builder cases and the underlying slice toolkit will handle the state morphing
 *
 * FundWallet takes a very long time, I'm leaning to just using static wallets and telling the demo folks to just demo it on screen not for everyone...
 * In light of this I created a static wallet load at the top of actions.js that determines if wallet gen uses the same static keys for testing. It is currently funded
 * on this testnet: http://34.28.51.52:4348/v1/ which is hardcoded in the provider. If you wish to switch it off and fund a wallet, you may but it will take awhile.
 *
 * If I missed something just ping me. I put it in code so it wouldn't get lost on discord
 *
 */

export function TicTacToeBoard() {
    const [openHelp, setOpenHelp] = useState(false);
    const [board, setBoard] = useState(Array(boardSize).fill(null));
    const [xIsPlaying, setXIsPlaying] = useState(true);
    const [xIsWinner, setXIsWinner] = useState(false);
    const [noWinner, setNoWinner] = useState(true);
    const [gameOver, setGameOver] = useState(false);

    const staticBoard = JSON.stringify(board);
    const dispatch = useDispatch();

    const { currentStatus, txCreated, xSigned, oSigned } = useSelector((state) => ({
        currentStatus: state.app.status,
        txCreated: state.app.txCreated,
        xSigned: state.app.xSigned,
        oSigned: state.app.oSigned,
    }));

    const onReset = () => {
        setBoard(Array(boardSize).fill(null));
        setXIsPlaying(true);
        setGameOver(false);
        setNoWinner(true);
    };

    // Sync redux game state -- Adrian, this will balance your existing local logic to the redux state so you don't need to do much ( hopefully )
    // I did test this in redux stepping so should be good.
    useEffect(() => {
        dispatch(
            setGameState({
                turn: xIsPlaying ? PlayerType.X : PlayerType.O,
                winner:
                    xIsWinner && gameOver
                        ? WinState.X
                        : !xIsWinner && gameOver
                        ? WinState.O
                        : gameOver && noWinner
                        ? WinState.TIE
                        : WinState.NONE,
                board: unserializeBoardState(board),
            })
        );
    }, [board, staticBoard, xIsPlaying, xIsWinner, dispatch, gameOver, noWinner]);

    const makeMove = (position) => {
        if (!board[position] && !gameOver) {
            const auxBoard = board;
            auxBoard[position] = xIsPlaying ? "X" : "O";
            setBoard(auxBoard);
            setXIsPlaying((prevState) => !prevState);
            checkWinner(auxBoard);
        }
    };

    const checkWinner = (currentBoard) => {
        for (const win of wins) {
            const isWin = [currentBoard[win[0]], currentBoard[win[1]], currentBoard[win[2]]];
            if (isWin[0] != null && isWin[0] === isWin[1] && isWin[0] === isWin[2]) {
                setXIsWinner(currentBoard[win[1]] === "X");
                setGameOver(true);
                setNoWinner(false);
                break;
            }
        }
        if (currentBoard.some((mark) => mark === null) && gameOver) {
            setNoWinner(true);
        }
        if (currentBoard.every((mark) => mark !== null) && noWinner) {
            setGameOver(true);
        }
    };

    const { multiSigBalance, multiSigAddress } = useSelector((state) => ({
        multiSigBalance: state.app.multiSigBalance,
        multiSigAddress: state.app.wallets[walletKeyByNumber[3]].address,
    }));

    const loadGame = async () => {
        dispatch(loadGameStateFromIndex());
    };

    return (
        <>
            <Box display="flex" flexDirection="column" gap={3} alignItems="center">
                <Board board={board} makeMove={makeMove} />

                <Grid container alignItems="center" justifyContent="center" gap={2}>
                    <Grid item>
                        {gameOver && noWinner ? (
                            <Typography>Game Over</Typography>
                        ) : gameOver ? (
                            <Typography>Winner: {xIsWinner ? "X" : "O"}</Typography>
                        ) : (
                            <Typography>Playing Next: {xIsPlaying ? "X" : "O"}</Typography>
                        )}
                    </Grid>
                    <Divider role="presentation" orientation="vertical" flexItem />
                    <Grid item>
                        <Typography>AliceNet Bytes: {multiSigBalance} ALCB</Typography>
                    </Grid>
                </Grid>

                <Box display="flex" flexDirection="row" gap={2}>
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ paddingY: 0.75, paddingX: 3 }}
                        disabled={!multiSigAddress}
                        onClick={loadGame}
                    >
                        Load Game
                    </Button>

                    <Button variant="outlined" size="small" sx={{ paddingY: 0.75, paddingX: 3 }} onClick={onReset}>
                        Reset
                    </Button>

                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ paddingY: 0.75, paddingX: 3 }}
                        onClick={() => setOpenHelp((prevState) => !prevState)}
                    >
                        Help
                    </Button>
                </Box>
            </Box>

            <HelpDialog open={openHelp} handleClose={() => setOpenHelp((prevState) => !prevState)} />
        </>
    );
}
