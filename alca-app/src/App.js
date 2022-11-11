import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@mui/system";

import { theme } from "theme/MUITheme";
import { Container, CssBaseline } from "@mui/material";

import { Transactions, Positions } from "pages";
import Debug from "components/Debug";

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
            <CssBaseline enableColorScheme />

            <Container maxWidth="lg" sx={[{ mt: 10 }]}>
                <Debug />
                <RouterProvider router={router} />
            </Container>
        </ThemeProvider>
    );
}
