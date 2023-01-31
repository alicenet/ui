import { createTheme } from "@mui/material";

const CustomColors = {
    copperCrayola: "#ea9167",
    darkPurple: "#24031",
    midnightBlue: "#1d0a66",
    midnight: "#7e176b",
    thistle: "#e3c8e2",
    tile: "radial-gradient(56.34% 56.34% at 50% -18.21%, #312131 16.57%, #1A131A 100%)",
    dark_secondary_main: "#DC0AAA",
    dark_text_primary: "rgba(255,255,255,70)",
    dark_text_secondary: "#FFFFFF",
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
            main: CustomColors.midnightBlue,
            tile: CustomColors.tile,
        },
        secondary: {
            main: CustomColors.copperCrayola,
        },
        text: {
            primary: CustomColors.dark_text_primary,
            secondary: CustomColors.dark_text_secondary,
        },
    },
});
