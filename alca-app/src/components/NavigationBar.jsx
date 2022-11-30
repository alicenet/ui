import React from "react";
import { Box, Toolbar, IconButton, Link, Menu, MenuItem, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@emotion/react";
import { configuration } from "config";
import { useSelector } from "react-redux";
import ethAdapter from "eth-adapter";
import { ConnectWeb3Button, HelpDropdown, Web3NetworkMenu } from "./index";
import { ReactComponent as AliceNetLogo } from "assets/alicenet-logo.svg";

export function NavigationBar() {
    const theme = useTheme();

    const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState(null);

    // Hook into reducer updates so equalize works properly against ethAdapter
    useSelector((s) => s.ethAdapter);

    const { web3Connected } = { web3Connected: ethAdapter.connected };

    const handleOpenNavMenu = (event) => {
        setMobileMenuAnchor(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setMobileMenuAnchor(null);
    };

    const menuButtonSx = {
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.secondary.secondary,
        fontSize: "14px",
        padding: "6px 16px",
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
    };

    return (
        <Container maxWidth="lg">
            <Toolbar disableGutters>
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
                        <MenuItem>
                            <Link
                                href={configuration.site.url_about}
                                {...configuration.site.href_props}
                                sx={{
                                    mx: configuration.site.webView.headerLinkSpacing,
                                    my: configuration.site.webView.headerHeight,
                                    display: "block",
                                    fontWeight: 900,
                                    textDecoration: 0,
                                }}
                            >
                                About AliceNet
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                href={configuration.site.url_blockExplorer}
                                {...configuration.site.href_props}
                                sx={{
                                    mx: configuration.site.webView.headerLinkSpacing,
                                    my: configuration.site.webView.headerHeight,
                                    display: "block",
                                    fontWeight: 900,
                                    textDecoration: 0,
                                }}
                            >
                                Block Explorer
                            </Link>
                        </MenuItem>
                    </Menu>
                </Box>

                <Box
                    sx={{
                        flexGrow: 1,
                        display: { xs: "none", md: "flex" },
                        alignItems: "center",
                    }}
                >
                    <Box mr={3}>
                        <AliceNetLogo />
                    </Box>

                    <Link
                        href={configuration.site.url_about}
                        {...configuration.site.href_props}
                        sx={{
                            color: theme.palette.secondary.darkText,
                            mx: configuration.site.webView.headerLinkSpacing,
                            my: configuration.site.webView.headerHeight,
                            display: "block",
                            textDecoration: 0,
                        }}
                    >
                        About AliceNet
                    </Link>
                    <Link
                        href={configuration.site.url_blockExplorer}
                        {...configuration.site.href_props}
                        sx={{
                            color: theme.palette.secondary.darkText,
                            mx: configuration.site.webView.headerLinkSpacing,
                            my: configuration.site.webView.headerHeight,
                            display: "block",
                            textDecoration: 0,
                        }}
                    >
                        Block Explorer
                    </Link>
                </Box>

                <Box sx={{ display: "flex" }}>
                    <HelpDropdown menuButtonSx={menuButtonSx} />
                    <Web3NetworkMenu menuButtonSx={menuButtonSx} />
                </Box>

                <Box
                    sx={{
                        pointerEvents: web3Connected ? "none" : "all",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        ml: 2,
                    }}
                >
                    <ConnectWeb3Button menuButtonSx={menuButtonSx} />
                </Box>
            </Toolbar>
        </Container>
    );
}
