import { useState, useContext, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { BalanceContext } from "alice-ui-common";
import { sx } from "utils/sx";
import { Box, Grid, TextField, Button, Typography, Divider, InputAdornment, Switch, Container } from "@mui/material";
import { ChevronRight, InfoOutlined } from "@mui/icons-material";
import { NavigationBar, SubNavigation } from "components";
import { symbols } from "config";

export function Transactions() {
    const { balances = {} } = useContext(BalanceContext);
    const theme = useTheme();

    const hideMigrationPanel = balances.mad.value === "0" || balances.mad.value === "n/a" || !!balances.mad.error;

    // ALCA for migration
    const [alcaForMigration, setAlcaForMigration] = useState(0);
    const [madExchangeAmount, setMadExchangeAmount] = useState(0);

    // Title Box Styles=
    const activeBoxTitleStyles = {
        background: `linear-gradient(
            180deg,
            ${theme.palette.secondary.startGradient} 18.53%,
            ${theme.palette.secondary.endGradient}
            167.76%
        )`,
        color: "secondary.contrastText",
    };
    const columnOneTitleBoxSx = sx({ condition: alcaForMigration <= 0, sx: activeBoxTitleStyles });
    const columnTwoTitleBoxSx = sx({ condition: alcaForMigration > 0 || hideMigrationPanel, sx: activeBoxTitleStyles });

    // Title Styles
    const activeLabelColorStyles = { bgcolor: "dark.main", color: "secondary.main" };
    const inactiveLabelColorStyles = { bgcolor: "secondary.darkText", color: "dark.main" };
    const columnOneTitleSx = sx(inactiveLabelColorStyles, {
        condition: alcaForMigration <= 0,
        sx: activeLabelColorStyles,
    });
    const columnTwoTitleSx = sx(inactiveLabelColorStyles, {
        condition: alcaForMigration > 0 || hideMigrationPanel,
        sx: activeLabelColorStyles,
    });

    // Box Styles
    const activeBoxStyles = {
        background: `linear-gradient(
            180deg,
            ${theme.palette.dark.elevation12} 0%,
            ${theme.palette.dark.elevation12} 100%
        ), ${theme.palette.dark.main}`,
        boxShadow: 10,
    };
    const inactiveBoxStyles = {
        background: `linear-gradient(
            180deg,
            ${theme.palette.dark.elevation1} 0%,
            ${theme.palette.dark.elevation1} 100%
        ),${theme.palette.dark.main} `,
    };
    const columnOneBoxSx = sx(inactiveBoxStyles, { condition: alcaForMigration <= 0, sx: activeBoxStyles });
    const columnTwoBoxSx = sx(inactiveBoxStyles, { condition: alcaForMigration > 0, sx: activeBoxStyles });

    const gridStyles = {
        background: `linear-gradient(
            180deg, ${theme.palette.dark.elevation3} 0%,
            ${theme.palette.light.elevation3} 100%,
            ${theme.palette.dark.elevation1} 100%
        ), ${theme.palette.dark.main}`,
    };

    // Common Styles
    const activeFadeOutTextStyle = { color: "secondary.darkText" };
    const inactiveFadeOutTextStyle = { color: "secondary.darkTextDisabled" };
    const columnOneFadeOutTxtSx = sx(inactiveFadeOutTextStyle, {
        condition: alcaForMigration <= 0,
        sx: activeFadeOutTextStyle,
    });
    const columnTwoFadeOutTxtSx = sx(inactiveFadeOutTextStyle, {
        condition: alcaForMigration > 0,
        sx: activeFadeOutTextStyle,
    });

    useEffect(() => {
        async function call() {
            // TODO: Convert MAD to ALCA
            setMadExchangeAmount(0);
        }

        call();
    }, [alcaForMigration]);

    const renderActions = () => (
        <Box columnGap={1} mt={2} display="flex" justifyContent="flex-end">
            <Button variant="outlined" disabled={!alcaForMigration}>
                Reset TX
            </Button>

            <Button endIcon={<ChevronRight />} variant="contained" disabled={!alcaForMigration}>
                Review TX
            </Button>
        </Box>
    );

    const renderContentGrid = () => (
        <Grid container>
            {!hideMigrationPanel && (
                <Grid item xs={4} display="flex" flexDirection="column">
                    <Box p={2} borderRadius={1} sx={columnOneTitleBoxSx}>
                        <Typography variant="body1" component="h1">
                            <Box
                                component="span"
                                px={1}
                                py={0.5}
                                mr={1}
                                borderRadius={0.5}
                                fontWeight="bold"
                                sx={columnOneTitleSx}
                            >
                                1
                            </Box>
                            Migration {symbols.MAD} to {symbols.ALCA}
                        </Typography>
                    </Box>

                    <Box p={2} borderRadius={1} flex={1} sx={columnOneBoxSx}>
                        <Typography sx={columnOneFadeOutTxtSx}>Current {symbols.MAD} Balance</Typography>
                        <Typography variant="h5">
                            {balances.mad.data || 0} {symbols.MAD}
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
                                label="Migrate to ALCA"
                                size="small"
                                value={alcaForMigration}
                                color="secondary"
                                onChange={(event) => setAlcaForMigration(event.target.value)}
                            />

                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    setAlcaForMigration(balances.mad.value);
                                }}
                            >
                                All
                            </Button>
                        </Box>

                        <Typography variant="body1">
                            you will recieve{" "}
                            <strong>
                                {madExchangeAmount || 0} {symbols.ALCA}
                            </strong>
                        </Typography>
                    </Box>
                </Grid>
            )}

            <Grid item xs={hideMigrationPanel ? 12 : 8} display="flex" flexDirection="column">
                <Box p={2} borderRadius={1} sx={columnTwoTitleBoxSx}>
                    <Typography variant="body1" component="h1">
                        <Box
                            component="span"
                            px={1}
                            py={0.5}
                            mr={1}
                            borderRadius={0.5}
                            fontWeight="bold"
                            sx={columnTwoTitleSx}
                        >
                            {hideMigrationPanel ? 1 : 2}
                        </Box>
                        Staking & Lockup {symbols.ALCA}
                    </Typography>
                </Box>

                <Box p={2} borderRadius={1} flex={1} sx={columnTwoBoxSx}>
                    <Typography>Future {symbols.ALCA} balance</Typography>

                    <Typography variant="h5">
                        {alcaForMigration || 0} {symbols.ALCA}
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
                            borderRadius={0.5}
                            py={1}
                            mt={2}
                            mb={4}
                            sx={[gridStyles]}
                        >
                            <Grid item xs={5} px={2} columnGap={1} display="flex" alignItems="center">
                                <TextField
                                    value={0}
                                    onChange={() => {}}
                                    size="small"
                                    color="secondary"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">{symbols.ALCA}</InputAdornment>,
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
                                <Switch disabled={!alcaForMigration} color="secondary" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );

    return (
        <>
            <NavigationBar />

            <Container maxWidth="lg">
                <SubNavigation />
                {renderContentGrid()}
                {renderActions()}
            </Container>
        </>
    );
}
