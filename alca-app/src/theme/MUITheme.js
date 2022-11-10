import { createTheme } from "@mui/material";
import { theme as aliceTheme } from "alice-mui-provider";

console.log({ aliceTheme });

const CustomColors = {
    background: "#1E1E1E",
    copperCrayola: "#ea9167",
    darkPurple: "#24031",
    midnightBlue: "#1d0a66",
    midnight: "#7e176b",
    thistle: "#e3c8e2",
};

export const theme = createTheme({
    ...aliceTheme,
    palette: {
        ...aliceTheme.palette,
        background: { default: CustomColors.background },
    },
});
