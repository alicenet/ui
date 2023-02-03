import { Box, Button, Typography, useTheme } from "@mui/material";

export function UnstakingBottomBox({ totalAlcaClaim = 0, ethClaim = 0, alcaRewards = 0, style }) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                background:
                    "linear-gradient(180deg, rgba(165, 198, 255, 0.09) 0%, rgba(165, 198, 255, 0.09) 100%), #191119",
                borderRadius: "18px",
                height: "85%",
                width: "90%",
                px: "18px",
                py: "18px",
                boxSizing: "border-box",
            }}
            style={{ ...style }}
        >
            <Box sx={{ display: "flex", flexFlow: "column", alignItems: "center", width: "100%" }}>
                <Typography sx={{ fontFamily: "JetBrains", fontSize: "14px", mt: "18px", textAlign: "center" }}>
                    Unstake and claim
                </Typography>
                <Typography sx={{ fontFamily: "JetBrains", fontSize: "24px", mt: "2px", textAlign: "center" }}>
                    {totalAlcaClaim} ALCA
                </Typography>
                <Box sx={{ height: "1px", width: "100%", background: "rgba(255, 255, 255, 0.12)", mt: "16px" }} />
                <Box
                    sx={{
                        display: "flex",
                        flexFlow: "column",
                        height: "100%",
                        width: "100%",
                        mt: "16px",
                        color: theme.palette.text.secondary,
                        fontFamily: "JetBrains",
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <Box>You will receive</Box>
                        <Box>{totalAlcaClaim.toLocaleString("us", { minimumFractionDigits: 4 })} ALCA</Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mt: "4px" }}>
                        <Box>ETH Rewards</Box>
                        <Box>{ethClaim.toLocaleString("us", { minimumFractionDigits: 4 })} &nbsp;ETH</Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mt: "4px" }}>
                        <Box>ALCA Rewards</Box>
                        <Box>{alcaRewards.toLocaleString("us", { minimumFractionDigits: 4 })} ALCA</Box>
                    </Box>
                    <Box sx={{ display: "flex", flexGrow: 1 }} />
                    <Box sx={{ mt: "20px" }}>
                        <Button color="secondary" sx={{ height: "42px", width: "100%" }}>
                            Unstake
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
