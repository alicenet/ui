import React from "react";
import { ListItemIcon, ListItemText, MenuItem as MUIMenuItem, MenuList, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EXPLORER_URL = process.env.REACT_APP_EXPLORER_URL;
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const ALICENET_URL = process.env.REACT_APP_ALICENET_URL;
const WHITE_PAPER_URL = process.env.REACT_APP_WHITE_PAPER_URL;

const sections = [
    {
        label: "Block Explorer",
        location: EXPLORER_URL,
        displayCallback: ({ location, label }) => (
            <MenuItem key={`header-mobile-${label}`} location={location} label={label} blank />
        ),
    },
    {
        label: "About",
        location: ALICENET_URL,
        displayCallback: ({ location, label }) => (
            <MenuItem key={`header-mobile-${label}`} location={location} label={label} blank />
        ),
    },
    {
        label: "GitHub",
        location: GITHUB_URL,
        displayCallback: ({ location, label }) => (
            <MenuItem key={`header-mobile-${label}`} location={location} label={label} blank />
        ),
    },
    {
        label: "White Paper",
        location: WHITE_PAPER_URL,
        displayCallback: ({ location, label }) => (
            <MenuItem key={`header-mobile-${label}`} location={location} label={label} blank />
        ),
    },
];

const MenuItem = ({ location, label, icon = null, blank = false }) => {
    const navigate = useNavigate();
    return (
        <MUIMenuItem sx={{ paddingX: 4, paddingY: 2 }}>
            {icon && <ListItemIcon sx={{ fontSize: "x-large" }}>{icon}</ListItemIcon>}
            <ListItemText onClick={() => (blank ? window.open(location, "_blank").focus() : navigate(location))}>
                <Typography fontSize="x-large">{label}</Typography>
            </ListItemText>
        </MUIMenuItem>
    );
};

export function HeaderMobile() {
    return <MenuList>{sections.map((section) => section.displayCallback(section))}</MenuList>;
}
