import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/system";

import { theme } from "theme/MUITheme";
import { Container } from "@mui/material";

import { Transactions, Positions } from "pages";
import { configuration } from "config/_config";

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

        //test
    });

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route path="transactions" element={<Transactions />} />
                <Route path="positions" element={<Positions />} />
            </Route>
        )
    );

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={[{ mt: 10 }]}>
                <RouterProvider router={router} />
            </Container>
        </ThemeProvider>
    );
}
