import React from "react";
import { Footer, Header } from "components";
import { Box } from "@mui/material";

export const Page = ({ children }) => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={{ xs: "space-around", md: "space-between" }}
            maxWidth="76rem"
            marginX="auto"
            minHeight="100vh"
            paddingX="3rem"
        >

            <Box>

                <Header />

                {children}

            </Box>

            <Footer />

        </Box>
    );
};