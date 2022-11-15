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
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                body {
                    background: radial-gradient(81.56% 81.56% at 50% 95.8%, #0D1A31 0%, #11151C 100%);
                }
            `,
        },
    },
});
