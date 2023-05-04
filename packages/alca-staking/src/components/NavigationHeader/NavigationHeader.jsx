import { Button, Link, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { AliceTriangle } from "logo_svg";

export function NavHeader() {
    const theme = useTheme();

    const flexRowJustifyLeftAlignCenterMaxHeight = {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    };

    const AliceNetLogo = () => (
        <Box {...flexRowJustifyLeftAlignCenterMaxHeight} alignItems={"center"} flexGrow={"0"}>
            <AliceTriangle />
            <Box ml={"13px"}>
                <h1>AliceNet</h1>
            </Box>
        </Box>
    );

    const HeaderLink = ({ text, target }) => (
        <Link
            sx={{
                color: theme.palette.text.secondary,
                padding: "9px 16px",
                textDecoration: "none",
                "&:hover": { cursor: "pointer", textDecoration: "underline" },
            }}
        >
            {text}
        </Link>
    );

    const HeaderLinks = () => (
        <Box {...flexRowJustifyLeftAlignCenterMaxHeight} ml={"16px"}>
            <HeaderLink text="About" />
            <HeaderLink text="Block Explorer" />
            <HeaderLink text="Advanced Staking UI" />
        </Box>
    );

    const ConnectWalletButton = () => <Button color="primary">Connect Wallet</Button>;

    return (
        <Box height={56} mt={"12px"} display="flex" justifyContent={"space-between"} pr={"48px"}>
            <Box display="flex" alignItems={"center"}>
                <AliceNetLogo />
                <HeaderLinks />
            </Box>
            <Box display="flex" alignItems={"center"}>
                <ConnectWalletButton />
            </Box>
        </Box>
    );
}
