import { Box, Grid, TextField, Button, Typography, Divider, InputAdornment, Switch } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { Header } from "components";
import { NavigationBar } from "components/NavigationBar";

export function Transactions() {
    const activeBox = {
        background: "linear-gradient(180deg, #FFABD4 18.53%, #CE6D99 167.76%)",
        color: "secondary.contrastText",
        borderRadius: "4px",
    };

    return (
        <>
            <Header />

            <NavigationBar />

            <Grid container sx={{ mt: 4 }}>
                <Grid item xs={4} sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ ...activeBox, p: 2 }}>
                        <Typography variant="body1" component="h1">
                            Migration MAD to ALCA
                        </Typography>
                    </Box>

                    <Box
                        p={2}
                        sx={{
                            // Move this background to config/theme
                            background: "linear-gradient(180deg, rgba(165, 198, 255, 0.14) 0%, rgba(165, 198, 255, 0.14) 100%), #11151C",
                            borderRadius: "4px",
                            boxShadow: 10, // When active
                        }}
                    >
                        <Typography sx={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7);" }}>Current MAD Balance</Typography>
                        <Typography variant="h5">2,000 MAD</Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography sx={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7);" }}>Exchange rate from MAD to ALCA</Typography>
                        <Typography variant="body1">1 MAD Token ≈ 1.56 ALCA Token</Typography>

                        <Box sx={[{ display: "flex", alignItems: "center", columnGap: 1, mt: 3, mb: 1 }]}>
                            <TextField id="" label="Migrate to ALCA" value={0} onChange={() => {}} />
                            <Button variant="contained" color="secondary">
                                All
                            </Button>
                        </Box>

                        <Typography variant="body1">
                            you Will recieve <strong>0 ALCA</strong>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={8} sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="body1" component="h1">
                            Staking & Lockup ALCA
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            // Move this background to config/theme
                            background: "linear-gradient(180deg, rgba(165, 198, 255, 0.05) 0%, rgba(165, 198, 255, 0.05) 100%), #11151C",
                            borderRadius: "4px",
                            padding: 2,
                            flex: 1,
                        }}
                    >
                        <Typography sx={[{ fontSize: "14px" }]}>Future ALCA balance</Typography>
                        <Typography variant="h5">0 ALCA</Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography sx={[{ fontSize: "14px" }]}>CREATE STAKING</Typography>

                        <Grid container sx={[{ alignItems: "center", mt: 2 }]}>
                            <Grid container spacing={2}>
                                <Grid container item spacing={1}>
                                    <Grid item xs={3}>
                                        <div>Amount</div>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <div>Reward Type</div>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <div>Interest</div>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <div>Lockup Time</div>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    item
                                    sx={[
                                        {
                                            background:
                                                "linear-gradient(180deg, rgba(165, 198, 255, 0.08) 0%, rgba(255, 255, 255, 0.08) 100%, rgba(165, 198, 255, 0.08) 100%), #11151C",
                                            alignItems: "center",
                                        },
                                    ]}
                                >
                                    <Grid item xs={3}>
                                        <TextField
                                            id=""
                                            value={0}
                                            onChange={() => {}}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">ALCA</InputAdornment>,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <div>ETH & ALCA</div>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <div>10%</div>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Switch disabled />
                                    </Grid>
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
