import React from "react";
import { CallToAction, LatestBlocks, Page, SearchBar } from "components";
import { Box } from "@mui/material";

export const Home = () => {

    return (

        <Page>
            <Box display="flex" flexDirection="column" gap={4}>
                <SearchBar />
                <Box display="flex" flexDirection="column" gap={4}>
                    <CallToAction />
                    <LatestBlocks />
                </Box>
            </Box>
        </Page>

    );

}