import React from "react";
import { LatestBlocks, Page } from "components";
import { Box } from "@mui/material";

export const Home = () => {

    return (

        <Page>
            <Box display="flex" flexDirection="column">
                <LatestBlocks />
            </Box>
        </Page>

    );

}