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
    Tooltip,
    styled,
    Snackbar,
    CircularProgress,
    Fade,
    tableCellClasses,
} from "@mui/material";
import { ChevronRight, InfoOutlined, LooksOne, LooksTwo } from "@mui/icons-material";
import { ConnectWeb3Button, Page, SubNavigation } from "components";
import ethAdapter from "eth-adapter";
import { formatNumberToLocale } from "utils/number";
import { checkValidAmountCharacters } from "utils/string";
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

    // Future Alca balance tracker
    const [futureAlcaBalance, setFutureAlcaBalance] = useState("0");

    const sanitizeMadForMigrationInput = (amt) => {
        setAmountOfAlcaToStake("0");
        if (amt === "." || amt === "") {
            return setMadForMigration("");
        }
        if (checkValidAmountCharacters(amt)) {
            setMadForMigration(amt);
        } else {
            return;
        }
    };

    const sanitizeAlcaForStakingInput = (amt) => {
        if (amt === "." || amt === "") {
            return setAmountOfAlcaToStake("");
        }
        if (checkValidAmountCharacters(amt)) {
            setAmountOfAlcaToStake(amt);
        } else {
            return;
        }
    };

    const resetTx = () => {
        sanitizeMadForMigrationInput("0");
        sanitizeAlcaForStakingInput("0");
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
            ${theme.palette.custom.startGradient} 18.53%,
            ${theme.palette.custom.endGradient} 167.76%
        )`,
        color: "secondary.contrastText",
    };
    const inactiveBoxTitleStyles = {
        background: `linear-gradient(
            180deg,
            ${theme.palette.custom.elevation4} 0%,
            ${theme.palette.custom.elevation4} 100%
        ), ${theme.palette.background.default};`,
    };

    const [activeColumn, setActiveColumn] = useState(1);

    const onlyStakingHeaderStyles = sx({
        condition: hideMigrationPanel,
        sx: { fontSize: 24 },
    });

    const pointerStyles = { cursor: "pointer" };

    const columnOneTitleBoxSx = sx(inactiveBoxTitleStyles, pointerStyles, {
        condition: activeColumn === 1,
        sx: activeBoxTitleStyles,
    });
    const columnTwoTitleBoxSx = sx(
        pointerStyles,
        { condition: !hideMigrationPanel, sx: inactiveBoxTitleStyles },
        {
            condition: activeColumn === 2 && !hideMigrationPanel,
            sx: activeBoxTitleStyles,
        },
        {
            condition: hideMigrationPanel,
            sx: {
                borderBottom: 1,
                borderColor: theme.palette.secondary.main,
            },
        },
        {
            condition: hideMigrationPanel,
            sx: { paddingX: 0 },
        }
    );

    // Title Styles
    const activeLabelColorStyles = { color: "background.default", mr: 1 };
    const inactiveLabelColorStyles = { color: "white", mr: 1 };
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
        ${theme.palette.custom.elevation12} 0%,
        ${theme.palette.custom.elevation12} 100%
    ), ${theme.palette.background.default}`;

    // Box Styles
    const activeBoxStyles = { background: activeBg };
    const inactiveBoxStyles = {
        background: `linear-gradient(
            180deg,
            ${theme.palette.custom.elevation1} 0%,
            ${theme.palette.custom.elevation1} 100%
        ),${theme.palette.background.default} `,
    };
    const columnOneContainer = sx({ overflow: "hidden" }, { condition: activeColumn === 1, sx: { boxShadow: 10 } });
    const columnTwoContainer = sx(
        { overflow: "hidden" },
        { condition: activeColumn === 2 || hideMigrationPanel, sx: { boxShadow: 10 } }
    );
    const columnOneBoxSx = sx(inactiveBoxStyles, { condition: activeColumn === 1, sx: activeBoxStyles });
    const columnTwoBoxSx = sx(inactiveBoxStyles, {
        condition: activeColumn === 2 || hideMigrationPanel,
        sx: activeBoxStyles,
    });

    const gridStyles = {
        background: `linear-gradient(
            180deg, ${theme.palette.custom.elevation3} 0%,
            ${theme.palette.action.hover} 100%,
            ${theme.palette.custom.elevation1} 100%
        ), ${theme.palette.background.default}`,
    };

    // Common Styles
    const activeFadeOutTextStyle = { color: "text.secondary" };
    const inactiveFadeOutTextStyle = { color: "text.disabled" };
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
                180deg, ${theme.palette.custom.elevation4} 0%,
                ${theme.palette.custom.elevation4} 100%
            ), ${theme.palette.background.default}`,
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
                const amount = await ethAdapter.contractMethods.ALCA.convert_view_IN1_OUT1({
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
                setMadToAlcaBn(ethers.BigNumber.from(0));
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

        if (hasLockedPosition()) {
            setLockupStakePosition(false);
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

    function hasLockedPosition() {
        return positions?.lockedPosition?.value?.lockedAlca !== "0.0";
    }

    function isMigrateOverBalance() {
        return parseInt(madForMigration) > parseInt(balances.mad.value);
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
                        ${theme.palette.custom.elevation12} 0%,
                        ${theme.palette.custom.elevation12} 100%
                    ), ${theme.palette.background.default}`,
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

                    <Table
                        sx={{
                            minWidth: 650,
                            [`& .${tableCellClasses.root}`]: {
                                border: 0,
                                fontFamily: theme.typography.fontFamily,
                            },
                        }}
                    >
                        <TableHead>
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
                sx={{ overflow: "auto" }}
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
                            ${theme.palette.custom.elevation24} 0%,
                            ${theme.palette.custom.elevation24} 100%
                        ), ${theme.palette.background.default}`,
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
                                  ALCA: -Number(stakeAlcaAmount),
                                  "Staked ALCA Position NFT": 1,
                              }
                            : {
                                  MAD: -Number(madForMigration),
                                  ALCA: Number(madToAlca),
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
                                        Stake {formatNumberToLocale(stakeAlcaAmount)} {symbols.ALCA} in new position
                                    </>
                                ),
                                balanceChange: {
                                    ALCA: -Number(stakeAlcaAmount),
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

    function renderColumnNumber() {
        if (hideMigrationPanel) return <></>;

        return <LooksTwo sx={columnTwoTitleSx} />;
    }

    const renderActions = () => (
        <Box columnGap={1} mt={2} display="flex" justifyContent="flex-end">
            <Button variant="outlined" size="large" disabled={!madForMigration || !stakeAlcaAmount} onClick={resetTx}>
                Reset TX
            </Button>

            <Button
                endIcon={<ChevronRight />}
                variant="contained"
                size="large"
                disabled={
                    isMigrateOverBalance() ||
                    (!madForMigration && !stakeAlcaAmount) ||
                    parseFloat(futureAlcaBalance) < 0
                }
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
                <Grid item xs={4} borderRadius={1} display="flex" flexDirection="column" sx={columnOneContainer}>
                    <Box
                        px={2}
                        py={1.5}
                        sx={columnOneTitleBoxSx}
                        onClick={() => {
                            setActiveColumn(1);
                        }}
                    >
                        <Typography display="flex" variant="body1" component="h1">
                            <LooksOne sx={columnOneTitleSx} />
                            Migration {symbols.MAD} to {symbols.ALCA}
                        </Typography>
                    </Box>

                    <Box p={2} flex={1} sx={columnOneBoxSx}>
                        <Typography variant="subtitle2" sx={columnOneFadeOutTxtSx}>
                            Current {symbols.MAD} Balance
                        </Typography>
                        <Typography variant="h5">
                            {formattedMadValue()} {symbols.MAD}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle2" sx={columnOneFadeOutTxtSx}>
                            Exchange rate from {symbols.MAD} to {symbols.ALCA}
                        </Typography>

                        <Typography variant="body2" sx={{ fontSize: 16 }}>
                            1 {symbols.MAD} Token ≈ 1.5556 {symbols.ALCA} Token
                        </Typography>

                        <Box columnGap={1} mt={3} mb={1}>
                            <TextField
                                label="Migrate to ALCA"
                                size="small"
                                value={madForMigration}
                                onFocus={() => setActiveColumn(1)}
                                color="secondary"
                                onChange={(event) => sanitizeMadForMigrationInput(event.target.value.replace(",", ""))}
                                error={isMigrateOverBalance()}
                                helperText={isMigrateOverBalance() ? "Amount exceeds your balance" : ""}
                            />

                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ py: 1, marginLeft: 1 }}
                                onClick={() => {
                                    setMadForMigration(balances.mad.value);
                                }}
                                disabled={isMigrateOverBalance()}
                            >
                                All
                            </Button>
                        </Box>

                        <Typography variant="body2">
                            you will recieve{" "}
                            <strong>
                                {formatNumberToLocale(madToAlca)} {symbols.ALCA}
                            </strong>
                        </Typography>
                    </Box>
                </Grid>
            )}

            <Box
                width="100%"
                px={2}
                py={1.5}
                sx={columnTwoTitleBoxSx}
                onClick={() => {
                    setActiveColumn(2);
                }}
            >
                <Typography display="flex" sx={onlyStakingHeaderStyles}>
                    {renderColumnNumber()}
                    Staking {isLockupPeriod && "& Lockup"} {symbols.ALCA}
                </Typography>
            </Box>

            <Grid
                item
                xs={hideMigrationPanel ? 12 : 8}
                borderRadius={1}
                display="flex"
                flexDirection="column"
                sx={columnTwoContainer}
            >

                <Box p={2} flex={1} sx={columnTwoBoxSx}>
                    <Typography variant="subtitle2">
                        {madToAlca && madToAlca > 0 ? "Future" : "Current"} {symbols.ALCA} balance
                    </Typography>

                    <Typography variant="h5">
                        {futureAlcaBalance} {symbols.ALCA}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ background: "transparent", height: "1px" }}></Box>
                    <Grid mt={3} alignItems="center">
                        <Grid container item gap={1}>
                            <Grid item xs={5}>
                                <Typography px={2} display="flex" alignItems="center">
                                    Amount
                                    <Tooltip title="Amount of ALCA you wish to stake" placement="top" arrow>
                                        <InfoOutlined color="disabled" fontSize="small" sx={{ ml: 0.5 }} />
                                    </Tooltip>
                                </Typography>
                            </Grid>

                            <Grid item xs>
                                <Typography display="flex" alignItems="center">
                                    Reward Type
                                    <Tooltip
                                        title="Rewards for staked positions are both ETH and ALCA"
                                        placement="top"
                                        arrow
                                    >
                                        <InfoOutlined color="disabled" fontSize="small" sx={{ ml: 0.5 }} />
                                    </Tooltip>
                                </Typography>
                            </Grid>

                            <Grid item xs>
                                <Typography display="flex" alignItems="center">
                                    Rewards
                                    <Tooltip
                                        title="Staked positions earn 1/3 of block rewards distributed evenly among n staked positions"
                                        placement="top"
                                        arrow
                                    >
                                        <InfoOutlined color="disabled" fontSize="small" sx={{ ml: 0.5 }} />
                                    </Tooltip>
                                </Typography>
                            </Grid>

                            {isLockupPeriod && (
                                <Grid item xs columnGap={1}>
                                    <Typography display="flex" alignItems="center">
                                        Lockup
                                        <Tooltip
                                            title="Locked positions generate more rewards, but have penalties for unlocking"
                                            placement="top"
                                            arrow
                                        >
                                            <InfoOutlined color="disabled" fontSize="small" sx={{ ml: 0.5 }} />
                                        </Tooltip>
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>

                        <Grid
                            container
                            item
                            alignItems="center"
                            borderRadius={1}
                            gap={1}
                            py={1}
                            mt={2}
                            mb={4}
                            sx={[gridStyles]}
                        >
                            <Grid item xs={5} px={2} columnGap={1} display="flex" alignItems="center">
                                <TextField
                                    label="ALCA To Stake"
                                    value={stakeAlcaAmount}
                                    onChange={(event) => sanitizeAlcaForStakingInput(event.target.value)}
                                    onFocus={() => setActiveColumn(2)}
                                    size="small"
                                    color="secondary"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">{symbols.ALCA}</InputAdornment>,
                                    }}
                                    disabled={isMigrateOverBalance()}
                                />

                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ py: 1 }}
                                    onClick={() => allInAlca()}
                                    disabled={isMigrateOverBalance()}
                                >
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
                                        disabled={!stakeAlcaAmount || hasLockedPosition()}
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
        <Page>
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
                            sx={{ width: 320, fontSize: 16, paddingY: 3.5 }}
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
        </Page>
    );
}
