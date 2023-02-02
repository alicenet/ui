import React from "react";
import { Box, useTheme } from "@mui/material";

export const MenuDivider = () => {
    const theme = useTheme();
    return (
        <Box
            marginY={0.5}
            border={1}
            borderColor={theme.palette.tableBlack.main}
            sx={{ borderStyle: { xs: "none", md: "solid" } }}
        />
    );
}
