import React, { useState } from "react";
import { Button, Snackbar } from "@mui/material";
import { BalanceContext } from "alice-ui-common";
import ethAdapter from "eth-adapter";
import { useDispatch, useSelector } from "react-redux";
import { splitStringWithEllipses } from "utils/string";
import { setInitialLoadCompleted } from "redux/actions/application";
import { Box } from "@mui/system";
import { SnackbarMessage } from "./SnackbarMessage";

export function ConnectWeb3Button({ menuButtonSx, overrideText, sx }) {
    useSelector((s) => s.ethAdapter); // Hook into reducer updates so equalize works properly against ethAdapter
    const balances = React.useContext(BalanceContext);
    const dispatch = useDispatch();
    const { web3Connected, web3Accounts } = {
        web3Connected: ethAdapter.connected,
        web3Accounts: ethAdapter.accounts,
    };

    // Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState({});

    const connectCb = async (err) => {
        if (err) {
            setSnackbarMessage({
                status: "error",
                message: "Wallet connect failed",
            });
            setSnackbarOpen(true);
            return;
        }

        await balances.updateBalances(ethAdapter);
        dispatch(setInitialLoadCompleted());
    };

    let sxGroup = Object.assign({}, menuButtonSx, sx);

    return (
        <>
            <Button variant="contained" sx={sxGroup} onClick={() => ethAdapter.connectToWeb3Wallet(connectCb)}>
                {web3Connected ? <>{splitStringWithEllipses(web3Accounts[0], 5)}</> : <>{overrideText || "Connect"}</>}
            </Button>

            <Snackbar
                sx={{ mb: 10 }}
                open={snackbarOpen}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                autoHideDuration={7500}
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
