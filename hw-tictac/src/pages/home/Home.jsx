import React from "react";
import { GroupDataStoreIndex, Page, PlayTicTacToe, ProofOfConcept, WalletComposition } from "components";
import { Box, Grid } from "@mui/material";

export const Home = () => {

    return (

        <Page>

            <Grid container spacing={3}>

                <Grid item xs={12} md={5}>

                    <PlayTicTacToe />

                </Grid>

                <Grid item xs={12} md={7}>

                    <Box display="flex" flexDirection="column" gap={4}>

                        <ProofOfConcept />
                        <WalletComposition />
                        <GroupDataStoreIndex />

                    </Box>

                </Grid>

            </Grid>

        </Page>

    );

}