import React from "react";
import { Footer, Header } from "components";
import { Box } from "@mui/material";

export const Page = ({ children }) => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            maxWidth="72rem"
            marginX="auto"
            minHeight="100vh"
            paddingX={2}
        >

            <Box>

                <Header />

                {children}

            </Box>

            <Footer />

        </Box>
    );
};