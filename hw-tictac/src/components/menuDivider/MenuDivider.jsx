import React from "react";
import { Box, useTheme } from "@mui/material";

export const MenuDivider = () => {
    const theme = useTheme();
    return (
        <Box
            paddingY={0.75}
            border={1}
            borderColor={theme.palette.clearGray.main}
            sx={{ borderStyle: { xs: "none", md: "solid" } }}
        />
    );
}
