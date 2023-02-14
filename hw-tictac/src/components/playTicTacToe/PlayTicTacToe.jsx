import React from "react";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import { TicTacToeBoard } from "components";

const instructions = [
    {
        label: "Generate wallet 1",
        left: true,
        displayCallback: ({ id, label }) =>
            <React.Fragment key={`grid-item-instruction-${id}`}>
                <InstructionItem id={id} label={label} />
            </React.Fragment>
    },
    {
        label: "Generate wallet 2",
        left: true,
        displayCallback: ({ id, label }) =>
            <React.Fragment key={`grid-item-instruction-${id}`}>
                <InstructionItem id={id} label={label} />
            </React.Fragment>
    },
    {
        label: "Generate multisig wallet",
        left: true,
        displayCallback: ({ id, label }) =>
            <React.Fragment key={`grid-item-instruction-${id}`}>
                <InstructionItem id={id} label={label} />
            </React.Fragment>
    },
    {
        label: "Fund wallet",
        left: false,
        displayCallback: ({ id, label }) =>
            <React.Fragment key={`grid-item-instruction-${id}`}>
                <InstructionItem id={id} label={label} />
            </React.Fragment>
    },
    {
        label: "Play",
        left: false,
        displayCallback: ({ id, label }) =>
            <React.Fragment key={`grid-item-instruction-${id}`}>
                <InstructionItem id={id} label={label} />
            </React.Fragment>
    },
];

const InstructionItem = ({ id, label }) =>
    <Grid item paddingY={0.25}>
        <Typography variant="span" fontFamily="Roboto">
            <strong>{id}.</strong> {label}
        </Typography>
    </Grid>


export function PlayTicTacToe() {

    const theme = useTheme();

    return (
        <Paper elevation={1} square sx={{ height: "100%" }}>

            <Box
                display="flex"
                flexDirection="column"
                borderTop={2}
                borderColor={theme.palette.secondary.main}
                padding={2.5}
                gap={4}
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

                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-around" gap={1}>

                    <Button color="primary" variant="contained" size="small">
                        <Typography fontSize="0.55rem" whiteSpace="nowrap">Generate Base Wallet 0/2</Typography>
                    </Button>

                    <Button color="primary" variant="contained" size="small" disabled>
                        <Typography fontSize="0.55rem" whiteSpace="nowrap">Generate Group Wallet</Typography>
                    </Button>
                    
                    <Button color="primary" variant="contained" size="small" disabled>
                        <Typography fontSize="0.55rem" whiteSpace="nowrap">Fund Group Wallet</Typography>
                    </Button>

                </Box>

                <TicTacToeBoard />

            </Box>

        </Paper>
    );

}