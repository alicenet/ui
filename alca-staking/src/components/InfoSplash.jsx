import { Box, Button, Typography, useTheme } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export function InfoSplash() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                flexFlow: "column",
                width: "100%",
                mt: "108px",
            }}
        >
            <Box sx={{ display: "flex", flexFlow: "column" }}>
                <h2 style={{ fontSize: "4.375rem", color: theme.palette.text.tertiary, margin: "0px" }}>5.32% APY</h2>
                <Typography sx={{ fontSize: "1rem", color: theme.palette.text.tertiary }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore
                </Typography>
            </Box>

            <Box mt={"1.5rem"}>
                <Button color="primary">
                    {" "}
                    Connect Wallet
                    <KeyboardArrowRightIcon sx={{ ml: "1rem" }} />
                </Button>
            </Box>
        </Box>
    );
}
