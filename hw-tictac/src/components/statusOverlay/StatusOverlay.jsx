import { aliceNetAdapter } from "adapter/alicenetadapter";
import React from "react";
import { useSelector } from "react-redux";
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from "@mui/material";

export const StatusOverlay = () => {

    useSelector(s => s);

    const busy = aliceNetAdapter.busy || ""; // Todo: Update to support all required busy states
    const error = aliceNetAdapter.error || ""; // Todo: Update to support all required errors

    return (
        <>
            <Backdrop open={!!busy} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                    <Typography variant="span" fontSize="x-large">{busy}</Typography>
                    <CircularProgress />
                </Box>
            </Backdrop>

            <Dialog open={!!error}>
                <DialogTitle>
                    <Typography variant="span" fontSize="x-large">Error</Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <Typography variant="span">{error}</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant="contained" onClick={() => document.location.reload(true)}>
                        Try Again
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );

}