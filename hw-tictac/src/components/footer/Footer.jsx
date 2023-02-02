import React from "react";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Box, styled, Typography, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuDivider } from "components";

const ALICENET_URL = process.env.REACT_APP_ALICENET_URL;

const FontAwesomeHoveredIcon = styled(FontAwesomeIcon)(({ theme }) => ({
    cursor: "pointer",
    '&:hover': {
        color: theme.palette.primary.main,
    },
}));

export function Footer() {

    const theme = useTheme();

    return (

        <Box
            display="flex"
            justifyContent="space-between"
            paddingY={4}
            gap={3}
            sx={{
                flexDirection: { xs: "column", md: "row" },
                fontSize: { xs: "larger", md: "inherit" },
                paddingX: { xs: 2, md: 0 }
            }}
        >

            <Box display="flex" gap={2} alignItems="center">

                <span>Follow us on:</span>
                <FontAwesomeHoveredIcon icon={faTwitter} size="lg" />
                <FontAwesomeHoveredIcon icon={faDiscord} size="lg" />

            </Box>

            <Box display="flex" sx={{ flexDirection: { xs: "column", md: "row" }, gap: { xs: 0, md: 1.5 } }}>

                <Typography
                    onClick={() => window.open(ALICENET_URL, '_blank').focus()}
                    sx={{ cursor: "pointer", "&:hover": { color: theme.palette.primary.main } }}
                    variant="span"
                >
                    About
                </Typography>

                <MenuDivider />

                <Typography
                    onClick={() => window.open(`${ALICENET_URL}/terms-of-use`, '_blank').focus()}
                    sx={{ cursor: "pointer", "&:hover": { color: theme.palette.primary.main } }}
                    variant="span"
                >
                    Legal
                </Typography>

                <MenuDivider />

                <Typography
                    onClick={() => window.open(`${ALICENET_URL}/terms-of-use`, '_blank').focus()}
                    sx={{ cursor: "pointer", "&:hover": { color: theme.palette.primary.main } }}
                    variant="span"
                >
                    Terms of service
                </Typography>

                <MenuDivider />

                <Typography variant="span" sx={{ opacity: 0.7 }} paddingTop={{ xs: 2, md: 0 }}>
                    AliceNet Inc © {new Date().getFullYear()}
                </Typography>

            </Box>

        </Box>

    );

}
