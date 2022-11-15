import React from "react";
import { AppBar, Typography, MenuItem, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import { ConnectWeb3Button } from "./ConnectWeb3Button";
import ethAdapter from "eth-adapter";
export function Header() {
    useSelector((s) => s.ethAdapter); // Hook into reducer updates so equalize works properly against ethAdapter
    const { web3Connected } = { web3Connected: ethAdapter.connected };

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

                <MenuItem key={"wallet"} sx={{ pointerEvents: web3Connected ? "none" : "all" }}>
                    <ConnectWeb3Button />
                </MenuItem>
            </Toolbar>
        </AppBar>
    );
}
