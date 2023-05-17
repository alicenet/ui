import React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { ConnectWeb3Button } from "./ConnectWeb3Button";
import { configuration } from "config";
import ethAdapter from "eth-adapter";

export function NavigationBar({ navigate, pages }) {
    useSelector((s) => s.ethAdapter); // Hook into reducer updates so equalize works properly against ethAdapter
    const { web3Connected } = { web3Connected: ethAdapter.connected };
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const { currentPage } = useSelector((state) => ({ currentPage: state.application.activePage }));

    const theme = useTheme();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar enableColorOnDark position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>{configuration.site.navIcon}</Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={() => navigate("HOME")}
                        sx={{
                            cursor: "pointer",
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        {configuration.site.navTitle}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography onClick={() => navigate(page.name)} textAlign="center">
                                        {page.display}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>{configuration.site.navIcon}</Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={() => navigate("HOME")}
                        sx={{
                            cursor: "pointer",
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => navigate(page.name) && handleCloseNavMenu}
                                sx={{
                                    mx: configuration.site.webView.headerLinkSpacing,
                                    my: configuration.site.webView.headerHeight,
                                    color:
                                        page.name === currentPage
                                            ? theme.palette.secondary.main
                                            : theme.palette.common.white,
                                    display: "block",
                                    fontWeight: 900,
                                }}
                            >
                                {page.display}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <MenuItem
                            key={"wallet"}
                            onClick={handleCloseNavMenu}
                            sx={{ pointerEvents: web3Connected ? "none" : "all" }}
                        >
                            <ConnectWeb3Button />
                        </MenuItem>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
