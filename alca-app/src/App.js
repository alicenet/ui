import React from "react";

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Transactions, Positions } from "pages";
import { Debug } from "components";

// Config, etc
import { configuration } from "config/_config";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/system";
import { CssBaseline } from "@mui/material";
import { theme } from "theme/MUITheme";
import { BalanceContextProvider } from "alice-ui-common";
import ethAdapter from "eth-adapter";

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
        </ThemeProvider>
    );
}
