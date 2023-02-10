import React from "react";
import { Box, Button, useTheme } from "@mui/material";

export function TicTacToeBoard() {

    const theme = useTheme();

    return (
        <Box display="flex" flexDirection="column" gap={1} alignItems="center">
            <Box></Box>
            <Box></Box>
            <Box display={"flex"} flexDirection={"row"} gap={2}>
                <Button variant="outlined" size="small" sx={{ paddingY: 0.75, paddingX: 2 }}>
                    Load Game
                </Button>
                <Button variant="outlined" size="small">
                    Reset
                </Button>
                <Button variant="outlined" size="small">
                    Help
                </Button>
            </Box>
        </Box>
    );

}