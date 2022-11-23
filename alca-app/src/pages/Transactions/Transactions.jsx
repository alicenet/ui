import { useState, useContext, useEffect } from "react";
import { symbols } from "config";
import { BalanceContext, commonEthRequests } from "alice-ui-common";
import { sx } from "utils/sx";
import { ethers } from "ethers";

import { useTheme } from "@emotion/react";
import {
    Box,
    Grid,
    TextField,
    Button,
    Typography,
    Divider,
    InputAdornment,
    Switch,
    Container,
    Modal,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    styled,
    Snackbar,
    CircularProgress,
    Alert,
} from "@mui/material";
import { CheckCircle, ChevronRight, InfoOutlined } from "@mui/icons-material";
import { NavigationBar, SubNavigation } from "components";
import ethAdapter from "eth-adapter";
import { formatNumberToLocale } from "utils/number";

export function Transactions() {
    const { balances = {} } = useContext(BalanceContext);
    const theme = useTheme();

    const hideMigrationPanel = balances.mad.value === "0" || balances.mad.value === "n/a" || !!balances.mad.error;

    // ALCA for migration
    const [madForMigration, setMadForMigration] = useState(0);
    const [madToAlca, setMadToAlca] = useState(0);

    const sanitizeMadForMigrationInput = (amt) => {
        if (amt === "." || amt === "") {
            return setMadForMigration("");
        }
        if (!/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(amt)) {
            return;
        }
        let split = amt.split(".");
        if (split[0].length >= 15 || (split[1] && split[1].length > 10)) {
            return;
        }
        setMadForMigration(amt);
    };

    // Modal
    const [modalOpen, setModalOpen] = useState(false);

    // Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(<></>);
    const [snackbarAutoHideDuration, setSnackbarAutoHideDuration] = useState(null);

    // Transaction state
    const [transacting, setTransacting] = useState(false);

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
    const columnOneTitleBoxSx = sx({ condition: madForMigration <= 0, sx: activeBoxTitleStyles });
    const columnTwoTitleBoxSx = sx({ condition: madForMigration > 0 || hideMigrationPanel, sx: activeBoxTitleStyles });

    // Title Styles
    const activeLabelColorStyles = { bgcolor: "dark.main", color: "secondary.main" };
    const inactiveLabelColorStyles = { bgcolor: "secondary.darkText", color: "dark.main" };
    const columnOneTitleSx = sx(inactiveLabelColorStyles, {
        condition: madForMigration <= 0,
        sx: activeLabelColorStyles,
    });
    const columnTwoTitleSx = sx(inactiveLabelColorStyles, {
        condition: madForMigration > 0 || hideMigrationPanel,
        sx: activeLabelColorStyles,
    });

    const activeBg = `linear-gradient(
        180deg,
        ${theme.palette.dark.elevation12} 0%,
        ${theme.palette.dark.elevation12} 100%
    ), ${theme.palette.dark.main}`;

    // Box Styles
    const activeBoxStyles = {
        background: activeBg,
        boxShadow: 10,
    };
    const inactiveBoxStyles = {
        background: `linear-gradient(
            180deg,
            ${theme.palette.dark.elevation1} 0%,
            ${theme.palette.dark.elevation1} 100%
        ),${theme.palette.dark.main} `,
    };
    const columnOneBoxSx = sx(inactiveBoxStyles, { condition: madForMigration <= 0, sx: activeBoxStyles });
    const columnTwoBoxSx = sx(inactiveBoxStyles, { condition: madForMigration > 0, sx: activeBoxStyles });

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
        condition: madForMigration <= 0,
        sx: activeFadeOutTextStyle,
    });
    const columnTwoFadeOutTxtSx = sx(inactiveFadeOutTextStyle, {
        condition: madForMigration > 0,
        sx: activeFadeOutTextStyle,
    });

    // Custom table row
    const StyledTableRow = styled(TableRow)(() => ({
        "&:nth-of-type(odd)": {
            background: `linear-gradient(
                180deg, ${theme.palette.dark.elevation4} 0%,
                ${theme.palette.dark.elevation4} 100%
            ), ${theme.palette.dark.main}`,
        },
    }));

    // Update MAD to AlCA state
    useEffect(() => {
        async function call() {
            try {
                const amount = await ethAdapter.contractMethods.ATOKEN.convert_view_IN1_OUT1({
                    amount: ethers.utils.parseEther(madForMigration.toString()).toString(),
                });
                if (!amount.error) {
                    setMadToAlca(ethers.utils.formatEther(amount));
                } else {
                    console.error(amount.error);
                }
            } catch (e) {
                // TODO: Handle error message
                console.error(e);
                setMadToAlca(0);
            }
        }

        call();
    }, [madForMigration]);

    // Migrate MAD to ALCA
    async function migrate() {
        setTransacting(true);

        try {
            // Pending message
            setSnackbarMessage(renderSnackbarMessage("pending", "Pending Allowance Transaction"));

            // Open snackbar
            setSnackbarOpen(true);

            // Allowance transaction
            const allowanceTx = await commonEthRequests.migrate_sendMadAllowanceForATokenRequest(
                ethAdapter,
                madForMigration
            );

            if (allowanceTx.error) {
                throw new Error(allowanceTx.error);
            }

            await allowanceTx.wait();

            // Pending message
            setSnackbarMessage(renderSnackbarMessage("pending", "Pending Migration Transaction"));

            // Migration transaction
            const migrateTx = await commonEthRequests.migrate_sendMigrateRequest(ethAdapter, madForMigration);

            if (migrateTx.error) {
                throw new Error(migrateTx.error);
            }

            await migrateTx.wait();
        } catch (e) {
            // Error message
            setSnackbarAutoHideDuration(7500);
            setSnackbarMessage(
                renderSnackbarMessage("error", "There was an error with the transaction. Please try again.")
            );

            // No longer transacting
            setTransacting(false);

            return;
        }

        // Close modal
        setModalOpen(false);

        // Success message
        setSnackbarAutoHideDuration(7500);
        setSnackbarMessage(renderSnackbarMessage("success", "Successfully Migrated"));

        // Reset MAD to ALCA
        setMadForMigration("0");

        // Fetch balance
        balances.updateBalances();

        // No longer transacting
        setTransacting(false);
    }

    function formattedMadValue() {
        if (balances.mad.error || balances.mad.value === "n/a") return "n/a";

        return formatNumberToLocale(balances.mad.value);
    }

    function renderSnackbarMessage(type, message) {
        let icon = <></>;
        let severity = "info";

        if (type === "pending") {
            icon = <CircularProgress size={20} />;
        } else if (type === "success") {
            icon = <CheckCircle />;
            severity = "success";
        } else if (type === "error") {
            severity = "error";
        }

        return (
            <Alert severity={severity} icon={false}>
                <Box sx={{ display: "flex", alignItems: "center", fontSize: 16 }}>
                    <Box sx={{ marginRight: 1 }}>{icon}</Box>
                    {message}
                </Box>
            </Alert>
        );
    }

    function renderModal() {
        return (
            <Modal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: 250,
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "70%",
                        background: `linear-gradient(180deg, ${theme.palette.dark.elevation24} 0%, ${theme.palette.dark.elevation24} 100%), ${theme.palette.dark.main}`,
                        borderRadius: 2,
                        paddingY: 2,
                        paddingX: 3,
                    }}
                >
                    <Typography variant="h6" component="h1">
                        Transaction Confirmation
                    </Typography>

                    <Typography sx={{ mt: 2 }}>This action cannot be reverted</Typography>

                    <TableContainer
                        sx={{
                            padding: 1.5,
                            background: `linear-gradient(180deg, ${theme.palette.dark.elevation12} 0%, ${theme.palette.dark.elevation12} 100%), ${theme.palette.dark.main}`,
                            marginTop: 2,
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                borderBottom: "1px solid rgba(255, 255, 255, 0.23)",
                                paddingBottom: 1.5,
                                marginBottom: 0.5,
                            }}
                        >
                            Operation 1
                        </Typography>

                        <Table sx={{ minWidth: 650 }}>
                            <TableHead sx={{ "& .MuiTableCell-root": { fontFamily: theme.typography.fontFamily } }}>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Transaction</TableCell>
                                    <TableCell>Final wallet balance</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    <TableCell component="th" scope="row">
                                        Migration
                                    </TableCell>
                                    <TableCell>
                                        from {formatNumberToLocale(madForMigration)} {symbols.MAD} to{" "}
                                        {formatNumberToLocale(madToAlca)} {symbols.ALCA}
                                    </TableCell>
                                    <TableCell>
                                        from {formatNumberToLocale(madForMigration)} {symbols.MAD} to{" "}
                                        {formatNumberToLocale(madToAlca)} {symbols.ALCA}
                                    </TableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box columnGap={1} mt={2} display="flex" justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setModalOpen(false);
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            endIcon={<ChevronRight />}
                            variant="contained"
                            onClick={() => {
                                migrate();
                            }}
                            disabled={transacting}
                        >
                            Send transaction
                        </Button>
                    </Box>
                </Box>
            </Modal>
        );
    }

    const renderActions = () => (
        <Box columnGap={1} mt={2} display="flex" justifyContent="flex-end">
            <Button variant="outlined" disabled={!madForMigration}>
                Reset TX
            </Button>

            <Button
                endIcon={<ChevronRight />}
                variant="contained"
                disabled={!madForMigration}
                onClick={() => {
                    setModalOpen(true);
                }}
            >
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
                            {formattedMadValue()} {symbols.MAD}
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
                                value={madForMigration}
                                color="secondary"
                                onChange={(event) => sanitizeMadForMigrationInput(event.target.value.replace(",", ""))}
                            />

                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    setMadForMigration(balances.mad.value);
                                }}
                            >
                                All
                            </Button>
                        </Box>

                        <Typography variant="body1">
                            you will recieve{" "}
                            <strong>
                                {formatNumberToLocale(madToAlca)} {symbols.ALCA}
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
                    <Typography>
                        {madToAlca && madToAlca > 0 ? "Future" : "Current"} {symbols.ALCA} balance
                    </Typography>

                    <Typography variant="h5">
                        {formatNumberToLocale(Number(madToAlca) + Number(balances.alca.value))} {symbols.ALCA}
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
                                <Switch disabled={!madForMigration} color="secondary" />
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

            {renderModal()}

            <Snackbar
                sx={{ mb: 10 }}
                open={snackbarOpen}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                autoHideDuration={snackbarAutoHideDuration}
                onClose={() => {
                    setSnackbarOpen(false);
                }}
            >
                {snackbarMessage}
            </Snackbar>
        </>
    );
}
