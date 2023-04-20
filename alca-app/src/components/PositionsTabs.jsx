import { useContext, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Button, Chip, LinearProgress, Tab, Typography } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { BalanceContext, commonEthRequests } from "alice-ui-common";
import { formatNumberToLocale } from "utils/number";
import { symbols } from "config";
import ethAdapter from "eth-adapter";
import {
    claimLockedRewards,
    unlockLockedPosition,
    unlockLockedPositionEarly,
} from "pages/Transactions/transactionFunctions";
import { CountBubble } from "components";
import { PositionsTabPanel } from "./PositionsTabPanel";

export function PositionsTabs({
    transacting,
    setTransacting,
    setUnstakePosition,
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarAutoHideDuration,
}) {
    const { positions = {}, updateBalances } = useContext(BalanceContext);
    const hasLockedPosition = positions?.lockedPosition?.value?.tokenId !== "0";
    const lockedPosition = hasLockedPosition ? positions?.lockedPosition?.value : {};

    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState("1");
    const [currentBlock, setCurrentBlock] = useState("?");

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

    // Force Staked tab if no locked positions
    if (!hasLockedPosition) {
        if (currentTab !== "1") {
            setCurrentTab("1");
        }
    }

    function handleShowUnstakeModal(row) {
        setUnstakePosition(row);
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

    function canClaimRewards(params) {
        const hasRewards = parseFloat(params.row.alcaRewards) > 0 || parseFloat(params.row.ethRewards) > 0;
        return !transacting && hasRewards && Number(currentBlock) > Number(params.row.claimRewardsAfter);
    }

    function canUnstake(params) {
        return !transacting && Number(currentBlock) > Number(params.row.unstakePositionAfter);
    }

    function getBlocksTilUnstake(params) {
        let remaining = params.row.unstakePositionAfter - currentBlock;
        return remaining <= 0 ? "0" : remaining.toString();
    }

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
                            disabled={!canClaimRewards(params)}
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
                            disabled={!canUnstake(params)}
                        >
                            {canUnstake(params) ? "Unstake" : "Locked"}
                        </Button>
                        {!canUnstake(params) && (
                            <Chip
                                color={"warning"}
                                style={{ fontWeight: 900 }}
                                label={<>Locked For {getBlocksTilUnstake(params)} Blocks</>}
                            />
                        )}
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
                    <Box width="100%">
                        <LinearProgress
                            variant="determinate"
                            color="secondary"
                            value={lockedPosition.blockUntilUnlock > 0 ? progress : 100}
                        />
                        <Box mt={0.7} sx={{ fontSize: 10, fontFamily: theme.typography.fontFamily }}>
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
            renderCell: () => (
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
                        sx={actionButtonStyles}
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
                  ...lockedPosition,
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
        height: 42,
        minHeight: "inherit",
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

    function StakedPositionLabel() {
        return (
            <Box display="flex" alignItems="center">
                <Box>Staked Positions</Box>
                <CountBubble count={positions.staked.value.length} />
            </Box>
        );
    }

    function hasRewards() {
        return lockedPosition?.payoutToken !== "0.0" && lockedPosition?.payoutEth !== "0.0";
    }

    return (
        <TabContext value={currentTab}>
            <Box borderBottom={1} borderColor="divider" pb={0.5}>
                <TabList
                    onChange={handleTabChange}
                    textColor={theme.palette.background.default}
                    indicatorColor={theme.palette.background.default}
                >
                    <Tab label={<StakedPositionLabel />} value="1" sx={stakingTabClasses} />
                    {hasLockedPosition && <Tab label="Locked Position" value="2" sx={positionTabClasses} />}
                </TabList>
            </Box>

            <PositionsTabPanel
                value="1"
                rows={stakedPositionsRows}
                columns={stakedPositionsColumns}
                hideFooterPagination={stakedPositionsRows && stakedPositionsRows.length === 0}
            />

            <PositionsTabPanel
                value="2"
                rows={lockedPositionsRows}
                columns={lockedPositionsColumns}
                hideFooterPagination={true}
            />
        </TabContext>
    );
}
