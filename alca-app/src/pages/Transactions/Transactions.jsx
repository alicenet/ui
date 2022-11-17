import { useState, useContext } from "react";
import { BalanceContext } from "alice-ui-common";
import { symbols } from "config/symbolConfiguration";
import { sx } from "utils/sx";

import { useTheme } from "@emotion/react";
import { Box, Grid, TextField, Button, Typography, Divider, InputAdornment, Switch, Container } from "@mui/material";
import { ChevronRight, InfoOutlined } from "@mui/icons-material";
import { NavigationBar } from "components/NavigationBar";
import { SubNavigation } from "components/SubNavigation";

export function Transactions() {
    const { balances = {} } = useContext(BalanceContext);
    const theme = useTheme();
    const [alca, setAlcaBalance] = useState(0);

    // Title Box Styles
    const activeBoxTitleStyles = {
        background: `linear-gradient(
            180deg,
            ${theme.palette.secondary.startGradient} 18.53%,
            ${theme.palette.secondary.endGradient}
            167.76%
        )`,
        color: "secondary.contrastText",
    };
    const columnOneTitleBoxSx = sx({ condition: alca <= 0, sx: activeBoxTitleStyles });
    const columnTwoTitleBoxSx = sx({ condition: alca > 0, sx: activeBoxTitleStyles });

    // Title Styles
    const activeLabelColorStyles = { bgcolor: "dark.main", color: "secondary.main" };
    const inactiveLabelColorStyles = { bgcolor: "secondary.darkText", color: "dark.main" };
    const columnOneTitleSx = sx(inactiveLabelColorStyles, {
        condition: alca <= 0,
        sx: activeLabelColorStyles,
    });
    const columnTwoTitleSx = sx(inactiveLabelColorStyles, {
        condition: alca > 0,
        sx: activeLabelColorStyles,
    });

    // Box Styles
    const activeBoxStyles = {
        background: `linear-gradient(
            180deg,
            ${theme.palette.dark.elevation12} 0%,
            ${theme.palette.dark.elevation12} 100%
        ), ${theme.palette.dark.main}`,
    };
    const inactiveBoxStyles = {
        background: `linear-gradient(
            180deg,
            ${theme.palette.dark.elevation1} 0%,
            ${theme.palette.dark.elevation1} 100%
        ),${theme.palette.dark.main} `,
    };
    const columnOneBoxSx = sx(inactiveBoxStyles, { condition: alca <= 0, sx: activeBoxStyles });
    const columnTwoBoxSx = sx(inactiveBoxStyles, { condition: alca > 0, sx: activeBoxStyles });

    const gridStyles = {
        background: `linear-gradient(
            180deg, ${theme.palette.dark.elevation3} 0%,
            ${theme.palette.light.elevation3} 100%,
            ${theme.palette.dark.elevation1} 100%
        ), ${theme.palette.dark.main}`,
    };

    // Common Styles
    const activeFadeOutTextStyle = { fontSize: "14px", color: "secondary.darkText" };
    const inactiveFadeOutTextStyle = { color: "secondary.darkTextDisabled" };
    const columnOneFadeOutTxtSx = sx(inactiveFadeOutTextStyle, { condition: alca <= 0, sx: activeFadeOutTextStyle });
    const columnTwoFadeOutTxtSx = sx(inactiveFadeOutTextStyle, { condition: alca > 0, sx: activeFadeOutTextStyle });

    return (
        <>
            <NavigationBar />

            <Container maxWidth="lg">
                <SubNavigation />

                <Grid container>
                    <Grid item xs={4} display="flex" flexDirection="column">
                        <Box p={2} borderRadius="4px" sx={columnOneTitleBoxSx}>
                            <Typography variant="body1" component="h1">
                                <Box
                                    component="span"
                                    px={1}
                                    py={0.5}
                                    mr={1}
                                    borderRadius="2px"
                                    fontWeight="bold"
                                    sx={columnOneTitleSx}
                                >
                                    1
                                </Box>
                                Migration {symbols.MAD} to {symbols.ALCA}
                            </Typography>
                        </Box>

                        <Box p={2} borderRadius="4px" flex={1} sx={columnOneBoxSx}>
                            <Typography sx={columnOneFadeOutTxtSx}>Current {symbols.MAD} Balance</Typography>
                            <Typography variant="h5">
                                {balances.mad || 0} {symbols.MAD}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Typography sx={columnOneFadeOutTxtSx}>
                                Exchange rate from {symbols.MAD} to {symbols.ALCA}
                            </Typography>
                            <Typography variant="body1">
                                1 {symbols.MAD} Token ≈ 1.56 {symbols.ALCA} Token
                            </Typography>

                            <Box columnGap={1} mt={3} mb={1} display="flex" alignItems="center">
                                <TextField
                                    id=""
                                    label="Migrate to ALCA"
                                    size="small"
                                    value={alca}
                                    onChange={(event) => setAlcaBalance(event.target.value)}
                                />
                                <Button variant="contained" color="secondary">
                                    All
                                </Button>
                            </Box>

                            <Typography variant="body1">
                                you will recieve{" "}
                                <strong>
                                    {alca || 0} {symbols.ALCA}
                                </strong>
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={8} display="flex" flexDirection="column">
                        <Box p={2} borderRadius="4px" sx={columnTwoTitleBoxSx}>
                            <Typography variant="body1" component="h1">
                                <Box
                                    component="span"
                                    px={1}
                                    py={0.5}
                                    mr={1}
                                    borderRadius="2px"
                                    fontWeight="bold"
                                    sx={columnTwoTitleSx}
                                >
                                    2
                                </Box>
                                Staking & Lockup {symbols.ALCA}
                            </Typography>
                        </Box>

                        <Box p={2} borderRadius="4px" flex={1} sx={columnTwoBoxSx}>
                            <Typography>Future {symbols.ALCA} balance</Typography>
                            <Typography variant="h5">
                                {alca || 0} {symbols.ALCA}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Typography>CREATE STAKING</Typography>
                            <Grid mt={2} alignItems="center">
                                <Grid container item>
                                    <Grid item xs={5}>
                                        <Typography px={2} display="flex" alignItems="center">
                                            Amount
                                            <InfoOutlined color="disabled" fontSize="small" sx={{ ml: 0.5 }} />
                                        </Typography>
                                    </Grid>

                                    <Grid item xs>
                                        <Typography display="flex" alignItems="center">
                                            Reward Type
                                            <InfoOutlined color="disabled" fontSize="small" sx={{ ml: 0.5 }} />
                                        </Typography>
                                    </Grid>

                                    <Grid item xs>
                                        <Typography display="flex" alignItems="center">
                                            Rewards
                                            <InfoOutlined color="disabled" fontSize="small" sx={{ ml: 0.5 }} />
                                        </Typography>
                                    </Grid>

                                    <Grid item xs columnGap={1}>
                                        <Typography display="flex" alignItems="center">
                                            Lockup
                                            <InfoOutlined color="disabled" fontSize="small" sx={{ ml: 0.5 }} />
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    item
                                    alignItems="center"
                                    borderRadius="2px"
                                    py={1}
                                    mt={2}
                                    mb={4}
                                    sx={[gridStyles]}
                                >
                                    <Grid item xs={5} px={2} columnGap={1} display="flex" alignItems="center">
                                        <TextField
                                            id=""
                                            value={0}
                                            onChange={() => {}}
                                            size="small"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">{symbols.ALCA}</InputAdornment>
                                                ),
                                            }}
                                        />

                                        <Button variant="contained" size="small" color="secondary">
                                            All
                                        </Button>
                                    </Grid>

                                    <Grid item xs>
                                        <Typography sx={columnTwoFadeOutTxtSx}>
                                            {symbols.ETH} & {symbols.ALCA}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs>
                                        <Typography sx={columnTwoFadeOutTxtSx}>(BR/3) / n Stakers</Typography>
                                    </Grid>

                                    <Grid item xs>
                                        <Switch disabled={!alca} color="secondary" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>

                <Box columnGap={1} mt={2} display="flex" justifyContent="flex-end">
                    <Button variant="outlined" disabled={!alca}>
                        Reset TX
                    </Button>

                    <Button endIcon={<ChevronRight />} variant="contained" disabled={!alca}>
                        Review TX
                    </Button>
                </Box>
            </Container>
        </>
    );
}
