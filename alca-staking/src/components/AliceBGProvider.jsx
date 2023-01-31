import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { AliceHealthBlocks } from "logo_svg/AliceHealthBlocks";
import { AliceBlocksBasilFix } from "logo_svg/AliceBlocksBasilFix";

export function AliceBGProvider({ children }) {
    const theme = useTheme();

    console.log(theme.palette.primary);

    const useTracedLogo = false;

    const AccentCircle = () => {
        return (
            <Box
                style={{
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
                style={{
                    position: "absolute",
                    left: "-6.5vw",
                    top: "27vh",
                }}
            >
                {useTracedLogo ? <AliceHealthBlocks /> : <AliceBlocksBasilFix />}
            </Box>
        );
    };

    return (
        <Container
            maxWidth={false}
            style={{
                background: theme.palette.primary.tile,
                color: theme.palette.text.primary,
                display: "relative",
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
            }}
        >
            <AccentCircle />
            <AccentLogo />
            <Container>{children}</Container>
        </Container>
    );
}
