import React from "react";

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Transactions, Positions } from "pages";
import { Debug } from "components";

import { ThemeProvider } from "@mui/system";
import { CssBaseline, Box } from "@mui/material";
import { theme } from "alice-mui-provider";
import { BalanceContextProvider } from "alice-ui-common";

import ethAdapter from "eth-adapter";
import { LanderHelpModal } from "components/LanderHelpModal";
import { configuration } from "config/_config";

export default function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Transactions />} />
                <Route path="positions" element={<Positions />} />
            </>
        )
    );

    const AppEntry = () => (
        <ThemeProvider theme={theme}>
            <BalanceContextProvider ethAdapter={ethAdapter}>
                <CssBaseline enableColorScheme />
                <Debug />
                <RouterProvider router={router} />
            </BalanceContextProvider>
            <LanderHelpModal />
        </ThemeProvider>
    );

    const HoldOff = () => (
        <Box sx={{ display: "flex", width: "100%", height: "100%", justifyContent: "center", mt: 4 }}>
            <a href="https://alice.net" rel="no-opener no-referrer">
                https://alice.net
            </a>
        </Box>
    );

    // Production, require isLive
    if (configuration.site.environment.isProduction) {
        return configuration.site.isLive ? <AppEntry /> : <HoldOff />;
    } else {
        return <AppEntry />;
    }
}
