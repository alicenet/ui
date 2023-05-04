import React from "react";
import { Container, Box } from "@mui/material";
import { Copyright, NavigationBar } from "./components";

// Pages
import { Home } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_ACTIONS } from "redux/actions";
import { ThemeProvider } from "@mui/system";

import { theme } from "theme/MUITheme";

// Page imports
// import { PageOne } from "pages";
import { configuration } from "config";

export default function App() {
    const dispatch = useDispatch();
    const { currentPage, setPage, reduxState } = useSelector((s) => ({
        currentPage: s.application.activePage,
        setPage: (page) => dispatch(APPLICATION_ACTIONS.setActivePage(page)),
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

    /* Page Configuration */
    const pages = [
        // {
        //     name: "PAGE_ONE",
        //     display: "Page 1",
        //     render: PageOne,
        // },
    ];

    const navigate = (page) => {
        setPage(page);
    };

    const renderPage = () => {
        for (let page of pages) {
            if (currentPage === page.name) {
                return <page.render />;
            }
        }
        return <Home />;
    };

    return (
        <ThemeProvider theme={theme}>
            <NavigationBar pages={pages} navigate={navigate} />
            <Container maxWidth="lg">{renderPage()}</Container>
            <Box sx={{ my: 4 }}>
                <Copyright />
            </Box>
        </ThemeProvider>
    );
}
