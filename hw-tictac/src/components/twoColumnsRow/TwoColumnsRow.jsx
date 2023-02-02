import React from "react";
import { HelpTooltip } from "components";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";

export function TwoColumnsRow({ title, tooltipContent, children, size = 3, lastRow = false }) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    return (

        <Grid
            container
            sx={{
                paddingX: { xs: 1, md: 3 },
                paddingY: { xs: 1, md: 2 },
                borderBottomLeftRadius: lastRow ? 4 : 0,
                borderBottomRightRadius: lastRow ? 4 : 0,
            }}
        >
            <Grid
                item
                xs={12}
                md={size}
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ padding: { xs: 1, md: 0 } }}
            >
                {matches && tooltipContent && <HelpTooltip content={tooltipContent} />}
                <Typography variant="span">{title}</Typography>
            </Grid>

            <Grid
                item
                xs={12}
                md={12 - size}
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ padding: { xs: 1, md: 0 } }}
            >
                {children}
            </Grid>
        </Grid>

    );

}