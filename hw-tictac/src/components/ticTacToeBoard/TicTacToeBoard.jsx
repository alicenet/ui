import React, { useState } from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { Board, HelpDialog } from "components";
import { useSelector } from "react-redux";

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

export function TicTacToeBoard() {

    const [openHelp, setOpenHelp] = useState(false);
    const [board, setBoard] = useState(Array(boardSize).fill(null));
    const [xIsPlaying, setXIsPlaying] = useState(true);
    const [xIsWinner, setXIsWinner] = useState(false);
    const [noWinner, setNoWinner] = useState(true);
    const [gameOver, setGameOver] = useState(false);

    const onReset = () => {
        setBoard(Array(boardSize).fill(null));
        setXIsPlaying(true);
        setGameOver(false);
        setNoWinner(true);
    };

    const makeMove = (position) => {
        if (!board[position] && !gameOver) {
            const auxBoard = board;
            auxBoard[position] = xIsPlaying ? "X" : "O";
            setBoard(auxBoard);
            setXIsPlaying(prevState => !prevState);
            checkWinner(auxBoard);
        }
    }

    const checkWinner = currentBoard => {
        for (const win of wins) {
            const isWin = [currentBoard[win[0]], currentBoard[win[1]], currentBoard[win[2]]];
            if (isWin[0] != null && isWin[0] === isWin[1] && isWin[0] === isWin[2]) {
                setXIsWinner(currentBoard[win[1]] === "X");
                setGameOver(true);
                setNoWinner(false);
                break;
            }
        }
        if (currentBoard.some(mark => mark === null) && gameOver) {
            setNoWinner(true);
        }
        if (currentBoard.every(mark => mark !== null) && noWinner) {
            setGameOver(true);
        }
    };

    const { multiSigBalance } = useSelector((state) => ({
        multiSigBalance: state.app.multiSigBalance,
    }));

    return (
        <>

            <Box display="flex" flexDirection="column" gap={3} alignItems="center">

                <Board board={board} makeMove={makeMove} />

                <Grid container alignItems="center" justifyContent="center" gap={2}>
                    <Grid item>
                        {
                            gameOver && noWinner ? (
                                <Typography>
                                    Game Over
                                </Typography>
                            ) : (
                                gameOver ? (
                                    <Typography>
                                        Winner: {xIsWinner ? "X" : "O"}
                                    </Typography>
                                ) : (
                                    <Typography>
                                        Playing Next: {xIsPlaying ? "X" : "O"}
                                    </Typography>
                                )
                            )
                        }
                    </Grid>
                    <Divider role="presentation" orientation="vertical" flexItem />
                    <Grid item>
                        <Typography>
                            AliceNet Bytes: {multiSigBalance} ALCB
                        </Typography>
                    </Grid>
                </Grid>

                <Box display="flex" flexDirection="row" gap={2}>

                    <Button variant="outlined" size="small" sx={{ paddingY: 0.75, paddingX: 3 }}>
                        Load Game
                    </Button>

                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ paddingY: 0.75, paddingX: 3 }}
                        onClick={onReset}
                    >
                        Reset
                    </Button>

                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ paddingY: 0.75, paddingX: 3 }}
                        onClick={() => setOpenHelp(prevState => !prevState)}
                    >
                        Help
                    </Button>

                </Box>

            </Box>

            <HelpDialog open={openHelp} handleClose={() => setOpenHelp(prevState => !prevState)} />

        </>
    );
}
