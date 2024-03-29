import React from "react";
import { Modal, Box, Typography, Paper, Button } from "@mui/material";
import { useTheme } from "@emotion/react";

export function ConfirmUnstakeModal({ unstakePosition, onClose, handleUnstake }) {
    const isModalOpen = Boolean(unstakePosition);
    const theme = useTheme();

    const ModalHeader = () => (
        <>
            <Box
                sx={{ display: "flex", justifyContent: "end", fontWeight: "bold", cursor: "pointer" }}
                onClick={onClose}
            >
                X
            </Box>
            <Typography id="modal-title" variant="h5" component="h2">
                Unstake confirmation
            </Typography>
        </>
    );

    const ModalContent = () => (
        <Box sx={{ my: 2 }}>
            <Typography variant="p">
                You are unstaking <b>{unstakePosition.amount} ALCA</b> with{" "}
                <b>rewards of {unstakePosition.rewards || "0"}.</b> Rewards will be sent automatically to your wallet.
            </Typography>
        </Box>
    );

    const ModalActions = () => {
        return (
            <Box sx={{ display: "flex", mt: 2, justifyContent: "end", width: "100%", gap: 2 }}>
                <Button size="large" color="primary" disableRipple onClick={onClose}>
                    Close
                </Button>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    disableRipple
                    onClick={() => handleUnstake(unstakePosition.id)}
                >
                    Unstake Position
                </Button>
            </Box>
        );
    };

    return (
        <Modal open={isModalOpen} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
            <Paper
                sx={{
                    position: "absolute",
                    width: "70%",
                    maxWidth: 1080,
                    height: "25vh",
                    margin: "auto",
                    background:
                        " linear-gradient(180deg, rgba(165, 198, 255, 0.16) 0%, rgba(165, 198, 255, 0.16) 100%), #11151C;",
                    p: "24px",
                    transform: "translate(-50%, -50%)",
                    left: "50%",
                    top: "50%",
                    borderTop: 2,
                    borderColor: theme.palette.primary.main,
                }}
            >
                <Box sx={{ position: "relative", display: "flex", height: "100%", flexFlow: "column" }}>
                    <ModalHeader />
                    <ModalContent />
                    <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
                        <ModalActions />
                    </Box>
                </Box>
            </Paper>
        </Modal>
    );
}
