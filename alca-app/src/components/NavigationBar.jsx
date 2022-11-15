import React from "react";
import { Box, Toolbar, IconButton, Link, Menu, MenuItem, Container, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@emotion/react";
import { configuration } from "config/_config";
import { NavLink, useLocation } from "react-router-dom";
import { PAGES } from "pages/routes";
import { useSelector } from "react-redux";
import { ConnectWeb3Button } from "./ConnectWeb3Button";
import ethAdapter from "eth-adapter";
import { KeyboardArrowDown } from "@mui/icons-material";

export function NavigationBar() {
    const location = useLocation();
    const theme = useTheme();

    const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState(null);
    const [networkMenuAnchor, setNetworkMenuAnchor] = React.useState(null);
    const open = Boolean(networkMenuAnchor);

    // Hook into reducer updates so equalize works properly against ethAdapter
    useSelector((s) => s.ethAdapter);

    const { web3Connected } = { web3Connected: ethAdapter.connected };

    const handleOpenNavMenu = (event) => {
        setMobileMenuAnchor(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setMobileMenuAnchor(null);
    };

    const handleClick = (event) => {
        console.log("ok");
        setNetworkMenuAnchor(event.currentTarget);
    };
    const handleClose = () => {
        setNetworkMenuAnchor(null);
    };

    console.log(networkMenuAnchor);

    return (
        <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ marginBottom: 8 }}>
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
                        anchorEl={mobileMenuAnchor}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(mobileMenuAnchor)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: "block", md: "none" },
                        }}
                    >
                        {PAGES.map((page) => (
                            <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                <Link
                                    to={page.to}
                                    component={NavLink}
                                    sx={{
                                        textAlign: "center",
                                    }}
                                >
                                    {page.display}
                                </Link>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                <Box
                    sx={{
                        flexGrow: 1,
                        display: { xs: "none", md: "flex" },
                        alignItems: "center",
                    }}
                >
                    {PAGES.map((page) => (
                        <Link
                            key={page.to}
                            to={page.to}
                            component={NavLink}
                            sx={{
                                mx: configuration.site.webView.headerLinkSpacing,
                                my: configuration.site.webView.headerHeight,
                                color: page.to === location.pathname ? theme.palette.primary.main : "#fff",
                                display: "block",
                                fontWeight: 900,
                                textDecoration: 0,
                            }}
                        >
                            {page.display}
                        </Link>
                    ))}
                </Box>

                <Box>
                    <Button
                        id="network-button"
                        aria-controls={open ? "network-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        sx={{
                            fontSize: "14px",
                            padding: "1px 10px",
                            borderRadius: 1,
                            color: theme.palette.background.main,
                            display: "flex",
                            alignItems: "center",
                            marginRight: 1,
                        }}
                    >
                        Ethereum
                        <KeyboardArrowDown />
                    </Button>
                    <Menu
                        id="network-menu"
                        anchorEl={networkMenuAnchor}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "network-button",
                        }}
                    >
                        <MenuItem onClick={handleClose}>Ethereum</MenuItem>
                        <MenuItem onClick={handleClose}>AliceNet</MenuItem>
                    </Menu>
                </Box>

                <Box
                    sx={{
                        fontSize: "14px",
                        padding: "3px 15px",
                        borderRadius: 1,
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.background.default,
                        pointerEvents: web3Connected ? "none" : "all",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                >
                    <ConnectWeb3Button />
                    <KeyboardArrowDown />
                </Box>
            </Toolbar>
        </Container>
    );
}
