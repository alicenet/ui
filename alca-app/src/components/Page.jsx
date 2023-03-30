import React from "react";
import { Box } from "@mui/material";
import { NavigationBar } from "components";

export const Page = ({children}) => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            marginX="auto"
            minHeight="100vh"
            paddingX={2}
        >

            <Box>

                <NavigationBar/>

                {children}

            </Box>

        </Box>
    );
};