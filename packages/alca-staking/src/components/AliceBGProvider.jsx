import { useTheme } from "@emotion/react";
import { Box, useMediaQuery } from "@mui/material";
import { Container } from "@mui/system";
import { AliceBlocksBasilFix } from "logo_svg/AliceBlocksBasilFix";

export function AliceBGProvider({ children }) {
    const theme = useTheme();
    const matches = useMediaQuery("(min-width:600px)");

    console.log(theme.palette.primary);

    const AccentCircle = () => {
        return (
            <Box
                sx={{
                    position: "absolute",
                    top: "-7.91%",
                    left: "-29.73%",
                    width: "98.2%",
                    height: "173.1%",
                    background: "linear-gradient(45deg, rgba(94,0,73,255), rgba(0,0,0,0) 75%, rgba(0, 0, 0, 0))", // linear-gradient(245deg, rgba(35,3,39, 0), rgba(94,0,73,255))
                    borderRadius: "100%",
                }}
            ></Box>
        );
    };

    const AccentLogo = () => {
        return (
            <Box
                sx={{
                    position: "absolute",
                    left: "0px",
                    bottom: "0px",
                    height: matches ? "50%" : "50%",
                    width: matches ? "50%" : "100%",
                    // background: "green",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        top: "22.5%",
                        left: "-15%",
                    }}
                >
                    <AliceBlocksBasilFix />
                </Box>
            </Box>
        );
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                background: theme.palette.primary.tile,
                color: theme.palette.text.primary,
                position: "relative",
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
            }}
        >
            <AccentCircle />
            <AccentLogo />

            <Container
                maxWidth={"xl"}
                sx={{
                    position: "relative",
                    height: "100%",
                    width: "100%",
                }}
            >
                {children}
            </Container>
        </Container>
    );
}
