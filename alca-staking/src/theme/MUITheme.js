import { createTheme } from "@mui/material";

const CustomColors = {
    copperCrayola: "#ea9167",
    darkPurple: "#24031",
    electricBlue: "#9AEBDD",
    midnight: "#7e176b",
    thistle: "#e3c8e2",
    tile: "radial-gradient(56.34% 56.34% at 50% -18.21%, #312131 16.57%, #1A131A 100%)",
    dark_secondary_main: "#DC0AAA",
    dark_text_primary: "#FFFFFF",
    dark_text_secondary: "rgba(255,255,255,70%)",
    pinkishText: "#E5D2E3",
};

export const theme = createTheme({
    background: {
        tile: "",
    },
    status: {
        danger: "red",
    },
    palette: {
        primary: {
            main: CustomColors.electricBlue,
            tile: CustomColors.tile,
        },
        secondary: {
            main: CustomColors.copperCrayola,
        },
        text: {
            primary: CustomColors.dark_text_primary,
            secondary: CustomColors.dark_text_secondary,
            tertiary: CustomColors.pinkishText,
        },
    },
});
