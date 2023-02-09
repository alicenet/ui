import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Box, Container, Drawer, IconButton, Link, Toolbar, useTheme } from "@mui/material";
import { Menu as MenuIcon } from '@mui/icons-material';
import { HeaderMobile } from "./HeaderMobile";
import { Logo, MenuDivider } from "components";

const EXPLORER_URL = process.env.REACT_APP_EXPLORER_URL;
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const ALICENET_URL = process.env.REACT_APP_ALICENET_URL;
const WHITE_PAPER_URL = process.env.REACT_APP_WHITE_PAPER_URL;

const MenuLink = ({ location, label, blank = false }) => {
    const history = useHistory();
    const theme = useTheme();

    return (
        <Link
            color="white"
            underline="none"
            sx={{ cursor: "pointer", "&:hover": { color: theme.palette.primary.main } }}
            onClick={() => blank ? window.open(location, '_blank').focus() : history.push(location)}
        >
            {label}
        </Link>
    );
};

const sections =
    [
        {
            label: "Block Explorer",
            location: EXPLORER_URL,
            displayCallback: ({ location, label }) => <MenuLink location={location} label={label} blank />
        },
        {
            label: "About",
            location: ALICENET_URL,
            displayCallback: ({ location, label }) => <MenuLink location={location} label={label} blank />
        },
        {
            label: "GitHub",
            location: GITHUB_URL,
            displayCallback: ({ location, label }) => <MenuLink location={location} label={label} blank />
        },
        {
            label: "White Paper",
            location: WHITE_PAPER_URL,
            displayCallback: ({ location, label }) => <MenuLink location={location} label={label} blank />
        },
    ];

export function Header() {
    const theme = useTheme();
    const history = useHistory();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>

            <AppBar
                component="nav"
                position="sticky"
                sx={{ backgroundImage: "none", opacity: 0.9, boxShadow: "none" }}
            >

                <Container disableGutters sx={{ paddingY: 1 }}>

                    <Toolbar disableGutters>

                        <Link
                            color="white"
                            underline="none"
                            sx={{ cursor: "pointer", "&:hover": { color: theme.palette.primary.main } }}
                            onClick={() => history.push(`/`)}
                        >
                            <Logo />
                        </Link>

                        <Box justifyContent="end" flexGrow={1} sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon fontSize="large" />
                            </IconButton>
                        </Box>

                        <Box gap={2} justifyContent="end" flexGrow={1} sx={{ display: { xs: "none", md: "flex" } }}>
                            {sections.map((section, index, { length }) => (
                                <React.Fragment key={`menu-link-${index}`}>
                                    {section.displayCallback(section)}
                                    {index + 1 < length && <MenuDivider />}
                                </React.Fragment>
                            ))}
                        </Box>

                    </Toolbar>

                </Container>

            </AppBar>

            <Box component="nav">

                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    PaperProps={{ sx: { minWidth: "70%" } }}
                    sx={{ display: { sm: "block", md: "none" } }}
                >

                    <HeaderMobile />

                </Drawer>

            </Box>

        </>
    );

}
