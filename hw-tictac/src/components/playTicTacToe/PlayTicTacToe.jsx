import React from "react";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import { TicTacToeBoard } from "components";
import { useDispatch, useSelector } from "react-redux";
import { fundWallet, genBaseWalletByNumber } from "redux/actions";
import { globalStatus } from "redux/reducers";

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
    const { baseWallet1, baseWallet2, multiSigWallet, status, multiSigBalance } = useSelector((state) => ({
        baseWallet1: state.app.wallets.baseWallet1,
        baseWallet2: state.app.wallets.baseWallet2,
        multiSigWallet: state.app.wallets.multiSigWallet,
        status: state.app.status,
        multiSigBalance: state.app.multiSigBalance,
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

    const fundGrp = () => {
        dispatch(fundWallet({ address: multiSigWallet.address, curve: 2 }));
    };

    return (
        <Paper elevation={1} square sx={{ height: "100%" }}>
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

                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-around" gap={1}>
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

                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={fundGrp}
                        disabled={!multiSigWallet.address || parseInt(multiSigBalance) > 50000}
                    >
                        <Typography fontSize="0.55rem" whiteSpace="nowrap">
                            Fund Group Wallet
                        </Typography>
                    </Button>
                </Box>

                <TicTacToeBoard />
            </Box>
        </Paper>
    );
}
