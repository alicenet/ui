import React from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";

export function PlayTicTacToe() {

    const theme = useTheme();

    return (
        <Paper elevation={1} square>
            <Box
                borderTop={2}
                borderColor={theme.palette.secondary.main}
                padding={2.5}
            >
                <Typography
                    variant="h5"
                    borderBottom={1}
                    borderColor={theme.palette.clearGray.main}
                    paddingBottom={1}
                >
                    Play Tictactoe
                </Typography>
            </Box>
        </Paper>
    );

}