import { createTheme } from "@mui/material";
import { theme as aliceTheme } from "alice-mui-provider";
import bgAlicenetLogo from "assets/bg-alicenet-logo.svg";

const CustomPaletteColors = {
    ...aliceTheme.palette,
    custom: {
        startGradient: "#FFABD4",
        endGradient: "#CE6D99",
        elevation1: "rgba(165, 198, 255, 0.05)",
        elevation3: "rgba(165, 198, 255, 0.08)",
        elevation4: "rgba(165, 198, 255, 0.09)",
        elevation12: "rgba(165, 198, 255, 0.14)",
        elevation24: "rgba(165, 198, 255, 0.16)",
    },
};

const CustomTypography = {
    ...aliceTheme.typography,
    // TODO Move this to mui-provider
    subtitle1: {
        fontFamily: "Inter",
    },
    subtitle2: {
        fontFamily: "Inter",
        fontSize: 14,
    },
    body2: {
        fontFamily: "Inter",
        fontSize: 14,
    },
    button: {
        textTransform: "none",
    },
};

export const theme = createTheme({
    ...aliceTheme,
    palette: CustomPaletteColors,
    typography: CustomTypography,
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                body {
                    background: url(
                        ${bgAlicenetLogo}) no-repeat,
                        radial-gradient(81.56% 81.56% at 50% 95.8%,
                        #001740 0%,
                        ${aliceTheme.palette.background.default} 100%
                    );
                    background-position: left -200px bottom;
                }
            `,
        },
        // TODO Move this to mui-provider
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
        MuiTableCell: {
            styleOverrides: {
                root: {
                    border: 0,
                },
            },
        },
    },
});
