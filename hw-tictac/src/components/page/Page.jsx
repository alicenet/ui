import React from "react";
import { Footer, Header } from "components";
import { Box } from "@mui/material";

export const Page = ({ children }) => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={{ xs: "space-around", md: "space-between" }}
            maxWidth="77rem"
            marginX="auto"
            minHeight="100vh"
            paddingX="3rem"
        >

            <Box display="flex" flexDirection="column" gap={1.5}>

                <Header />

                {children}

            </Box>

            <Footer />

        </Box>
    );
};