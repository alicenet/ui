import React from "react";
import { Backdrop, Box, Button, CircularProgress, Grid, Paper, Typography, useTheme } from "@mui/material";
import { TicTacToeBoard } from "components";
import { useDispatch, useSelector } from "react-redux";
import { fundWallet, genBaseWalletByNumber } from "redux/actions";
import { globalStatus } from "redux/reducers";
import { instructions } from "./Instructions";

export const PlayTicTacToe = () => {
    const { baseWallet1, baseWallet2, multiSigWallet, status, multiSigBalance } = useSelector((state) => ({
        baseWallet1: state.app.wallets.baseWallet1,
        baseWallet2: state.app.wallets.baseWallet2,
        multiSigWallet: state.app.wallets.multiSigWallet,
        status: state.app.status,
        multiSigBalance: state.app.multiSigBalance,
    }));

    const dispatch = useDispatch();
    const theme = useTheme();

    const generateBaseWallet = () => {
        if (!baseWallet1.address) {
            return dispatch(genBaseWalletByNumber(1));
        } else if (!baseWallet2.address) {
            return dispatch(genBaseWalletByNumber(2));
        } else if (!multiSigWallet.address) {
            return dispatch(genBaseWalletByNumber(3));
        } else {
            console.warn("All base wallets are already generated");
        }
    };

    const fundGroupWallet = () => {
        dispatch(fundWallet({ address: multiSigWallet.address, curve: 2 }));
    };

    return (
        <Paper elevation={1} square sx={{ height: "100%", position: "relative" }}>

            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
                borderTop={2}
                borderColor={theme.palette.secondary.main}
                padding={2.5}
                gap={4}
                height="100%"
            >

                <Typography variant="h5" borderBottom={1} borderColor={theme.palette.clearGray.main} paddingBottom={1}>
                    Play Tictactoe
                </Typography>

                <Grid container>
                    <Grid item xs={6} flexDirection="column">
                        {instructions.map((instruction, index) =>
                            instruction.left
                                ? instruction.displayCallback({
                                    id: index + 1,
                                    label: instruction.label,
                                })
                                : null
                        )}
                    </Grid>

                    <Grid item xs={6} flexDirection="column">
                        {instructions.map((instruction, index) =>
                            !instruction.left
                                ? instruction.displayCallback({
                                    id: index + 1,
                                    label: instruction.label,
                                })
                                : null
                        )}
                    </Grid>
                </Grid>

                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-around" gap={1}>
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        disabled={!!baseWallet2.address || status === globalStatus.LOADING}
                        onClick={generateBaseWallet}
                    >
                        <Typography fontSize="0.55rem" whiteSpace="nowrap">
                            Generate Base Wallet {baseWallet2.address ? "2" : baseWallet1.address ? "1" : "0"}/2
                        </Typography>
                    </Button>

                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={generateBaseWallet}
                        disabled={
                            !(!!baseWallet1.address && !!baseWallet2.address && !multiSigWallet.address) ||
                            status === globalStatus.LOADING
                        }
                    >
                        <Typography fontSize="0.55rem" whiteSpace="nowrap">
                            Generate Group Wallet
                        </Typography>
                    </Button>

                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={fundGroupWallet}
                        disabled={!multiSigWallet.address || parseInt(multiSigBalance) > 50000}
                    >
                        <Typography fontSize="0.55rem" whiteSpace="nowrap">
                            Fund Group Wallet
                        </Typography>
                    </Button>
                </Box>

                <TicTacToeBoard />

            </Box>

            <Backdrop open={status !== globalStatus.IDLE} sx={{ position: "absolute" }}>
                <CircularProgress />
            </Backdrop>

        </Paper>
    );
}
