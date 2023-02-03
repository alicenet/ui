import { createTheme } from "@mui/material";

const CustomColors = {
    copperCrayola: "rgba(219, 9, 169, 1)",
    darkPurple: "#24031",
    electricBlue: "rgba(154, 235, 221, 100%)",
    electricBlueHover: "rgba(107, 164, 154, 100%)",
    darkActionDisabled: "rgba(255, 255, 255, 0.12)",
    midnight: "#7e176b",
    thistle: "#e3c8e2",
    tile: "radial-gradient(56.34% 56.34% at 50% -18.21%, #312131 16.57%, #1A131A 100%)",
    dark_secondary_main: "#DC0AAA",
    dark_text_primary: "#FFFFFF",
    dark_text_secondary: "rgba(255,255,255,70%)",
    light_text_primary: "rgba(17, 21, 28, 0.87)",
    pinkishText: "#E5D2E3",
    /////////////////////////
    /* Design System Ports */ // -- Straight Port From AliceNet Design System
    /////////////////////////
    // TEXT //
    textPrimary: "rgba(255, 255, 255, 1)",
    textSecondary: "rgba(255, 255, 255, 0.7)",
    textDisabled: "rgba(255, 255, 255, 0.5)",
    // PRIMARY //
    primaryMain: "rgba(154, 235, 221, 1)",
    primaryDark: "rgba(107, 164, 154, 1)",
    primaryLight: "rgba(174, 239, 227, 1)",
    primaryContrast: "rgba(0, 0, 0, 87%)",
    primary8p: "rgba(154, 235, 221, 8%)",
    primary16p: "rgba(154, 235, 221, 16%)",
    primary12p: "rgba(154, 235, 221, 12%)",
    primary30p: "rgba(154, 235, 221, 30%)",
    primary50p: "rgba(154, 235, 221, 50%)",
    // SECONDARY //
    secondaryMain: "rgba(219, 9, 169, 1)",
    secondaryDark: "rgba(154, 7, 118, 1)",
    secondaryLight: "rgba(227, 59, 187, 1)",
    secondaryContrast: "rgba(255, 255, 255, 23%)",
    secondary8p: "rgba(220, 10, 170, 8%)",
    secondary16p: "rgba(220, 10, 170, 16%)",
    secondary12p: "rgba(220, 10, 170, 12%)",
    secondary30p: "rgba(220, 10, 170, 30%)",
    secondary50p: "rgba(220, 10, 170, 50%)",
    // Action
    actionActive: "rgba(255, 255, 255, 56%)",
    actionHover: "rgba(255, 255, 255, 8%)",
    actionSelected: "rgba(255, 255, 255, 16%)",
    actionDisabled: "rgba(255, 255, 255, 30%)",
    actionDisabledBg: "rgba(255, 255, 255, 12%)",
    actionFocus: "rgba(255, 255, 255, 12%)",
};

export const theme = createTheme({
    background: {
        tile: "",
        main: "#FF0000",
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
            lightPrimary: CustomColors.light_text_primary,
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "text", color: "primary" },
                    style: {
                        padding: "8px 22px",
                        textTransform: "none",
                        border: "none",
                        backgroundColor: CustomColors.primaryMain,
                        color: "#000",
                        borderRadius: 4,
                        "&:hover": {
                            color: CustomColors.textPrimary,
                            backgroundColor: CustomColors.primaryLight,
                        },
                        "&:active": {
                            backgroundColor: CustomColors.primaryContrast,
                            color: "#fff",
                        },
                        "&:disabled": {
                            backgroundColor: CustomColors.actionDisabledBg,
                            color: CustomColors.textDisabled,
                        },
                        fontFamily: "JetBrains",
                        fontWeight: 600,
                    },
                },
                {
                    props: { variant: "text", color: "secondary" },
                    style: {
                        textTransform: "none",
                        border: "none",
                        backgroundColor: CustomColors.secondaryMain,
                        color: "#fff",
                        borderRadius: 4,
                        "&:hover": {
                            color: CustomColors.textPrimary,
                            backgroundColor: CustomColors.secondaryLight,
                        },
                        "&:active": {
                            backgroundColor: CustomColors.secondaryContrast,
                            color: "#fff",
                        },
                        "&:disabled": {
                            backgroundColor: CustomColors.actionDisabledBg,
                            color: CustomColors.textDisabled,
                        },
                        fontFamily: "JetBrains",
                        fontWeight: 600,
                    },
                },
            ],
        },
    },
    fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"JetBrains"',
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(","),
});
