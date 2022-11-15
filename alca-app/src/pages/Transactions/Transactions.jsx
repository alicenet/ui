import {
    Box,
    Grid,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
    Typography,
    Divider,
    InputAdornment,
    Switch,
} from "@mui/material";
import { ChevronRight, Loop, Download } from "@mui/icons-material";
import { Header } from "components";
import { NavigationBar } from "components/NavigationBar";

export function Transactions() {
    return (
        <>
            <Header />

            <NavigationBar />

            <Stepper activeStep={2} sx={[{ mt: 4 }]}>
                <Step key={"Migration"}>
                    <StepLabel>
                        <Typography variant="body1" component="h1">
                            Migration
                        </Typography>
                        <Typography variant="body2">From MAD to ALCA</Typography>
                    </StepLabel>
                </Step>
                <Step key={"Stake"}>
                    <StepLabel>
                        <Typography variant="body1" component="h1">
                            Stake / Lockup period
                        </Typography>
                        <Typography variant="body2">ALCA Stating</Typography>
                    </StepLabel>
                </Step>
            </Stepper>

            <Grid container columnSpacing={2} sx={[{ mt: 4 }]}>
                <Grid item xs={4}>
                    <Typography variant="h6" component="h1" mb={1} sx={[{ display: "flex", alignItems: "center" }]}>
                        <Download fontSize="small" /> MAD Migration
                    </Typography>
                    <Box p={2}>
                        <Typography sx={[{ fontSize: "14px" }]}>Current MAD Balance</Typography>
                        <Typography variant="h5">2,000 MAD</Typography>

                        <Divider />

                        <Typography sx={[{ fontSize: "14px" }]}>Exchange rate from MAD to ALCA</Typography>
                        <Typography variant="body1">1 MAD Token ≈ 1.56 ALCA Token</Typography>

                        <Box sx={[{ display: "flex", alignItems: "center", columnGap: 1 }]}>
                            <TextField id="" label="Migrate to ALCA" sx={[{ mt: 3 }]} value={0} onChange={() => {}} />
                            <Button variant="text">Migrate</Button>
                        </Box>

                        <Typography variant="body1">
                            Will recieve <strong>0 ALCA</strong>
                        </Typography>

                        <Button variant="text" endIcon={<ChevronRight />}>
                            Calculate
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={8}>
                    <Typography variant="h6" component="h1" mb={1} sx={[{ display: "flex", alignItems: "center" }]}>
                        <Loop fontSize="small" /> Staking & Lockup ALCA
                    </Typography>

                    <Box sx={[{ padding: 2 }]}>
                        <Typography sx={[{ fontSize: "14px" }]}>Future ALCA balance</Typography>
                        <Typography variant="h5">0 ALCA</Typography>

                        <Divider />

                        <Typography sx={[{ fontSize: "14px" }]}>Create Staking</Typography>

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

                                <Grid container item spacing={2} sx={[{ alignItems: "center" }]}>
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
                <Button sx={[{ mr: 1 }]}>Reset TX</Button>
                <Button endIcon={<ChevronRight />}>Review TX</Button>
            </Box>
        </>
    );
}
