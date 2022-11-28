import { useState, useContext, useEffect } from "react";
import { symbols } from "config";
import { BalanceContext } from "alice-ui-common";
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
    Fade,
} from "@mui/material";
import { ChevronRight, InfoOutlined } from "@mui/icons-material";
import { ConnectWeb3Button, NavigationBar, SubNavigation } from "components";
import ethAdapter from "eth-adapter";
import { formatNumberToLocale } from "utils/number";
import { SnackbarMessage } from "components/SnackbarMessage";
import { migrate, migrateAndStake, migrateStakeAndLock, stake, stakeAndLock } from "./transactionFunctions";
import { useSelector } from "react-redux";

export function Transactions() {
    const { balances = {}, positions = {}, updateBalances, allowances = {} } = useContext(BalanceContext);
    let { initialLoadCompleted } = useSelector((s) => ({
        initialLoadCompleted: s.application.initialLoadCompleted,
    })); // Hook into reducer updates so equalize works properly against ethAdapter

    console.log({ balances, allowances, positions }); // Leave for QOL / QA

    const theme = useTheme();

    const hideMigrationPanel = ["0", "0.0", "n/a"].includes(balances.mad.value) || !!balances.mad.error;
    const [lockupStakePosition, setLockupStakePosition] = useState(false);
    const [isLockupPeriod, setIsLockupPeriod] = useState(false);
    const lockupStakeToggle = () => setLockupStakePosition((s) => !s);

    // ALCA for migration
    const [madForMigration, setMadForMigration] = useState("");
    const [madToAlca, setMadToAlca] = useState("");
    const [madToAlcaBn, setMadToAlcaBn] = useState(ethers.BigNumber.from(0));
    const [stakeAlcaAmount, setAmountOfAlcaToStake] = useState("");
    // const [stakeAlcaAmountBn, setAmountoFAlcaToStateBn] = useState(ethers.BigNumber.from(0));

    // Future Alca balance tracker
    const [futureAlcaBalance, setFutureAlcaBalance] = useState("0");

    const sanitizeMadForMigrationInput = (amt) => {
        setAmountOfAlcaToStake("0");
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
    const [snackbarMessage, setSnackbarMessage] = useState({});
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

    const [activeColumn, setActiveColumn] = useState(1);

    const columnOneTitleBoxSx = sx({ condition: activeColumn === 1, sx: activeBoxTitleStyles });
    const columnTwoTitleBoxSx = sx({ condition: activeColumn === 2 || hideMigrationPanel, sx: activeBoxTitleStyles });

    // Title Styles
    const activeLabelColorStyles = { bgcolor: "dark.main", color: "secondary.main" };
    const inactiveLabelColorStyles = { bgcolor: "secondary.darkText", color: "dark.main" };
    const columnOneTitleSx = sx(inactiveLabelColorStyles, {
        condition: activeColumn === 1,
        sx: activeLabelColorStyles,
    });
    const columnTwoTitleSx = sx(inactiveLabelColorStyles, {
        condition: activeColumn === 2 || hideMigrationPanel,
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
    const columnOneBoxSx = sx(inactiveBoxStyles, { condition: activeColumn === 1, sx: activeBoxStyles });
    const columnTwoBoxSx = sx(inactiveBoxStyles, {
        condition: activeColumn === 2 || hideMigrationPanel,
        sx: activeBoxStyles,
    });

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
        condition: activeColumn === 1,
        sx: activeFadeOutTextStyle,
    });
    const columnTwoFadeOutTxtSx = sx(inactiveFadeOutTextStyle, {
        condition: activeColumn === 2,
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

    const allInAlca = () => {
        const BN = (num) => ethers.BigNumber.from(num);
        let total = madToAlcaBn.add(
            BN(balances.alca.value === "0.0" ? 0 : ethers.utils.parseEther(balances.alca.value))
        );
        total = ethers.utils.formatEther(total);
        setAmountOfAlcaToStake(total);
    };

    // Update MAD to AlCA state
    useEffect(() => {
        async function call() {
            try {
                const amount = await ethAdapter.contractMethods.ATOKEN.convert_view_IN1_OUT1({
                    amount: ethers.utils.parseEther(madForMigration.toString()).toString(),
                });
                if (!amount.error) {
                    setMadToAlca(ethers.utils.formatEther(amount));
                    setMadToAlcaBn(amount);
                } else {
                    console.error(amount.error);
                }
            } catch (e) {
                // TODO: Handle error message
                console.error(e);
                setMadToAlca(0);
                setMadToAlcaBn(ethers.BigNumber(0));
            }
        }

        call();
    }, [madForMigration]);

    // Track future alcaBalance
    useEffect(() => {
        let alcaBalance = formatNumberToLocale(
            Number(madToAlca) + Number(balances.alca.value) - Number(stakeAlcaAmount)
        );
        setFutureAlcaBalance(alcaBalance ? alcaBalance : "0");
    }, [madToAlca, stakeAlcaAmount, balances.alca.value]);

    // Track if is enrollment
    useEffect(() => {
        if (positions?.lockedPosition?.value?.lockupPeriod === "ENROLLMENT") {
            setIsLockupPeriod(true);
        }
    }, [positions]);

    // Reset lock if available, and stakeAlcaAmount === 0
    useEffect(() => {
        if (isLockupPeriod && !stakeAlcaAmount) {
            setLockupStakePosition(false);
        }
    }, [stakeAlcaAmount, isLockupPeriod]);

    function formattedMadValue() {
        if (balances.mad.error || ["0", "0.0", "n/a"].includes(balances.mad.value)) return "n/a";

        return formatNumberToLocale(balances.mad.value);
    }

    function renderModal() {
        // Lock ~== an op, always append as 2nd or 3rd operation
        const twoOps = !!Number(stakeAlcaAmount) && !!Number(madToAlca);
        const threeOps = twoOps && lockupStakePosition;
        const operationOneIsStake = twoOps ? false : Number(stakeAlcaAmount) > 0 ? true : false;

        const determineFunction = () => {
            const functionParams = {
                madForMigration,
                setAmountOfAlcaToStake,
                setMadForMigration,
                setModalOpen,
                setSnackbarAutoHideDuration,
                setSnackbarMessage,
                setSnackbarOpen,
                setTransacting,
                stakeAlcaAmount,
                updateBalances,
            };

            // If lockup, catch and handle early...
            if (threeOps) {
                console.debug("Init: Migrate, Stake & Lock");
                return migrateStakeAndLock({ ...functionParams });
            }

            if (lockupStakePosition && operationOneIsStake) {
                console.debug("Init: Stake & Lock");
                return stakeAndLock({ ...functionParams });
            }

            // Migrate and Stake -- No Lockup
            if (twoOps) {
                // No Lock - Migrate And Stake
                console.debug("Init: Migrate & Stake");
                return migrateAndStake({ ...functionParams });
            } else {
                // Just stake
                if (operationOneIsStake) {
                    console.debug("Init: Stake");
                    return stake({ ...functionParams });
                }
                // Just migrate
                else {
                    console.debug("Init: Migrate");
                    return migrate({ ...functionParams });
                }
            }
        };

        const renderOperationRow = ({
            operationNumber,
            operationName,
            operationExplanation,
            balanceChange = {
                // +- AMTs
                MAD: "",
                ALCA: "",
                "Locked ALCA Position NFT": "",
                "Staked ALCA Position NFT": "",
            },
        }) => {
            const renderBalanceChange = () => {
                const reductions = []; // Bals that minus
                const additions = []; // Bals that go up
                Object.keys(balanceChange).forEach((key) => {
                    let amt = balanceChange[key];
                    if (parseInt(amt) <= 0) {
                        reductions.push({ name: key, amt: amt });
                    } else {
                        additions.push({ name: key, amt: amt });
                    }
                });
                const renderChanges = (toMap) =>
                    toMap.map((reduction) => (
                        <Box
                            key={reduction.name}
                            sx={{ color: reduction.amt > 0 ? theme.palette.success.main : theme.palette.error.main }}
                        >
                            {reduction.amt > 0 ? "+" : ""}
                            {""}
                            {formatNumberToLocale(reduction.amt)} {reduction.name}
                        </Box>
                    ));
                return (
                    <>
                        {renderChanges(reductions)}
                        {renderChanges(additions)}
                    </>
                );
            };

            return (
                <TableContainer
                    sx={{
                        padding: 1.5,
                        background: `linear-gradient(
                        180deg,
                        ${theme.palette.dark.elevation12} 0%,
                        ${theme.palette.dark.elevation12} 100%
                    ), ${theme.palette.dark.main}`,
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
                        Operation {operationNumber}: {operationName}
                    </Typography>

                    <Table sx={{ minWidth: 650 }}>
                        <TableHead sx={{ "& .MuiTableCell-root": { fontFamily: theme.typography.fontFamily } }}>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>Transaction</TableCell>
                                <TableCell>Balance Change</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <TableCell component="th" scope="row">
                                    {operationName}
                                </TableCell>
                                <TableCell>{operationExplanation}</TableCell>
                                <TableCell>{renderBalanceChange()}</TableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        };

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
                        left: 0,
                        right: 0,
                        top: "6.5rem",
                        margin: "auto",
                        height: "auto",
                        width: "70%",
                        background: `linear-gradient(
                            180deg,
                            ${theme.palette.dark.elevation24} 0%,
                            ${theme.palette.dark.elevation24} 100%
                        ), ${theme.palette.dark.main}`,
                        borderRadius: 2,
                        paddingY: 2,
                        paddingX: 3,
                    }}
                >
                    <Typography variant="h6" component="h1">
                        Transaction Confirmation
                    </Typography>

                    <Typography sx={{ mt: 2 }}>This action cannot be reverted</Typography>

                    {renderOperationRow({
                        operationNumber: 1,
                        operationName: operationOneIsStake ? "Stake" : "Migrate",
                        operationExplanation: operationOneIsStake ? (
                            <>
                                {" "}
                                Stake {stakeAlcaAmount} {symbols.ALCA} in new position{" "}
                            </>
                        ) : (
                            <>
                                Migrate {formatNumberToLocale(madForMigration)} {symbols.MAD} to{" "}
                                {formatNumberToLocale(madToAlca)} {symbols.ALCA}
                            </>
                        ),
                        balanceChange: operationOneIsStake
                            ? {
                                  ALCA: -Number(formatNumberToLocale(stakeAlcaAmount)),
                                  "Staked ALCA Position NFT": 1,
                              }
                            : {
                                  MAD: -Number(formatNumberToLocale(madForMigration)),
                                  ALCA: Number(formatNumberToLocale(madToAlca)),
                              },
                    })}

                    {/*Two Op -- No Lock render*/}
                    {twoOps && (
                        <>
                            {renderOperationRow({
                                operationNumber: 2,
                                operationName: "Stake",
                                operationExplanation: (
                                    <>
                                        Stake {stakeAlcaAmount} {symbols.ALCA} in new position
                                    </>
                                ),
                                balanceChange: {
                                    ALCA: -Number(formatNumberToLocale(stakeAlcaAmount)),
                                    "Staked ALCA Position NFT": 1,
                                },
                            })}
                        </>
                    )}

                    {lockupStakePosition && (
                        <>
                            {renderOperationRow({
                                operationNumber: twoOps ? 3 : 2,
                                operationName: "Lock",
                                operationExplanation: (
                                    <>
                                        Lock {stakeAlcaAmount} {symbols.ALCA} in new locked position
                                    </>
                                ),
                                balanceChange: {
                                    "Staked ALCA Position NFT": -1,
                                    "Locked ALCA Position NFT": 1,
                                },
                            })}
                        </>
                    )}

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
                            onClick={() => determineFunction()}
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
            <Button variant="outlined" disabled={!madForMigration || !stakeAlcaAmount}>
                Reset TX
            </Button>

            <Button
                endIcon={<ChevronRight />}
                variant="contained"
                disabled={(!madForMigration && !stakeAlcaAmount) || parseFloat(futureAlcaBalance) < 0}
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
                            1 {symbols.MAD} Token ≈ 1.5556 {symbols.ALCA} Token
                        </Typography>

                        <Box columnGap={1} mt={3} mb={1} display="flex" alignItems="center">
                            <TextField
                                label="Migrate to ALCA"
                                size="small"
                                value={madForMigration}
                                onFocus={() => setActiveColumn(1)}
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
                        {symbols.ALCA} Staking {isLockupPeriod && "& Lockup"}
                    </Typography>
                </Box>

                <Box p={2} borderRadius={1} flex={1} sx={columnTwoBoxSx}>
                    <Typography>
                        {madToAlca && madToAlca > 0 ? "Future" : "Current"} {symbols.ALCA} balance
                    </Typography>

                    <Typography variant="h5">
                        {futureAlcaBalance} {symbols.ALCA}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Grid mt={5} alignItems="center">
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

                            {isLockupPeriod && (
                                <Grid item xs columnGap={1}>
                                    <Typography display="flex" alignItems="center">
                                        Lockup
                                        <InfoOutlined color="disabled" fontSize="small" sx={{ ml: 0.5 }} />
                                    </Typography>
                                </Grid>
                            )}
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
                                    value={stakeAlcaAmount}
                                    onChange={(event) => setAmountOfAlcaToStake(event.target.value)}
                                    onFocus={() => setActiveColumn(2)}
                                    size="small"
                                    color="secondary"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">{symbols.ALCA}</InputAdornment>,
                                    }}
                                />

                                <Button variant="contained" size="small" color="secondary" onClick={() => allInAlca()}>
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

                            {isLockupPeriod && (
                                <Grid item xs>
                                    <Switch
                                        checked={lockupStakePosition}
                                        disabled={!stakeAlcaAmount}
                                        onChange={lockupStakeToggle}
                                        color="secondary"
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );

    const centerSx = {
        display: "flex",
        flexDirection: "column",
        height: "75vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <>
            <NavigationBar />

            <Container maxWidth="lg">
                {ethAdapter.connected ? (
                    <>
                        {initialLoadCompleted ? (
                            <>
                                <SubNavigation />
                                {renderContentGrid()}
                                {renderActions()}
                            </>
                        ) : (
                            <Box sx={centerSx}>
                                <CircularProgress />
                                <Fade in timeout={2500}>
                                    <Typography sx={{ mt: 4, color: theme.palette.primary.main, fontWeight: 800 }}>
                                        Loading App
                                    </Typography>
                                </Fade>
                            </Box>
                        )}
                    </>
                ) : (
                    <Box sx={centerSx}>
                        <ConnectWeb3Button
                            overrideText="Connect Web3 Wallet"
                            sx={{ height: "6rem", width: 320, fontSize: 16 }}
                        />
                    </Box>
                )}
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
                <SnackbarMessage status={snackbarMessage.status} message={snackbarMessage.message} />
            </Snackbar>
        </>
    );
}
