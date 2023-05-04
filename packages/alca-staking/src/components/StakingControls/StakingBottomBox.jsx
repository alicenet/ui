import { useTheme } from "@emotion/react";
import { Box, TextField, Typography, Slider, Button, InputAdornment } from "@mui/material";

export function StakingBottomBox({ stakeAmt, setStakeAmt, alcaBalance, setMax, style }) {
    const theme = useTheme();
    return (
        <Box
            sx={{ display: "flex", flexFlow: "column", flexGrow: 1, pl: "0px", pt: "20px", width: "90%" }}
            style={{ ...style }}
        >
            <Typography sx={{ fontFamily: "JetBrains", fontSize: ".75rem", color: theme.palette.text.primary }}>
                Stake Your ALCA
            </Typography>
            <Box sx={{ mt: "6px" }}>
                <TextField
                    sx={{
                        width: "100%",
                        height: "48px",
                        fontFamily: "JetBrains",
                    }}
                    value={stakeAmt}
                    onChange={(e) => {
                        setStakeAmt(e.target.value);
                    }}
                    color="secondary"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    onClick={setMax}
                                    color="secondary"
                                    sx={{ height: "30px", width: "45px", px: "10px", py: "8px" }}
                                >
                                    MAX
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Box sx={{ mt: "21px", display: "flex", justifyContent: "center" }}>
                <Slider
                    sx={{ color: theme.palette.secondary.main, width: "95%" }}
                    size="medium"
                    defaultValue={50}
                    aria-label="Small"
                    valueLabelDisplay="off"
                    marks={true}
                    step={parseFloat(alcaBalance) / 20}
                    min={0}
                    max={parseFloat(alcaBalance)}
                    value={stakeAmt}
                    onChange={(e) => {
                        setStakeAmt(e.target.value);
                    }}
                />
            </Box>
            <Box sx={{ mt: "24px" }}>
                <Button
                    color="secondary"
                    sx={{
                        width: "100%",
                        height: "42px",
                        fontSize: ".9375rem",
                    }}
                >
                    Stake Now
                </Button>
            </Box>
            <Box sx={{ display: "flex", flexGrow: 1 }} />
            <Box sx={{ mt: "18px", display: "flex", flexFlow: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Typography sx={{ fontSize: "14px", fontFamily: "JetBrains" }}>You Will Stake</Typography>
                    <Typography sx={{ fontSize: "14px", fontFamily: "JetBrains" }}>{stakeAmt} ALCA</Typography>
                </Box>
                <Box sx={{ mt: "4px", display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Typography sx={{ fontSize: "14px", fontFamily: "JetBrains" }}>APY</Typography>
                    <Typography sx={{ fontSize: "14px", fontFamily: "JetBrains" }}>5.32%</Typography>
                </Box>
            </Box>
        </Box>
    );
}
