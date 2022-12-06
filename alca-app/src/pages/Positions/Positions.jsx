import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Button, Container, LinearProgress, Snackbar, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { NavigationBar, SubNavigation } from "components";
import { BalanceContext, commonEthRequests } from "alice-ui-common";
import { formatNumberToLocale } from "utils/number";
import { symbols } from "config";
import ethAdapter from "eth-adapter";
import {
    claimLockedRewards,
    unlockLockedPosition,
    unlockLockedPositionEarly,
} from "pages/Transactions/transactionFunctions";
import { ConfirmUnstakeModal, CountBubble, SnackbarMessage } from "components";

export function Positions() {
    const { balances, positions = {}, updateBalances } = useContext(BalanceContext);
    const hasLockedPosition = positions?.lockedPosition?.value?.tokenId !== "0";
    const lockedPosition = hasLockedPosition ? positions?.lockedPosition?.value : {};

    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState("1");
    const [currentBlock, setCurrentBlock] = useState("?");

    // Unstake Modal
    const [unstakePosition, setUnstakePosition] = useState(null);

    // Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState({});
    const [snackbarAutoHideDuration, setSnackbarAutoHideDuration] = useState(null);

    // Transaction state
    const [transacting, setTransacting] = useState(false);

    const txFxParams = {
        setSnackbarAutoHideDuration,
        setSnackbarOpen,
        setSnackbarMessage,
        setTransacting,
        updateBalances,
        lockedPosition,
    };

    useEffect(() => {
        let checker;
        const check = async () => {
            try {
                let cBlock = (await ethAdapter.provider.getBlockNumber()).toString();
                setCurrentBlock(cBlock);
            } catch (ex) {
                setCurrentBlock((s) => s);
            }
            checker = setTimeout(check, 5000);
        };
        check();
        return clearTimeout(checker);
    }, []);

    // If no connection, push to connect/transaction page
    if (!ethAdapter.connected) {
        return <Navigate to="/" />;
    }

    // Force Staked tab if no locked positions
    if (!hasLockedPosition) {
        if (currentTab !== "1") {
            setCurrentTab("1");
        }
    }

    function handleShowUnstakeModal(row) {
        setUnstakePosition(row);
    }

    async function handleUnstake(tokenId) {
        setTransacting(true);

        // Pending message
        setSnackbarMessage({
            status: "pending",
            message: "Tx: Pending Unstake Transaction",
        });

        // Open snackbar
        setSnackbarOpen(true);

        try {
            const tx = await commonEthRequests.staking_sendUnstakePublicStakedPositionRequest(ethAdapter, tokenId);

            if (tx.error) {
                throw new Error(tx.error);
            }

            await tx.wait();
        } catch (e) {
            // Error message
            setSnackbarAutoHideDuration(7500);
            setSnackbarMessage({
                status: "error",
                message: "There was an error with the transaction. Please try again.",
            });

            // No longer transacting
            setTransacting(false);

            return;
        }

        // Success message
        setSnackbarAutoHideDuration(7500);
        setSnackbarMessage({
            status: "success",
            message: "Successfully Unstaked",
        });

        await updateBalances(ethAdapter);
        // No longer transacting
        setTransacting(false);
        setUnstakePosition(null);
    }

    async function handleClaim(tokenId) {
        setTransacting(true);

        // Pending message
        setSnackbarMessage({
            status: "pending",
            message: "Tx: Pending Claim Rewards Transaction",
        });

        // Open snackbar
        setSnackbarOpen(true);

        try {
            // Claim rewards transaction
            const tx = await commonEthRequests.staking_sendClaimAllPublicStakingRewardsRequest(ethAdapter, tokenId);

            if (tx.error) {
                throw new Error(tx.error);
            }

            await tx.wait();
        } catch (e) {
            // Error message
            setSnackbarAutoHideDuration(7500);
            setSnackbarMessage({
                status: "error",
                message: "There was an error with the transaction. Please try again.",
            });

            // No longer transacting
            setTransacting(false);

            return;
        }

        // Success message
        setSnackbarAutoHideDuration(7500);
        setSnackbarMessage({
            status: "success",
            message: "Successfully Claimed Rewards",
        });

        await updateBalances(ethAdapter);
        // No longer transacting
        setTransacting(false);
    }

    const handleTabChange = (_, newValue) => {
        setCurrentTab(newValue);
    };

    const stakedPositionsColumns = [
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.5,
            sortable: false,
            headerClassName: "headerClass",
        },
        {
            field: "id",
            headerName: "ID",
            flex: 0.25,
            sortable: false,
            headerClassName: "headerClass",
        },
        {
            field: "rewards",
            headerName: "Rewards",
            flex: 0.75,
            sortable: false,
            headerClassName: "headerClass",
            renderCell: (params) => {
                return (
                    <Box display="flex" flexDirection="column" py={2}>
                        <Typography variant="body2">
                            {`${formatNumberToLocale(params.row.alcaRewards)} ${symbols.ALCA}`}
                        </Typography>
                        <Typography variant="body2">
                            {`${formatNumberToLocale(params.row.ethRewards)} ${symbols.ETH}`}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            sortable: false,
            showColumnRightBorder: false,
            headerClassName: "headerClass",
            renderCell: (params) => {
                const hasRewards = parseFloat(params.row.alcaRewards) > 0 || parseFloat(params.row.ethRewards) > 0;

                return (
                    <Box display="flex">
                        <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            sx={actionButtonStyles}
                            onClick={() => {
                                handleClaim(params.row.id);
                            }}
                            disabled={transacting || !hasRewards}
                        >
                            Claim Rewards
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            sx={actionButtonStyles}
                            onClick={() => {
                                handleShowUnstakeModal(params.row);
                            }}
                            disabled={transacting}
                        >
                            Unstake
                        </Button>
                    </Box>
                );
            },
        },
    ];

    const stakedPositionsRows = positions.staked.value.map((position) => {
        return {
            amount: formatNumberToLocale(position.shares),
            id: position.tokenId,
            ...position,
        };
    });

    const lockedPositionsColumns = [
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.5,
            sortable: false,
            headerClassName: "headerClass",
        },
        {
            field: "id",
            headerName: "ID",
            flex: 0.25,
            sortable: false,
            headerClassName: "headerClass",
        },
        {
            field: "timeLeft",
            headerName: "Time Left",
            flex: 0.5,
            sortable: false,
            headerClassName: "headerClass",
        },
        {
            field: "rewardsAchieved",
            headerName: "Lock Period Progress",
            flex: 0.75,
            sortable: false,
            headerClassName: "headerClass",
            renderCell: () => {
                const progress =
                    (Number(currentBlock) * 100) / (Number(lockedPosition.blockUntilUnlock) + Number(currentBlock));

                return (
                    <Box sx={{ width: "100%" }}>
                        <LinearProgress
                            variant="determinate"
                            color="secondary"
                            value={lockedPosition.blockUntilUnlock > 0 ? progress : 100}
                        />

                        <Box sx={{ fontSize: 10, fontFamily: theme.typography.fontFamily, marginTop: 0.7 }}>
                            {lockedPosition.blockUntilUnlock > 0
                                ? progress.toLocaleString(false, { maximumFractionDigits: 2 })
                                : 100}
                            %
                        </Box>
                    </Box>
                );
            },
        },
        {
            field: "currentRewards",
            headerName: "Current Rewards",
            flex: 0.75,
            sortable: false,
            headerClassName: "headerClass",
            renderCell: (params) => {
                return (
                    <Box display="flex" flexDirection="column" py={2}>
                        <Typography variant="body2">
                            {`${formatNumberToLocale(params.row.payoutToken)} ${symbols.ALCA}`}
                        </Typography>
                        <Typography variant="body2">
                            {`${formatNumberToLocale(params.row.payoutEth)} ${symbols.ETH}`}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            sortable: false,
            showColumnRightBorder: false,
            headerClassName: "headerClass",
            renderCell: (params) => (
                <Box sx={{ display: "flex" }}>
                    <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        sx={actionButtonStyles}
                        onClick={() => claimLockedRewards({ ...txFxParams })}
                        disabled={!hasRewards()}
                    >
                        Claim Rewards
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        color={lockedPosition.blockUntilUnlock > 0 ? "warning" : "primary"}
                        sx={{ ...actionButtonStyles }}
                        onClick={
                            lockedPosition.blockUntilUnlock > 0
                                ? () => unlockLockedPositionEarly({ ...txFxParams })
                                : () => unlockLockedPosition({ ...txFxParams })
                        }
                    >
                        {lockedPosition.blockUntilUnlock > 0 ? "Unlock Early" : "Unlock"}
                    </Button>
                </Box>
            ),
        },
    ];

    const lockedPositionsRows = hasLockedPosition
        ? [
              {
                  amount: lockedPosition?.lockedAlca,
                  id: lockedPosition?.tokenId || 1,
                  timeLeft: `${
                      lockedPosition.blockUntilUnlock > 0
                          ? Number(lockedPosition?.blockUntilUnlock).toLocaleString()
                          : 0
                  } Blocks`,
              },
          ]
        : [];

    const actionButtonStyles = {
        textTransform: "none",
        marginRight: 2,
        fontSize: 13,
    };

    const defaultTabClasses = {
        borderRadius: 1,
        textTransform: "none",
        fontSize: 14,
    };

    const currentClasses = {
        background: `linear-gradient(
            180deg,
            ${theme.palette.custom.startGradient} 18.53%,
            ${theme.palette.custom.endGradient} 167.76%
        )`,
        color: theme.palette.background.default,
    };

    let stakingTabClasses = {
        ...defaultTabClasses,
    };

    let positionTabClasses = {
        ...defaultTabClasses,
    };

    if (currentTab === "1") {
        stakingTabClasses = { ...currentClasses, ...stakingTabClasses };
    }
    if (currentTab === "2") {
        positionTabClasses = { ...currentClasses, ...positionTabClasses };
    }

    const fadeOutTextStyle = { fontSize: "14px" };
    const boxStyles = {
        background: `linear-gradient(180deg, ${theme.palette.custom.elevation12} 0%, ${theme.palette.custom.elevation12} 100%), ${theme.palette.background.default}`,
        padding: 2,
        borderRadius: 1,
        "& .even": {
            background: `linear-gradient(180deg, rgba(165, 198, 255, 0.08) 0%, rgba(255, 255, 255, 0.08) 100%, rgba(165, 198, 255, 0.08) 100%), #11151C`,
        },
        "& .customRow": {
            fontFamily: theme.typography.subtitle1.fontFamily,
            borderRadius: 1,
        },
        "& .headerClass": {
            fontFamily: "JetBrains Mono",
        },
        "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
        },
        "& .odd.MuiDataGrid-row:hover": {
            background: `linear-gradient(180deg, ${theme.palette.custom.elevation12} 0%, ${theme.palette.custom.elevation12} 100%), ${theme.palette.background.default}`,
        },
        "& .even.MuiDataGrid-row:hover": {
            background: `linear-gradient(180deg, rgba(165, 198, 255, 0.08) 0%, rgba(255, 255, 255, 0.08) 100%, rgba(165, 198, 255, 0.08) 100%), #11151C`,
        },
    };

    function formattedAlcaBalance() {
        if (balances.alca.error || balances.alca.value === "n/a") return "n/a";

        return formatNumberToLocale(balances.alca.value);
    }

    function StakedPositionLabel() {
        return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>Staked Positions</Box>
                <CountBubble count={positions.staked.value.length} />
            </Box>
        );
    }

    function hasRewards() {
        return lockedPosition?.payoutToken !== "0.0" && lockedPosition?.payoutEth !== "0.0";
    }

    return (
        <>
            <ConfirmUnstakeModal
                unstakePosition={unstakePosition}
                onClose={() => setUnstakePosition(null)}
                handleUnstake={handleUnstake}
            />
            <NavigationBar />

            <Container maxWidth="lg">
                <SubNavigation />

                <TabContext value={currentTab}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }} pb={0.5}>
                        <TabList
                            onChange={handleTabChange}
                            textColor={theme.palette.background.default}
                            indicatorColor={theme.palette.background.default}
                        >
                            <Tab label={<StakedPositionLabel />} value="1" sx={stakingTabClasses} />
                            {hasLockedPosition && <Tab label="Locked Position" value="2" sx={positionTabClasses} />}
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ padding: 0 }}>
                        <Box sx={boxStyles}>
                            <Box sx={{ marginBottom: 1, paddingBottom: 1.5, borderBottom: "1px solid #555" }}>
                                <Typography variant="subtitle2" sx={[fadeOutTextStyle]}>
                                    Current ALCA Balance
                                </Typography>
                                <Typography variant="h5">{formattedAlcaBalance()} ALCA</Typography>
                            </Box>

                            <DataGrid
                                autoPageSize
                                autoHeight
                                disableSelectionOnClick
                                disableColumnMenu
                                pageSize={10}
                                rows={stakedPositionsRows}
                                columns={stakedPositionsColumns}
                                rowHeight={72}
                                getRowClassName={(params) => {
                                    return params.indexRelativeToCurrentPage % 2 === 0
                                        ? "customRow even"
                                        : "customRow odd";
                                }}
                                sx={{ fontSize: 14 }}
                            />
                        </Box>
                    </TabPanel>
                    <TabPanel value="2" sx={{ padding: 0 }}>
                        <Box sx={boxStyles}>
                            <Box sx={{ marginBottom: 1, paddingBottom: 1.5, borderBottom: "1px solid #555" }}>
                                <Typography variant="subtitle2" sx={[fadeOutTextStyle]}>
                                    Current ALCA Balance
                                </Typography>
                                <Typography variant="h5">{formattedAlcaBalance()} ALCA</Typography>
                            </Box>

                            <DataGrid
                                autoPageSize
                                autoHeight
                                disableSelectionOnClick
                                disableColumnMenu
                                pageSize={10}
                                rows={lockedPositionsRows}
                                columns={lockedPositionsColumns}
                                hideFooterPagination={true}
                                rowHeight={72}
                                getRowClassName={(params) => {
                                    return params.indexRelativeToCurrentPage % 2 === 0
                                        ? "customRow even"
                                        : "customRow odd";
                                }}
                                sx={{ fontSize: 14 }}
                            />
                        </Box>
                    </TabPanel>
                </TabContext>
            </Container>

            <Snackbar
                sx={{ mb: 10 }}
                open={snackbarOpen}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                autoHideDuration={snackbarAutoHideDuration}
                onClose={() => {
                    setSnackbarOpen(false);
                }}
            >
                <Box>
                    <SnackbarMessage status={snackbarMessage.status} message={snackbarMessage.message} />
                </Box>
            </Snackbar>
        </>
    );
}
