import { Box, Typography, useTheme } from "@mui/material";
import { ThemedPrimaryButton } from "./AliceThemeButtons";

export function InfoSplash() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                flexFlow: "column",
                width: "100%",
                mt: "82px",
            }}
        >
            <Box sx={{ display: "flex", flexFlow: "column" }}>
                <h2 style={{ fontSize: "5rem", color: theme.palette.text.tertiary, margin: "0px" }}>5.12% APY</h2>
                <Typography sx={{ fontSize: "1.25rem" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore
                </Typography>
            </Box>

            <Box mt={"1.5rem"}>
                <ThemedPrimaryButton> Connect </ThemedPrimaryButton>
            </Box>
        </Box>
    );
}
