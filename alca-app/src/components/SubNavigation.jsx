import React from "react";
import { Box, Link } from "@mui/material";
import { useTheme } from "@emotion/react";
import { NavLink, useLocation } from "react-router-dom";
import { PAGES } from "pages/routes";

export function SubNavigation() {
    const location = useLocation();
    const theme = useTheme();

    function renderPages() {
        return PAGES.map((page, index) => {
            let padding;

            if (index === 0) {
                padding = "5px 0 0 5px";
            } else {
                padding = "0 5px 5px 0";
            }

            return (
                <Link
                    key={page.to}
                    to={page.to}
                    component={NavLink}
                    sx={{
                        color: page.to === location.pathname ? theme.palette.background.default : "#fff",
                        bgcolor: page.to === location.pathname ? theme.palette.primary.main : "#ffffff29",
                        display: "block",
                        fontWeight: 900,
                        textDecoration: 0,
                        padding: "10px 30px",
                        borderRadius: { xs: "5px", md: page.to === location.pathname ? "5px" : padding },
                        marginLeft: { md: "-5px" },
                        marginBottom: { xs: 1 },
                        fontSize: theme.typography.body1.fontSize,
                    }}
                >
                    {page.display}
                </Link>
            );
        });
    }

    return (
        <Box
            sx={{
                display: { xs: "block", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5px",
                marginTop: 5,
                marginBottom: 8,
                marginLeft: "5px",
            }}
        >
            {renderPages()}
        </Box>
    );
}
