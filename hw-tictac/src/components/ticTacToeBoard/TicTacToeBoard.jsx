import React from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";

export function TicTacToeBoard() {

    return (
        <Box display="flex" flexDirection="column" gap={2} alignItems="center">
            <Box>Board is missing</Box>
            <Grid container alignItems={"center"} justifyContent={"space-evenly"}>
                <Grid item>
                    <Typography>
                        Playing Next: X
                    </Typography>
                </Grid>
                <Divider role="presentation" orientation="vertical" flexItem />
                <Grid item>
                    <Typography>
                        AliceNet Bytes: 0 ALCB
                    </Typography>
                </Grid>
            </Grid>
            <Box display={"flex"} flexDirection={"row"} gap={2}>
                <Button variant="outlined" size="small" sx={{ paddingY: 0.75, paddingX: 3 }}>
                    Load Game
                </Button>
                <Button variant="outlined" size="small" sx={{ paddingY: 0.75, paddingX: 3 }}>
                    Reset
                </Button>
                <Button variant="outlined" size="small" sx={{ paddingY: 0.75, paddingX: 3 }}>
                    Help
                </Button>
            </Box>
        </Box>
    );

}