import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Box, Container, Snackbar } from "@mui/material";
import { Page, PositionsTabs, SubNavigation } from "components";
import { BalanceContext, commonEthRequests } from "alice-ui-common";
import ethAdapter from "eth-adapter";
import { ConfirmUnstakeModal, SnackbarMessage } from "components";

export function Positions() {
    const { updateBalances } = useContext(BalanceContext);

    // Unstake Modal
    const [unstakePosition, setUnstakePosition] = useState(null);

    // Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState({});
    const [snackbarAutoHideDuration, setSnackbarAutoHideDuration] = useState(null);

    // Transaction state
    const [transacting, setTransacting] = useState(false);

    // If no connection, push to connect/transaction page
    if (!ethAdapter.connected) {
        return <Navigate to="/" />;
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

    return (
        <Page>

            <Container maxWidth="lg">

                <SubNavigation />

                <PositionsTabs
                    transacting={transacting}
                    setTransacting={setTransacting}
                    setUnstakePosition={setUnstakePosition}
                    setSnackbarOpen={setSnackbarOpen}
                    setSnackbarMessage={setSnackbarMessage}
                    setSnackbarAutoHideDuration={setSnackbarAutoHideDuration}
                />

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

            <ConfirmUnstakeModal
                unstakePosition={unstakePosition}
                onClose={() => setUnstakePosition(null)}
                handleUnstake={handleUnstake}
            />

        </Page>
    );
}
