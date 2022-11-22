import React from "react";

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Transactions, Positions } from "pages";
import { Debug } from "components";

import { ThemeProvider } from "@mui/system";
import { CssBaseline } from "@mui/material";
import { theme } from "theme/MUITheme";
import { BalanceContextProvider } from "alice-ui-common";

import ethAdapter from "eth-adapter";
import { LanderHelpModal } from "components/LanderHelpModal";

export default function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Transactions />} />
                <Route path="positions" element={<Positions />} />
            </>
        )
    );

    return (
        <ThemeProvider theme={theme}>
            <BalanceContextProvider ethAdapter={ethAdapter}>
                <CssBaseline enableColorScheme />
                <Debug />
                <RouterProvider router={router} />
            </BalanceContextProvider>
            <LanderHelpModal />
        </ThemeProvider>
    );
}
