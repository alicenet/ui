import React from "react";
import { Typography, Link } from "@mui/material";
import { configuration } from "config/_config";

export function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                {configuration.site.copyriteName}
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
