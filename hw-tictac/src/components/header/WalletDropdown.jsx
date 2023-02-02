import React, { useState } from "react";
import { Box, Link, Menu, MenuItem, useTheme } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";

const WALLET_MAC_URL = process.env.REACT_APP_WALLET_MAC_URL;
const WALLET_LINUX_URL = process.env.REACT_APP_WALLET_LINUX_URL;
const WALLET_WINDOWS_URL = process.env.REACT_APP_WALLET_WINDOWS_URL;

export const WalletDropdown = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Link
                display="flex"
                color="white"
                sx={{ cursor: "pointer", "&:hover": { color: theme.palette.primary.main } }}
                underline="none"
                onClick={handleClick}
            >
                Wallet Download
                {open ? <ArrowDropUp /> : <ArrowDropDown />}
            </Link>
            <Menu
                PaperProps={{ sx: { marginTop: 2 } }}
                disableAutoFocusItem
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                id="dropdown-wallet-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    sx={{ display: "flex", gap: 1, paddingX: 5 }}
                    onClick={() => {
                        window.open(WALLET_MAC_URL, '_blank').focus();
                        handleClose();
                    }}
                >
                    <FontAwesomeIcon icon={faApple} />
                    iOS
                </MenuItem>
                <MenuItem
                    sx={{ display: "flex", gap: 1, paddingX: 5 }}
                    onClick={() => {
                        window.open(WALLET_LINUX_URL, '_blank').focus();
                        handleClose();
                    }}
                >
                    <FontAwesomeIcon icon={faLinux} />
                    Linux
                </MenuItem>
                <MenuItem
                    sx={{ display: "flex", gap: 1, paddingX: 5 }}
                    onClick={() => {
                        window.open(WALLET_WINDOWS_URL, '_blank').focus();
                        handleClose();
                    }}
                >
                    <FontAwesomeIcon icon={faWindows} />
                    Windows
                </MenuItem>
            </Menu>
        </Box>
    );

};

