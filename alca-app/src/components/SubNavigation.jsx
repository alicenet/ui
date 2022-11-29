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
            const padding = index === 0 ? "5px 0 0 5px" : "0 5px 5px 0";

            return (
                <Link
                    key={page.to}
                    to={page.to}
                    component={NavLink}
                    sx={{
                        color: page.to === location.pathname ? theme.palette.background.default : "#fff",
                        background:
                            page.to === location.pathname
                                ? `linear-gradient(
                                    180deg,
                                    ${theme.palette.primary.main} 43.53%,
                                    ${theme.palette.primary.dark} 96.31%
                                );`
                                : `linear-gradient(
                                    180deg, ${theme.palette.dark.elevation1} 0%,
                                    ${theme.palette.dark.elevation1} 100%
                                ), ${theme.palette.dark.main};`,
                        display: "block",
                        fontFamily: theme.typography.fontFamily,
                        textDecoration: 0,
                        padding: "12px 30px",
                        borderRadius: { xs: "5px", md: page.to === location.pathname ? "5px" : padding },
                        fontSize: theme.typography.body1.fontSize,
                        width: 1 / 2,
                        textAlign: "center",
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
                marginTop: 5,
                marginBottom: 8,
            }}
        >
            <Box
                sx={{
                    background: `linear-gradient(
                        180deg,
                        ${theme.palette.dark.elevation1} 0%,
                        ${theme.palette.dark.elevation1} 100%
                    ), ${theme.palette.dark.main};`,
                    display: "flex",
                    borderRadius: 1,
                    minWidth: 7 / 14,
                }}
            >
                {renderPages()}
            </Box>
        </Box>
    );
}
