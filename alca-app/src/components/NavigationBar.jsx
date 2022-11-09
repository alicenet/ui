import React from "react";
import { Box, Toolbar, IconButton, Link, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@emotion/react";
import { configuration } from "config/_config";
import { NavLink, useLocation } from "react-router-dom";
import { PAGES } from "pages/routes";

export function NavigationBar() {
    const location = useLocation();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const theme = useTheme();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
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

                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, mt: 2 }}>
                    {PAGES.map((page) => (
                        <Link
                            key={page.to}
                            to={page.to}
                            component={NavLink}
                            sx={{
                                mx: configuration.site.webView.headerLinkSpacing,
                                my: configuration.site.webView.headerHeight,
                                color: page.to === location.pathname ? theme.palette.secondary.main : theme.palette.common.black,
                                display: "block",
                                fontWeight: 900,
                                borderBottom: 2,
                                borderRadius: 0,
                                paddingX: 0,
                                paddingY: 1,
                                marginY: 0,
                                marginLeft: 0,
                                marginRight: 5,
                                textDecoration: 0,
                            }}
                        >
                            {page.display}
                        </Link>
                    ))}
                </Box>
            </Toolbar>
        </>
    );
}
