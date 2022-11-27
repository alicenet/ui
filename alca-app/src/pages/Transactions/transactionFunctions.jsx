import { commonEthRequests } from "alice-ui-common";
import ethAdapter from "eth-adapter";

export async function migrate({
    madForMigration,
    setMadForMigration,
    setModalOpen,
    setSnackbarAutoHideDuration,
    setSnackbarMessage,
    setSnackbarOpen,
    setTransacting,
    updateBalances,
}) {
    setTransacting(true);
    try {
        // Pending message
        setSnackbarMessage({ status: "pending", message: "Tx 1/2: Pending Migration Allowance" });
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
        setSnackbarMessage({ status: "pending", message: "Tx 2/2: Pending Migration" });
        // Migration transaction
        const migrateTx = await commonEthRequests.migrate_sendMigrateRequest(ethAdapter, madForMigration);
        if (migrateTx.error) {
            throw new Error(migrateTx.error);
        }
        await migrateTx.wait();
    } catch (e) {
        // Error message
        console.error(e.message);
        setSnackbarAutoHideDuration(7500);
        setSnackbarMessage({
            status: "error",
            message: "There was an error with the transaction. Please try again.",
        });
        // No longer transacting
        setTransacting(false);
        return;
    }
    await updateBalances(ethAdapter);
    // Close modal
    setModalOpen(false);
    // Success message
    setSnackbarAutoHideDuration(7500);
    setSnackbarMessage({
        status: "success",
        message: "Successfully Migrated",
    });
    // Reset MAD to ALCA
    setMadForMigration("0");
    // No longer transacting
    setTransacting(false);
}

export async function stake({
    setAmountOfAlcaToStake,
    setMadForMigration,
    setModalOpen,
    setSnackbarAutoHideDuration,
    setSnackbarMessage,
    setSnackbarOpen,
    setTransacting,
    stakeAlcaAmount,
    updateBalances,
}) {
    setTransacting(true);
    try {
        // Pending message
        setSnackbarMessage({ status: "pending", message: "Tx 1/2: Pending Staking Allowance" });
        // Open snackbar
        setSnackbarOpen(true);
        // Allowance transaction
        const allowanceTx = await commonEthRequests.staking_sendAtokenAllowanceForPublicStakingRequest(
            ethAdapter,
            stakeAlcaAmount
        );
        if (allowanceTx.error) {
            throw new Error(allowanceTx.error);
        }
        await allowanceTx.wait();
        // Pending message
        setSnackbarMessage({ status: "pending", message: `Tx 2/2: Pending Stake ${stakeAlcaAmount} ALCA` });
        // Stake transaction
        const stakeTx = await commonEthRequests.staking_sendOpenPublicStakingPositionRequest(
            ethAdapter,
            stakeAlcaAmount
        );
        if (stakeTx.error) {
            throw new Error(stakeTx.error);
        }
        await stakeTx.wait();
    } catch (e) {
        // Error message
        console.error(e.message);
        setSnackbarAutoHideDuration(7500);
        setSnackbarMessage({
            status: "error",
            message: "There was an error with the transaction. Please try again.",
        });
        // No longer transacting
        setTransacting(false);
        return;
    }
    await updateBalances(ethAdapter);
    // Close modal
    setModalOpen(false);
    // Success message
    setSnackbarAutoHideDuration(7500);
    setSnackbarMessage({ status: "success", message: `${stakeAlcaAmount} ALCA Successfully Staked ` });
    // Reset MAD to ALCA and Staking Amount
    setMadForMigration("0");
    setAmountOfAlcaToStake("0");
    // Fetch balance
    // No longer transacting
    setTransacting(false);
}

export async function migrateAndStake({
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
}) {
    setTransacting(true);
    try {
        // Pending message
        setSnackbarMessage({ status: "pending", message: "Tx 1/2: Pending Migrate/Stake Allowance" });
        // Open snackbar
        setSnackbarOpen(true);
        // Allowance transaction
        const allowanceTx = await commonEthRequests.psrouter_sendApproveMadTokenForPublicStakingRouterRequest(
            ethAdapter,
            madForMigration
        );
        if (allowanceTx.error) {
            throw new Error(allowanceTx.error);
        }
        await allowanceTx.wait();
        // Pending message
        setSnackbarMessage({ status: "pending", message: `Tx 2/2: Pending Migrate & Stake` });
        // Stake transaction
        const migrateAndStake = await ethAdapter.contractMethods.STAKINGROUTERV1.migrateAndStake_nonpayable_IN3_OUT0({
            migrationAmount_: ethAdapter.ethers.utils.parseEther(madForMigration),
            stakingAmount_: ethAdapter.ethers.utils.parseEther(stakeAlcaAmount),
            to_: ethAdapter.connectedAccount,
        });
        if (migrateAndStake.error) {
            throw new Error(migrateAndStake.error);
        }
        await migrateAndStake.wait();
    } catch (e) {
        // Error message
        console.error(e.message);
        setSnackbarAutoHideDuration(7500);
        setSnackbarMessage({
            status: "error",
            message: "There was an error with the transaction. Please try again.",
        });
        // No longer transacting
        setTransacting(false);
        return;
    }
    await updateBalances(ethAdapter);
    // Close modal
    setModalOpen(false);
    // Success message
    setSnackbarAutoHideDuration(7500);
    setSnackbarMessage({
        status: "success",
        message: `${madForMigration} MAD migrated & ${stakeAlcaAmount} ALCA Staked Successfully `,
    });
    // Reset MAD to ALCA and Staking Amount
    setMadForMigration("0");
    setAmountOfAlcaToStake("0");
    // Fetch balance
    // No longer transacting
    setTransacting(false);
}

export async function stakeAndLock({
    setAmountOfAlcaToStake,
    setModalOpen,
    setSnackbarAutoHideDuration,
    setSnackbarMessage,
    setSnackbarOpen,
    setTransacting,
    stakeAlcaAmount,
    updateBalances,
}) {
    setTransacting(true);
    try {
        // Pending message
        setSnackbarMessage({ status: "pending", message: "Tx 1/2: Pending Stake/Lock Allowance" });
        // Open snackbar
        setSnackbarOpen(true);
        // Allowance transaction
        const allowanceTx = await ethAdapter.contractMethods.ATOKEN.approve_nonpayable_IN2_OUT1({
            amount: ethAdapter.ethers.utils.parseEther(stakeAlcaAmount),
            spender: ethAdapter.contractConfig.STAKINGROUTERV1.address,
        });
        if (allowanceTx.error) {
            throw new Error(allowanceTx.error);
        }
        await allowanceTx.wait();
        // Pending message
        setSnackbarMessage({ status: "pending", message: `Tx 2/2: Pending Stake/Lock` });

        // Stake Tx
        const stakeAndLock = await ethAdapter.contractMethods.STAKINGROUTERV1.stakeAndLock_nonpayable_IN2_OUT0({
            stakingAmount_: ethAdapter.ethers.utils.parseEther(stakeAlcaAmount),
            to_: ethAdapter.connectedAccount,
        });
        if (stakeAndLock.error) {
            throw new Error(stakeAndLock.error);
        }
        await stakeAndLock.wait();
    } catch (e) {
        // Error message
        console.error(e.message);
        setSnackbarAutoHideDuration(7500);
        setSnackbarMessage({
            status: "error",
            message: "There was an error with the transaction. Please try again.",
        });
        // No longer transacting
        setTransacting(false);
        return;
    }
    await updateBalances(ethAdapter);
    // Close modal
    setModalOpen(false);
    // Success message
    setSnackbarAutoHideDuration(7500);
    setSnackbarMessage({
        status: "success",
        message: `${stakeAlcaAmount} ALCA Staked And Locked Successfully `,
    });
    // Reset MAD to ALCA and Staking Amount
    setAmountOfAlcaToStake("0");
    // Fetch balance
    // No longer transacting
    setTransacting(false);
}

export async function migrateStakeAndLock({
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
}) {
    setTransacting(true);
    try {
        // Pending message
        setSnackbarMessage({ status: "pending", message: "Tx 1/2: Pending Migrate/Stake/Lock Allowance" });
        // Open snackbar
        setSnackbarOpen(true);
        // Allowance transaction
        const allowanceTx = await commonEthRequests.psrouter_sendApproveMadTokenForPublicStakingRouterRequest(
            ethAdapter,
            madForMigration
        );
        if (allowanceTx.error) {
            throw new Error(allowanceTx.error);
        }
        await allowanceTx.wait();

        // Pending message
        setSnackbarMessage({ status: "pending", message: "Tx 2/2: Pending Migrate/Stake/Lock" });
        // Stake transaction
        const migrateStakeAndLock =
            await ethAdapter.contractMethods.STAKINGROUTERV1.migrateStakeAndLock_nonpayable_IN3_OUT0({
                migrationAmount_: ethAdapter.ethers.utils.parseEther(madForMigration),
                stakingAmount_: ethAdapter.ethers.utils.parseEther(stakeAlcaAmount),
                to_: ethAdapter.connectedAccount,
            });
        if (migrateStakeAndLock.error) {
            throw new Error(migrateStakeAndLock.error);
        }
        await migrateStakeAndLock.wait();
    } catch (e) {
        // Error message
        console.error(e.message);
        setSnackbarAutoHideDuration(7500);
        setSnackbarMessage({
            status: "error",
            message: "There was an error with the transaction. Please try again.",
        });
        // No longer transacting
        setTransacting(false);
        return;
    }
    await updateBalances(ethAdapter);
    // Close modal
    setModalOpen(false);
    // Success message
    setSnackbarAutoHideDuration(7500);
    setSnackbarMessage({
        status: "success",
        message: `${madForMigration} MAD Migrated, and ${stakeAlcaAmount} ALCA Staked And Locked Successfully `,
    });
    // Reset MAD to ALCA and Staking Amount
    setAmountOfAlcaToStake("0");
    setMadForMigration("0");
    // No longer transacting
    setTransacting(false);
}

export async function claimLockedRewards({
    lockedPosition,
    setTransacting,
    setSnackbarAutoHideDuration,
    setSnackbarMessage,
    setSnackbarOpen,
    updateBalances,
}) {
    setTransacting(true);
    try {
        // Pending message
        setSnackbarMessage({ status: "pending", message: "Pending Claim Rewards" });
        // Open snackbar
        setSnackbarOpen(true);
        // Allowance transaction
        const rewardClaimTx = await commonEthRequests.lockup_sendCollectAllRewardsFromLockupRequest(ethAdapter);
        if (rewardClaimTx.error) {
            throw new Error(rewardClaimTx.error);
        }
        await rewardClaimTx.wait();
    } catch (e) {
        // Error message
        console.error(e.message);
        setSnackbarAutoHideDuration(7500);
        setSnackbarMessage({
            status: "error",
            message: "There was an error with the transaction. Please try again.",
        });
        // No longer transacting
        setTransacting(false);
        return;
    }
    await updateBalances(ethAdapter);
    // Success message
    setSnackbarAutoHideDuration(7500);
    setSnackbarMessage({
        status: "success",
        message: `${lockedPosition?.payoutToken} ALCA, and ${lockedPosition?.payoutEth} ETH Rewards Claimed `,
    });
    // No longer transacting
    setTransacting(false);
}

export async function unlockLockedPositionEarly({
    lockedPosition,
    setTransacting,
    setSnackbarAutoHideDuration,
    setSnackbarMessage,
    setSnackbarOpen,
    updateBalances,
}) {
    setTransacting(true);
    try {
        // Pending message
        setSnackbarMessage({ status: "pending", message: "Pending Unlock Position Early" });
        // Open snackbar
        setSnackbarOpen(true);
        // Allowance transaction
        const exitEarly = await commonEthRequests.lockup_sendExitLockedPositionEarlyRequest(
            ethAdapter,
            lockedPosition.lockedAlca,
            true
        );
        if (exitEarly.error) {
            throw new Error(exitEarly.error);
        }
        await exitEarly.wait();
    } catch (e) {
        // Error message
        console.error(e.message);
        setSnackbarAutoHideDuration(7500);
        setSnackbarMessage({
            status: "error",
            message: "There was an error with the transaction. Please try again.",
        });
        // No longer transacting
        setTransacting(false);
        return;
    }
    await updateBalances(ethAdapter);
    // Success message
    setSnackbarAutoHideDuration(7500);
    setSnackbarMessage({
        status: "success",
        message: `${lockedPosition?.tokenId} unlocked early.`,
    });
    // No longer transacting
    setTransacting(false);
}

export async function unlockLockedPosition({
    lockedPosition,
    setTransacting,
    setSnackbarAutoHideDuration,
    setSnackbarMessage,
    setSnackbarOpen,
    updateBalances,
}) {
    setTransacting(true);
    try {
        // Pending message
        setSnackbarMessage({ status: "pending", message: "Pending Unlock Position" });
        // Open snackbar
        setSnackbarOpen(true);
        // Allowance transaction
        const exitEarly = await commonEthRequests.lockup_sendExitLockedPositionRequest(
            ethAdapter,
            ethAdapter.connectedAccount,
            true
        );
        if (exitEarly.error) {
            throw new Error(exitEarly.error);
        }
        await exitEarly.wait();
    } catch (e) {
        // Error message
        console.error(e.message);
        setSnackbarAutoHideDuration(7500);
        setSnackbarMessage({
            status: "error",
            message: "There was an error with the transaction. Please try again.",
        });
        // No longer transacting
        setTransacting(false);
        return;
    }
    await updateBalances(ethAdapter);
    // Success message
    setSnackbarAutoHideDuration(7500);
    setSnackbarMessage({
        status: "success",
        message: `${lockedPosition?.tokenId} unlocked.`,
    });
    // No longer transacting
    setTransacting(false);
}
