/* eslint no-unused-vars: 0 */ // --> OFF
/* eslint no-undef: 0 */ // --> OFF

import { useTheme } from "@emotion/react";
import { TabContext, TabList } from "@mui/lab";
import { Box, Container, Snackbar, Tab } from "@mui/material";
import { Page, SnackbarMessage, SubNavigation } from "components";
import { useContext, useState } from "react";
import { BalanceContext } from "alice-ui-common";
import { getActiveTabStyles, getBoxStyles, getDefaultTabStyles } from "./localStyles";
import { AboutTabPanel } from "./panels/About";
import { SwapAlcbPanel } from "./panels/SwapAlcb";

export function ALCB() {
    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState("1");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage] = useState("");

    const handleTabChange = (_, newValue) => {
        setCurrentTab(newValue);
    };

    function popConfirmationModal() {}

    const defaultTabClasses = getDefaultTabStyles();
    const currentClasses = getActiveTabStyles(theme);

    let alcbAboutClasses = { ...defaultTabClasses };
    let alcbTransferClasses = { ...defaultTabClasses };
    let alcbDepositClasses = { ...defaultTabClasses };

    if (currentTab === "1") {
        alcbAboutClasses = { ...currentClasses, ...alcbTransferClasses };
    }
    if (currentTab === "2") {
        alcbTransferClasses = { ...currentClasses, ...alcbTransferClasses };
    }
    if (currentTab === "3") {
        alcbDepositClasses = { ...currentClasses, ...alcbTransferClasses };
    }

    return (
        <Page>
            <Container maxWidth="lg">
                <SubNavigation />

                <TabContext value={currentTab}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }} pb={0.5}>
                        <TabList
                            onChange={handleTabChange}
                            textColor={theme.palette.background.default}
                            indicatorColor={theme.palette.background.default}
                        >
                            <Tab label={"About ALCB"} value="1" sx={alcbAboutClasses} />
                            <Tab label={"Swap ALCB"} value="2" sx={{ ...alcbTransferClasses, ml: 2 }} />
                            {/* <Tab label={"Bridge ALCB"} value="3" sx={{ ...alcbDepositClasses, ml: 2 }} /> */}
                        </TabList>
                    </Box>

                    <AboutTabPanel />
                    <SwapAlcbPanel />
                </TabContext>
            </Container>

            <Snackbar
                sx={{ mb: 10 }}
                open={snackbarOpen}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                autoHideDuration={7500}
                onClose={() => {
                    setSnackbarOpen(false);
                }}
            >
                <Box>
                    <SnackbarMessage status={snackbarMessage.status} message={snackbarMessage.message} />
                </Box>
            </Snackbar>
        </Page>
    );
}
