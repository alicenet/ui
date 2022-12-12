import React, { useContext } from "react";
import { Box, Link } from "@mui/material";
import { useTheme } from "@emotion/react";
import { NavLink, useLocation } from "react-router-dom";
import { PAGES } from "pages/routes";
import { BalanceContext } from "alice-ui-common";
import { CountBubble } from "./CountBubble";

export function SubNavigation() {
    const location = useLocation();
    const theme = useTheme();

    const { positions = {} } = useContext(BalanceContext);

    function renderPositionCount(show) {
        if (!show) return <></>;

        return <CountBubble count={positions.staked.value.length} />;
    }

    function renderPages() {
        return PAGES.map((page, index) => {
            return (
                <Link
                    key={page.to}
                    to={page.to}
                    component={NavLink}
                    sx={{
                        color: page.to === location.pathname ? theme.palette.background.default : "white",
                        background:
                            page.to === location.pathname
                                ? `linear-gradient(
                                    180deg,
                                    ${theme.palette.primary.main} 43.53%,
                                    ${theme.palette.primary.dark} 96.31%
                                );`
                                : `linear-gradient(
                                    180deg, ${theme.palette.custom.elevation1} 0%,
                                    ${theme.palette.custom.elevation1} 100%
                                ), ${theme.palette.background.default};`,
                        display: "block",
                        fontFamily: theme.typography.fontFamily,
                        textDecoration: 0,
                        py: 1.5,
                        px: 4,
                        borderRadius: 1,
                        fontSize: theme.typography.body1.fontSize,
                        width: 1 / 2,
                        height: { lg: 42, md: "auto", sm: 42, xs: "auto" },
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {page.display}
                        {renderPositionCount(page.to === "/positions")}
                    </Box>
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
                        ${theme.palette.custom.elevation1} 0%,
                        ${theme.palette.custom.elevation1} 100%
                    ), ${theme.palette.background.default};`,
                    display: "flex",
                    borderRadius: 1,
                    minWidth: 8 / 16,
                }}
            >
                {renderPages()}
            </Box>
        </Box>
    );
}
