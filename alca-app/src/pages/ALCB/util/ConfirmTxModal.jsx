import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";

export function ConfirmTxModal({ open, close, confirmFx, tokenTxDetails, waiting, error }) {
    const theme = useTheme();

    const modalContainerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const modalStyle = {
        width: "80%",
        maxWidth: "680px",
        marginLeft: "auto",
        marginRight: "auto",
        background: "linear-gradient(180deg, rgba(165, 198, 255, 0.16) 0%, rgba(165, 198, 255, 0.16) 100%), #11151C;",
        p: "24px",
        overflow: "auto",
    };

    const calcReturn = () => {
        return tokenTxDetails.input === "ETH" ? tokenTxDetails.tokensToExchange : tokenTxDetails.tokensToExchange / 4;
    };

    const BoldenColorize = ({ children, color }) => <span style={{ fontWeight: 900, color: color }}>{children}</span>;

    const TxError = () => {
        return (
            error && (
                <Box sx={{ opacity: 1, overflow: "auto", maxHeight: "48px", background: "#22222255", p: 1 }}>
                    <Typography sx={{ fontWeight: 900, fontSize: "11px", color: theme.palette.error.main }}>
                        Error
                    </Typography>
                    <Typography sx={{ fontSize: "9px", color: theme.palette.text.secondary }}>{error}</Typography>
                </Box>
            )
        );
    };

    return (
        <Modal sx={{ ...modalContainerStyle }} open={open} onClose={close}>
            <Box sx={{ ...modalStyle }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h4" sx={{ fontWeight: 900 }}>
                            ALCB Swap Confirmation
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 4, mb: 4 }}>
                        <Typography>You are about to swap</Typography>
                        <Typography sx={{ mt: 2, fontSize: "1.4rem" }}>
                            <BoldenColorize color={theme.palette.error.main}>
                                {tokenTxDetails.tokensToExchange} {tokenTxDetails.input}
                            </BoldenColorize>
                            &nbsp; for &nbsp;
                            <BoldenColorize color={theme.palette.success.main}>
                                {calcReturn()} {tokenTxDetails.output}
                            </BoldenColorize>
                        </Typography>
                        <Typography sx={{ mt: 3 }}> If this is incorrect please click cancel</Typography>
                        <Typography sx={{ mt: 1 }}> Clicking confirm will request your wallet signature</Typography>
                    </Grid>
                    <Grid item xs={error ? 7 : 12}>
                        <TxError />
                    </Grid>
                    <Grid
                        xs={error ? 5 : 12}
                        sx={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                            minHeight: "48px",
                        }}
                        item
                    >
                        <Button
                            sx={{ maxHeight: "33px" }}
                            disabled={waiting}
                            variant="outlined"
                            color="error"
                            onClick={close}
                        >
                            Cancel
                        </Button>
                        <LoadingButton
                            sx={{ maxHeight: "33px", ml: 2 }}
                            loading={waiting}
                            variant="outlined"
                            color="success"
                            onClick={confirmFx}
                        >
                            {error ? "Try Again" : "Confirm"}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}

// tokenTxDetails={{ input: inputToken, output: outputToken, tokensToExchange: tokensToExchange }}
