import { createTheme } from "@mui/material";
import { theme as aliceTheme } from "alice-mui-provider";

const CustomPaletteColors = {
    mode: "dark",
    primary: {
        main: "#95F1E3",
        light: "#C9FFFF",
    },
    secondary: {
        main: "#FFABD1",
        dark: "#B27792",
        startGradient: "#FFABD4",
        endGradient: "#CE6D99",
        darkText: "rgba(255, 255, 255, 0.7)",
        darkTextDisabled: "rgba(255, 255, 255, 0.5)",
    },
    dark: {
        main: "#11151C",
        elevation1: "rgba(165, 198, 255, 0.05)",
        elevation3: "rgba(165, 198, 255, 0.08)",
        elevation12: "rgba(165, 198, 255, 0.14)",
    },
    light: {
        elevation3: "rgba(255, 255, 255, 0.08)",
    },
};

export const theme = createTheme({
    ...aliceTheme,
    palette: CustomPaletteColors,
    typography: {
        fontFamily: "JetBrains Mono",
        subtitle1: {
            fontFamily: "Inter",
        },
        subtitle2: {
            fontFamily: "Inter",
            color: "#fff",
            opacity: "50%",
        },
        body1: {
            fontFamily: "Inter",
        },
        body2: {
            fontFamily: "Inter",
        },
        button: {
            textTransform: "none",
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                body {
                    background: radial-gradient(81.56% 81.56% at 50% 95.8%, #001740 0%, ${CustomPaletteColors.dark.main} 100%);
                }
            `,
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: "none",
                },
                columnHeaders: {
                    border: "none",
                },
                row: {
                    border: "none",
                },
                cell: {
                    border: "none",
                },
                footerContainer: {
                    border: "none",
                },
                columnSeparator: {
                    display: "none",
                },
                withBorder: {
                    border: "none",
                },
                "row:hover": {
                    bgcolor: "transparent",
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    fontFamily: "JetBrains Mono",
                },
            },
        },
    },
});
