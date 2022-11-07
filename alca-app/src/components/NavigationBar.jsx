import React from "react";
import { AppBar, Typography, MenuItem, Grid, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { ConnectWeb3Button } from "./ConnectWeb3Button";
import { configuration } from "config/_config";
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
            <Toolbar disableGutters sx={[{ padding: 2 }]}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" component="h1" mb={1}>
                        Staking
                    </Typography>
                    <Typography variant="body1" component="h2" mb={1}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor aliqua.
                    </Typography>
                </Typography>

                <MenuItem key={"wallet"} onClick={handleCloseNavMenu} sx={{ pointerEvents: web3Connected ? "none" : "all" }}>
                    <ConnectWeb3Button />
                </MenuItem>
            </Toolbar>
        </AppBar>
    );
}
