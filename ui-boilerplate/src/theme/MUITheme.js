import { createTheme } from "@mui/material";

const CustomColors = {
    "copperCrayola": "#ea9167",
    "darkPurple": "#24031",
    "midnightBlue": "#1d0a66",
    "midnight": "#7e176b",
    "thistle": "#e3c8e2"
}

export const theme = createTheme({
    status: {
        danger: "red",
    },
    palette: {
        primary: {
            main: CustomColors.midnightBlue,
        },
        secondary: {
            main: CustomColors.copperCrayola
        }
    }
});