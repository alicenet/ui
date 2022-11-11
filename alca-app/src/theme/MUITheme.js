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
    },
    headerBlack: {
        main: "#171717",
    },
    dark: {
        main: "#212121",
        light: "#0000000A",
    },
    darkGray: {
        main: "#2D2D2D",
    },
    rowBlack: {
        main: "#343333",
    },
    tableBlack: {
        main: "#444444",
    },
    buttonBlack: {
        main: "#494949",
    },
    lightGray: {
        main: "#A7A6A6",
    },
    clearGray: {
        main: "#DEDEDE",
    },
    dropGray: {
        main: "#EEEEEE",
    },
    background: {
        default: "#11151C",
    },
};

export const theme = createTheme({
    ...aliceTheme,
    palette: CustomPaletteColors,
});
