import { useContext, useState } from "react";
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
import { SnackbarMessage } from "components/SnackbarMessage";

export function Positions() {
    const { balances, positions = {} } = useContext(BalanceContext);

    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState("1");

    // Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState({});
    const [snackbarAutoHideDuration, setSnackbarAutoHideDuration] = useState(null);

    // Transaction state
    const [transacting, setTransacting] = useState(false);

    async function handleUnstake(tokenId) {
        setTransacting(true);

        // Pending message
        setSnackbarMessage({
            status: "pending",
            message: "Pending Unstake Transaction",
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

        // No longer transacting
        setTransacting(false);
    }

    async function handleClaim(tokenId) {
        setTransacting(true);

        // Pending message
        setSnackbarMessage({
            status: "pending",
            message: "Pending Claim Rewards Transaction",
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
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            sortable: false,
            showColumnRightBorder: false,
            headerClassName: "headerClass",
            renderCell: (params) => {
                const hasRewards = parseInt(params.row.alcaRewards) > 0 || parseInt(params.row.ethRewards) > 0;

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
                                handleUnstake(params.row.id);
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
            rewards: `${formatNumberToLocale(position.alcaRewards)} ${symbols.ALCA} / ${formatNumberToLocale(
                position.ethRewards
            )} ${symbols.ETH}`,
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
            field: "lockedDate",
            headerName: "Locked Date",
            flex: 0.5,
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
            headerName: "Rewards Achieved",
            flex: 0.75,
            sortable: false,
            headerClassName: "headerClass",
            renderCell: (params) => (
                <Box sx={{ width: "100%" }}>
                    <LinearProgress variant="determinate" color="secondary" value={40} />

                    <Box sx={{ fontSize: 10, fontFamily: theme.typography.fontFamily, marginTop: 0.7 }}>
                        40% Rewards
                    </Box>
                </Box>
            ),
        },
        {
            field: "currentRewards",
            headerName: "Current Rewards",
            flex: 0.75,
            sortable: false,
            headerClassName: "headerClass",
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
                    <Button variant="contained" size="small" color="secondary" sx={actionButtonStyles}>
                        Claim Rewards
                    </Button>
                    <Button variant="contained" size="small" color="secondary" sx={actionButtonStyles}>
                        Unlock
                    </Button>
                </Box>
            ),
        },
    ];

    const lockedPositionsRows = [
        {
            amount: "2388888 ALCA",
            id: 1,
            lockedDate: "03/12/2022",
            timeLeft: "18 days",
            currentRewards: "100 ALCA / 10 ETH",
        },
    ];

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
        background: "linear-gradient(180deg, #FFABD4 18.53%, #CE6D99 167.76%)",
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
        background: `linear-gradient(180deg, ${theme.palette.dark.elevation12} 0%, ${theme.palette.dark.elevation12} 100%), ${theme.palette.dark.main}`,
        padding: 2,
        "& .even": {
            background: `linear-gradient(180deg, rgba(165, 198, 255, 0.08) 0%, rgba(255, 255, 255, 0.08) 100%, rgba(165, 198, 255, 0.08) 100%), #11151C`,
        },
        "& .customRow": {
            fontFamily: theme.typography.subtitle1.fontFamily,
        },
        "& .headerClass": {
            fontFamily: "JetBrains Mono",
        },
        "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
        },
        "& .odd.MuiDataGrid-row:hover": {
            background: `linear-gradient(180deg, ${theme.palette.dark.elevation12} 0%, ${theme.palette.dark.elevation12} 100%), ${theme.palette.dark.main}`,
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
                <Box
                    sx={{
                        marginLeft: 1,
                        fontSize: "14px",
                        color: "#fff",
                        padding: "1px 5px",
                        bgcolor: "#0000007a",
                        borderRadius: 10,
                    }}
                >
                    {positions.staked.value.length}
                </Box>
            </Box>
        );
    }

    const hasLockedPosition = lockedPositionsRows.length > 0;

    return (
        <>
            <NavigationBar />

            <Container maxWidth="lg">
                <SubNavigation />

                <TabContext value={currentTab}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            onChange={handleTabChange}
                            textColor={theme.palette.background.default}
                            indicatorColor={theme.palette.background.default}
                        >
                            <Tab label={<StakedPositionLabel />} value="1" sx={stakingTabClasses} />
                            {hasLockedPosition && <Tab label="Locked Positions" value="2" sx={positionTabClasses} />}
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
                                <Typography variant="h5">2,000 ALCA</Typography>
                            </Box>

                            <DataGrid
                                autoPageSize
                                autoHeight
                                disableSelectionOnClick
                                disableColumnMenu
                                pageSize={10}
                                rows={lockedPositionsRows}
                                columns={lockedPositionsColumns}
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
