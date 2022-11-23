import { CheckCircle } from "@mui/icons-material";
import { Alert, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export function SnackbarMessage({ status, message }) {
    let icon = <></>;
    let severity = "info";

    if (status === "pending") {
        icon = <CircularProgress size={20} />;
    } else if (status === "success") {
        icon = <CheckCircle />;
        severity = "success";
    } else if (status === "error") {
        severity = "error";
    }

    return (
        <Alert severity={severity} icon={false}>
            <Box sx={{ display: "flex", alignItems: "center", fontSize: 16 }}>
                <Box sx={{ marginRight: 1 }}>{icon}</Box>
                {message}
            </Box>
        </Alert>
    );
}
