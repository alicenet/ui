import React from "react";
import { Typography } from "@mui/material";

export function HeadingGroup({ title, subtitle }) {
    return (
        <>
            <Typography sx={[{ fontSize: "14px" }]}>{title}</Typography>
            <Typography variant="h5">{subtitle}</Typography>
        </>
    );
}
