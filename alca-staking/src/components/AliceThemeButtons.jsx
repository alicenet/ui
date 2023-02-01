const { Button, useTheme } = require("@mui/material");

/** Abstracted Buttons here to hopefully update to Adrian's theme better when available */
export function ThemedPrimaryButton(props) {
    const theme = useTheme();
    return (
        <Button
            {...props}
            sx={{
                background: "#9AEBDD",
                padding: "6px 16px",
                borderRadius: "4px",
                color: "#000",
                fontFamily: "ESKlariheit",
                fontWeight: 600,
                "&:hover": {
                    background: "#6BA49A",
                },
            }}
        />
    );
}
