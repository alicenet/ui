import React from "react";
import { Box, Paper, useTheme } from "@mui/material";

export function ErrorContainer({ children }) {

    const theme = useTheme();

    return (
        <Paper elevation="1">
            <Box
                display="flex"
                flexDirection="column"
                textAlign="left"
                paddingY={4}
                paddingX={6}
                gap={3}
                borderRadius={2}
                borderTop={2}
                borderColor={theme.palette.secondary.main}
            >
                {children}
            </Box>
        </Paper>

    );

}
