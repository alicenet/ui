import React, { useEffect, useState } from "react";
import {
    Box,
    Collapse,
    ListItemIcon,
    ListItemText,
    MenuItem as MUIMenuItem,
    MenuList,
    Typography
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

const EXPLORER_URL = process.env.REACT_APP_EXPLORER_URL;
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const ALICENET_URL = process.env.REACT_APP_ALICENET_URL;
const WHITE_PAPER_URL = process.env.REACT_APP_WHITE_PAPER_URL;

const WALLET_MAC_URL = process.env.REACT_APP_WALLET_MAC_URL;
const WALLET_LINUX_URL = process.env.REACT_APP_WALLET_LINUX_URL;
const WALLET_WINDOWS_URL = process.env.REACT_APP_WALLET_WINDOWS_URL;

const sections =
    [
        {
            label: "Block Explorer",
            location: EXPLORER_URL,
            displayCallback: ({ location, label }) =>
                <MenuItem key={`header-mobile-${label}`} location={location} label={label} blank />
        },
        {
            label: "About",
            location: ALICENET_URL,
            displayCallback: ({ location, label }) =>
                <MenuItem key={`header-mobile-${label}`} location={location} label={label} blank />
        },
        {
            label: "GitHub",
            location: GITHUB_URL,
            displayCallback: ({ location, label }) =>
                <MenuItem key={`header-mobile-${label}`} location={location} label={label} blank />
        },
        {
            label: "White Paper",
            location: WHITE_PAPER_URL,
            displayCallback: ({ location, label }) =>
                <MenuItem key={`header-mobile-${label}`} location={location} label={label} blank />
        },
    ];

const subSections =
    [
        {
            label: "iOS",
            location: WALLET_MAC_URL,
            icon: <FontAwesomeIcon icon={faApple} />,
            displayCallback: ({ location, label, icon }) =>
                <MenuItem key={`wallet-section-${label}`} icon={icon} location={location} label={label} blank />
        },
        {
            label: "Linux",
            location: WALLET_LINUX_URL,
            icon: <FontAwesomeIcon icon={faLinux} />,
            displayCallback: ({ location, label, icon }) =>
                <MenuItem key={`wallet-section-${label}`} icon={icon} location={location} label={label} blank />
        },
        {
            label: "Windows",
            location: WALLET_WINDOWS_URL,
            icon: <FontAwesomeIcon icon={faWindows} />,
            displayCallback: ({ location, label, icon }) =>
                <MenuItem key={`wallet-section-${label}`} icon={icon} location={location} label={label} blank />
        },
    ];

const WalletDropdown = () => {
    const [walletMenuOpen, setWalletMenuOpen] = useState(false);
    const [showWalletOptions, setShowWalletOptions] = useState(false);

    useEffect(() => {
        setShowWalletOptions(walletMenuOpen);
    }, [walletMenuOpen]);

    return (
        <MenuList disablePadding>
            <MUIMenuItem sx={{ paddingX: 4, paddingY: 2 }}>
                <ListItemText onClick={() => setWalletMenuOpen(prevState => !prevState)}>
                    <Typography fontSize="x-large">
                        Wallet Download
                        {walletMenuOpen ?
                            <ArrowDropUp /> :
                            <ArrowDropDown />
                        }
                    </Typography>
                </ListItemText>
            </MUIMenuItem>
            <Collapse in={showWalletOptions}>
                <Box paddingX={3}>
                    {subSections.map((section) => (
                        section.displayCallback(section)
                    ))}
                </Box>
            </Collapse>
        </MenuList>
    );
}

const MenuItem = ({ location, label, icon = null, blank = false }) => {
    const history = useHistory();
    return (
        <MUIMenuItem sx={{ paddingX: 4, paddingY: 2 }}>
            {
                icon &&
                <ListItemIcon sx={{ fontSize: "x-large" }}>
                    {icon}
                </ListItemIcon>
            }
            <ListItemText onClick={() => blank ? window.open(location, '_blank').focus() : history.push(location)}>
                <Typography fontSize="x-large">
                    {label}
                </Typography>
            </ListItemText>
        </MUIMenuItem>
    );
}

export function HeaderMobile() {
    return (
        <MenuList>
            {sections.map((section) => (
                section.displayCallback(section)
            ))}
        </MenuList>
    );
}
