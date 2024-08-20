import React from "react";
import { Box } from "@mui/material";

export function CountBubble({ count }) {
    return (
        <Box
            sx={{
                marginLeft: 0.75,
                fontSize: 12,
                color: "#fff",
                padding: "1px 7px",
                bgcolor: "#0000007a",
                borderRadius: 10,
            }}
        >
            {count}
        </Box>
    );
}
