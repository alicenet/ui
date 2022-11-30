import { createTheme } from "@mui/material";
import { theme as aliceTheme } from "alice-mui-provider";
import bgAlicenetLogo from "assets/bg-alicenet-logo.svg";

// TODO Update this to use mui-provider palette -> https://github.com/alicenet/alice-mui-provider
const CustomPaletteColors = {
    mode: "dark",
    primary: {
        main: "#95F1E3",
        light: "#C9FFFF",
        dark: "#6FBEB2",
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
        elevation4: "rgba(165, 198, 255, 0.09)",
        elevation12: "rgba(165, 198, 255, 0.14)",
        elevation24: "rgba(165, 198, 255, 0.16)",
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
            fontSize: 16,
        },
        subtitle2: {
            fontFamily: "Inter",
            color: "#fff",
            opacity: "50%",
        },
        body2: {
            fontFamily: "Inter",
            fontSize: 14,
        },
        button: {
            textTransform: "none",
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                body {
                    background: url(
                        ${bgAlicenetLogo}) no-repeat,
                        radial-gradient(81.56% 81.56% at 50% 95.8%,
                        #001740 0%,
                        ${CustomPaletteColors.dark.main} 100%
                    );
                    background-position: left -200px bottom;
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
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    fontFamily: "JetBrains Mono",
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    border: 0,
                },
            },
        },
    },
});
