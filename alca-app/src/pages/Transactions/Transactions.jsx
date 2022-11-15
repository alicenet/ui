import { Box, Grid, TextField, Button, Typography, Divider, InputAdornment, Switch } from "@mui/material";
import { useTheme } from "@emotion/react";
import { ChevronRight, InfoOutlined } from "@mui/icons-material";
import { Header } from "components";
import { NavigationBar } from "components/NavigationBar";

export function Transactions() {
    const theme = useTheme();

    const activeBoxStyles = {
        background: `linear-gradient(180deg, ${theme.palette.secondary.startGradient} 18.53%, ${theme.palette.secondary.endGradient} 167.76%)`,
        color: "secondary.contrastText",
        borderRadius: "4px",
    };

    const titleLabelStyles = {
        borderRadius: "2px",
        px: 1,
        py: 0.5,
        mr: 1,
        fontWeight: "bold",
    };

    const activeTitleLabelColor = { bgcolor: "dark.main", color: "secondary.main" };

    const defaultTitleLabelColor = { bgcolor: "secondary.darkText", color: "dark.main" };

    const migrationBoxStyles = {
        background: `linear-gradient(180deg, ${theme.palette.dark.elevation12} 0%, ${theme.palette.dark.elevation12} 100%), ${theme.palette.dark.main}`,
        borderRadius: "4px",
        boxShadow: 10, // active box
        flex: 1,
    };

    const stakingAndLockupStyles = {
        background: `linear-gradient(180deg, ${theme.palette.dark.elevation1} 0%, ${theme.palette.dark.elevation1} 100%), ${theme.palette.dark.main}`,
        borderRadius: "4px",
        p: 2,
        flex: 1,
    };

    const createStakingStyles = {
        background: `linear-gradient(180deg, ${theme.palette.dark.elevation3} 0%, ${theme.palette.light.elevation3} 100%, ${theme.palette.dark.elevation1} 100%), ${theme.palette.dark.main}`,
        alignItems: "center",
        py: 1,
        mt: 2,
        mb: 4,
    };

    const fadeOutTextStyle = { fontSize: "14px", color: "secondary.darkText" };

    const fadeOutText2Style = { color: "secondary.darkTextDisabled" };

    return (
        <>
            <Header />

            <NavigationBar />

            <Grid container sx={{ mt: 4 }}>
                <Grid item xs={4} sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ ...activeBoxStyles, p: 2 }}>
                        <Typography variant="body1" component="h1">
                            <Box component="span" sx={[titleLabelStyles, activeTitleLabelColor]}>
                                1
                            </Box>
                            Migration MAD to ALCA
                        </Typography>
                    </Box>

                    <Box p={2} sx={[migrationBoxStyles]}>
                        <Typography sx={[fadeOutTextStyle]}>Current MAD Balance</Typography>
                        <Typography variant="h5">2,000 MAD</Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography sx={[fadeOutTextStyle]}>Exchange rate from MAD to ALCA</Typography>
                        <Typography variant="body1">1 MAD Token ≈ 1.56 ALCA Token</Typography>

                        <Box sx={[{ display: "flex", alignItems: "center", columnGap: 1, mt: 3, mb: 1 }]}>
                            <TextField id="" label="Migrate to ALCA" size="small" value={0} onChange={() => {}} />
                            <Button variant="contained" color="secondary">
                                All
                            </Button>
                        </Box>

                        <Typography variant="body1">
                            you will recieve <strong>0 ALCA</strong>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={8} sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="body1" component="h1">
                            <Box component="span" sx={[titleLabelStyles, defaultTitleLabelColor]}>
                                2
                            </Box>
                            Staking & Lockup ALCA
                        </Typography>
                    </Box>

                    <Box sx={[stakingAndLockupStyles]}>
                        <Typography sx={[{ fontSize: "14px" }]}>Future ALCA balance</Typography>
                        <Typography variant="h5">0 ALCA</Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography sx={[{ fontSize: "14px" }]}>CREATE STAKING</Typography>

                        <Grid sx={[{ alignItems: "center", mt: 2 }]}>
                            <Grid container item spacing={1}>
                                <Grid item xs={4}>
                                    <Typography sx={{ px: 2, display: "flex", alignItems: "center" }}>
                                        Amount
                                        <InfoOutlined color="disabled" fontSize="small" sx={{ ml: 0.5 }} />
                                    </Typography>
                                </Grid>

                                <Grid item xs>
                                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                                        Reward Type
                                        <InfoOutlined color="disabled" fontSize="small" sx={{ ml: 0.5 }} />
                                    </Typography>
                                </Grid>

                                <Grid item xs>
                                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                                        Interest
                                        <InfoOutlined color="disabled" fontSize="small" sx={{ ml: 0.5 }} />
                                    </Typography>
                                </Grid>

                                <Grid item xs>
                                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                                        Lockup Time
                                        <InfoOutlined color="disabled" fontSize="small" sx={{ ml: 0.5 }} />
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container item sx={[createStakingStyles]}>
                                <Grid item xs={4} sx={{ px: 2 }}>
                                    <TextField
                                        id=""
                                        value={0}
                                        onChange={() => {}}
                                        size="small"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">ALCA</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs>
                                    <Typography sx={[fadeOutText2Style]}>ETH & ALCA</Typography>
                                </Grid>

                                <Grid item xs>
                                    <Typography sx={[fadeOutText2Style]}>10%</Typography>
                                </Grid>

                                <Grid item xs>
                                    <Switch disabled />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={[{ mt: 2, display: "flex", justifyContent: "flex-end" }]}>
                <Button sx={[{ mr: 1 }]} variant="outlined" disabled>
                    Reset TX
                </Button>
                <Button endIcon={<ChevronRight />} variant="contained" disabled>
                    Review TX
                </Button>
            </Box>
        </>
    );
}
