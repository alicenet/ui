import React from "react";
import { Box, Button, CircularProgress, Grid, Paper, Typography, useTheme } from "@mui/material";
import { TicTacToeBoard } from "components";
import { useDispatch, useSelector } from "react-redux";
import { genBaseWalletByNumber, generateBaseWallet1 } from "redux/actions";
import { globalStatus, setLoading } from "redux/reducers";

const instructions = [
    {
        label: "Generate wallet 1",
        left: true,
        displayCallback: ({ id, label }) => (
            <React.Fragment key={`grid-item-instruction-${id}`}>
                <InstructionItem id={id} label={label} />
            </React.Fragment>
        ),
    },
    {
        label: "Generate wallet 2",
        left: true,
        displayCallback: ({ id, label }) => (
            <React.Fragment key={`grid-item-instruction-${id}`}>
                <InstructionItem id={id} label={label} />
            </React.Fragment>
        ),
    },
    {
        label: "Generate multisig wallet",
        left: true,
        displayCallback: ({ id, label }) => (
            <React.Fragment key={`grid-item-instruction-${id}`}>
                <InstructionItem id={id} label={label} />
            </React.Fragment>
        ),
    },
    {
        label: "Fund wallet",
        left: false,
        displayCallback: ({ id, label }) => (
            <React.Fragment key={`grid-item-instruction-${id}`}>
                <InstructionItem id={id} label={label} />
            </React.Fragment>
        ),
    },
    {
        label: "Play",
        left: false,
        displayCallback: ({ id, label }) => (
            <React.Fragment key={`grid-item-instruction-${id}`}>
                <InstructionItem id={id} label={label} />
            </React.Fragment>
        ),
    },
];

const InstructionItem = ({ id, label }) => (
    <Grid item paddingY={0.25}>
        <Typography variant="span" fontFamily="Roboto">
            <strong>{id}.</strong> {label}
        </Typography>
    </Grid>
);

export function PlayTicTacToe() {
    const { baseWallet1, baseWallet2, multiSigWallet, status } = useSelector((state) => ({
        baseWallet1: state.app.wallets.baseWallet1,
        baseWallet2: state.app.wallets.baseWallet2,
        multiSigWallet: state.app.wallets.multiSigWallet,
        status: state.app.status,
    }));

    const dispatch = useDispatch();
    const theme = useTheme();

    const genBaseWallet = () => {
        if (!baseWallet1.address) {
            return dispatch(genBaseWalletByNumber(1));
        } else if (!baseWallet2.address) {
            return dispatch(genBaseWalletByNumber(2));
        } else if (!multiSigWallet.address) {
            return dispatch(genBaseWalletByNumber(3));
        } else {
            console.warn("All base wallets generated, don't allow this function call!");
        }
    };

    return (
        <Paper elevation={1} square>
            <Box
                display="flex"
                flexDirection="column"
                borderTop={2}
                borderColor={theme.palette.secondary.main}
                padding={2.5}
                gap={4}
            >
                <Typography variant="h5" borderBottom={1} borderColor={theme.palette.clearGray.main} paddingBottom={1}>
                    Play Tictactoe ({status})
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

                <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
                    <Grid item>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            disabled={!!baseWallet2.address || status === globalStatus.LOADING}
                            onClick={genBaseWallet}
                        >
                            <Typography fontSize="0.55rem" whiteSpace="nowrap">
                                Generate Base Wallet {baseWallet2.address ? "2" : baseWallet1.address ? "1" : "0"}/2
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={genBaseWallet}
                            disabled={
                                !(!!baseWallet1.address && !!baseWallet2.address && !multiSigWallet.address) ||
                                status === globalStatus.LOADING
                            }
                        >
                            <Typography fontSize="0.55rem" whiteSpace="nowrap">
                                Generate Group Wallet
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained" size="small" disabled>
                            <Typography fontSize="0.55rem" whiteSpace="nowrap">
                                Fund Group Wallet
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>

                <TicTacToeBoard />
            </Box>
        </Paper>
    );
}
