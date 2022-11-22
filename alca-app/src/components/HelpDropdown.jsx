import React from "react";
import { Button, Box, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { configuration } from "config/_config";

/**
 * @prop { Function } onHelpModalClick - Function to call on "Help Modal" menu item click
 * @returns
 */
export function HelpDropdown({ menuButtonSx }) {
    const [open, setOpen] = React.useState(false);
    const anchorElement = React.useRef();

    return (
        <Box>
            <Button
                disableRipple
                sx={{ ...menuButtonSx, mr: 2, display: "flex", justifyContent: "space-between" }}
                ref={anchorElement}
                id="help-button"
                aria-controls={open ? "help-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={() => setOpen((s) => !s)}
            >
                Help
                <KeyboardArrowDownIcon sx={{ ml: 1 }} />
            </Button>

            <Menu
                sx={{ mt: 1 }}
                id="help-menu"
                anchorEl={anchorElement.current}
                open={open}
                onClose={() => setOpen(false)}
                MenuListProps={{
                    "aria-labelledby": "help-button",
                }}
            >
                <MenuItem onClick={() => {}}>Help Modal</MenuItem>
                <MenuItem
                    onClick={() => {
                        window.open(configuration.site.url_documentation, "_blank");
                    }}
                >
                    Documentation
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        window.open(configuration.site.url_termsOfService, "_blank");
                    }}
                >
                    Terms Of Service
                </MenuItem>
            </Menu>
        </Box>
    );
}
