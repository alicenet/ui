import React from "react";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";

const instructions = [
    {
        label: "Generate wallet 1",
        left: true,
        displayCallback: ({ id, label }) => <InstructionItem id={id} label={label} />
    },
    {
        label: "Generate wallet 2",
        left: true,
        displayCallback: ({ id, label }) => <InstructionItem id={id} label={label} />
    },
    {
        label: "Generate multisig wallet",
        left: true,
        displayCallback: ({ id, label }) => <InstructionItem id={id} label={label} />
    },
    {
        label: "Fund wallet",
        left: false,
        displayCallback: ({ id, label }) => <InstructionItem id={id} label={label} />
    },
    {
        label: "Play",
        left: false,
        displayCallback: ({ id, label }) => <InstructionItem id={id} label={label} />
    },
];

const InstructionItem = ({ id, label }) =>
    <Grid item key={`grid-item-instruction-${id}`} paddingY={0.25}>
        <Typography variant="span" fontFamily="Roboto">
            <strong>{id}.</strong> {label}
        </Typography>
    </Grid>


export function PlayTicTacToe() {

    const theme = useTheme();

    return (
        <Paper elevation={1} square>
            <Box
                display="flex"
                flexDirection="column"
                borderTop={2}
                borderColor={theme.palette.secondary.main}
                padding={2.5}
                gap={3}
            >
                <Typography
                    variant="h5"
                    borderBottom={1}
                    borderColor={theme.palette.clearGray.main}
                    paddingBottom={1}
                >
                    Play Tictactoe
                </Typography>

                <Grid container>
                    <Grid item xs={6} flexDirection="column">
                        {instructions.map((instruction, index) =>
                            instruction.left ?
                                instruction.displayCallback({
                                    id: index + 1,
                                    label: instruction.label
                                }) : null
                        )}
                    </Grid>
                    <Grid item xs={6} flexDirection="column">
                        {instructions.map((instruction, index) =>
                            !instruction.left ?
                                instruction.displayCallback({
                                    id: index + 1,
                                    label: instruction.label
                                }) : null
                        )}
                    </Grid>
                </Grid>

                <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
                    <Grid item>
                        <Button color="primary" variant="contained" size="small">
                            <Typography fontSize="0.55rem" whiteSpace="nowrap">Generate Base Wallet 0/2</Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained" size="small" disabled>
                            <Typography fontSize="0.55rem" whiteSpace="nowrap">Generate Group Wallet</Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained" size="small" disabled>
                            <Typography fontSize="0.55rem" whiteSpace="nowrap">Fund Group Wallet</Typography>
                        </Button>
                    </Grid>
                </Grid>

            </Box>

        </Paper>
    );

}