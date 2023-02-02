import React from "react";
import { useSelector } from "react-redux";

// Components
import { AliceBGProvider, InfoSplash, NavHeader, StakingBox } from "./components";

// Pages
import { ThemeProvider } from "@mui/system";
import { theme } from "theme/MUITheme";

// Page imports
import { configuration } from "config";
import { Grid } from "@mui/material";

export default function App() {
    const { reduxState } = useSelector((s) => ({
        reduxState: s,
    }));

    // Apply site-wide configs
    React.useEffect(() => {
        console.log(`MUI THEME:`, theme);
        document.title = configuration.site.title;
    }, []);

    // Setup Debug Print State Key
    React.useEffect(() => {
        const printOnD = (e) => {
            if (e.key === "d") {
                console.log(reduxState);
            }
        };
        document.addEventListener("keydown", printOnD);
        return () => document.removeEventListener("keydown", printOnD);
    });

    return (
        <ThemeProvider theme={theme}>
            <AliceBGProvider>
                <Grid container>
                    <Grid xs={12}>
                        <NavHeader />
                    </Grid>
                    <Grid xs={6} px={8}>
                        <InfoSplash />
                    </Grid>
                    <Grid xs={6} px={8}>
                        <StakingBox />
                    </Grid>
                </Grid>
            </AliceBGProvider>
        </ThemeProvider>
    );
}
