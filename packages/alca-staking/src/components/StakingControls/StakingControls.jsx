import { FormControlLabel, Link, styled, Switch, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { fancyToggleStyles } from "./FancyToggleStyles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { StakingBottomBox } from "./StakingBottomBox";
import { UnstakingBottomBox } from "./UnstakingBottomBox";

import { Transition } from "react-transition-group";
import { useRef } from "react";

const defaultStyle = {
    transition: `all 450ms ease-in-out `,
    position: "absolute",
    opacity: 0,
    left: "0%",
};

const stakeTransitionStyles = {
    entering: { opacity: 0, left: "-100%" },
    entered: { opacity: 1, left: "5%" },
    exiting: { opacity: 1, left: "0%" },
    exited: { opacity: 0, left: "-100%" },
};

const unstakeTransitionStyles = {
    entering: { opacity: 0, left: "100%" },
    entered: { opacity: 1, left: "5%" },
    exiting: { opacity: 1, left: "0%" },
    exited: { opacity: 0, left: "100%" },
};

const MaterialUISwitch = styled(Switch)(({ theme }) => ({ ...fancyToggleStyles }));

function FancyToggle({ checked, onChange }) {
    return <FormControlLabel control={<MaterialUISwitch disableRipple checked={checked} onChange={onChange} />} />;
}

export function StakingControls() {
    const theme = useTheme();
    const [isUnstake, setIsUnstake] = useState(false);

    // NodeRefs
    const unstakeNodeRef = useRef(null);
    const stakeNodeRef = useRef(null);

    // Staking Amount
    const [stakeAmount, setStakeAmount] = useState(0);

    const ALCA_BALANCE = "13756.50";

    const setMax = () => setStakeAmount(ALCA_BALANCE);

    function TopBox() {
        return (
            <Box>
                <Typography
                    sx={{ fontFamily: "JetBrains", fontSize: ".75rem", color: theme.palette.text.lightPrimary }}
                >
                    Available To Stake
                </Typography>
                <Typography
                    sx={{ fontFamily: "JetBrains", fontSize: "1.5rem", color: theme.palette.text.lightPrimary }}
                >
                    {ALCA_BALANCE} ALCA
                </Typography>
            </Box>
        );
    }

    function BoxIcon() {
        return (
            <Box
                sx={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    left: "47.5%",
                    top: "18.5%",
                    zIndex: 2,
                    width: "34px",
                    height: "34px",
                    background: "#FBF5FF",
                    boxShadow: "0px 14px 8px -1px rgba(0, 0, 0, 0.3)",
                    borderRadius: "8.5px",
                    color: "rgba(0,0,0,54%)",
                }}
            >
                {isUnstake ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
            </Box>
        );
    }

    return (
        <Box mt={"50px"}>
            <Box sx={{ display: "flex", flexFlow: "column", alignItems: "center", ml: "24px" }}>
                <FancyToggle
                    checked={isUnstake}
                    onChange={function () {
                        setIsUnstake((s) => !s);
                    }}
                />
            </Box>
            <Box sx={{ display: "flex", mt: "26px", alignItems: "center", justifyContent: "center" }}>
                <Typography
                    textAlign={"center"}
                    fontSize={"12px"}
                    sx={{ color: theme.palette.text.secondary, fontFamily: "JetBrains" }}
                >
                    Interacting With 0x0{" "}
                    <Link
                        sx={{
                            ml: "2px",
                            color: theme.palette.secondary.main,
                            fontWeight: 600,
                            textDecoration: "none",
                            "&:hover": { cursor: "pointer", textDecoration: "underline" },
                        }}
                    >
                        Etherscan
                        <OpenInNewIcon fontSize={"12px"} sx={{ position: "relative", top: "2px", left: "4px" }} />
                    </Link>
                </Typography>
            </Box>

            {/* /**Stake Panel */}
            <Box
                sx={{
                    position: "relative",
                    mt: "12px",
                    height: "442px",
                    background: "#FADEFF",
                    borderRadius: "18px",
                    pt: "16px",
                }}
            >
                <BoxIcon />

                {/* Upper Box Content */}
                <Box sx={{ pl: "28px" }}>
                    <TopBox />
                </Box>

                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        height: "81%",
                        top: "32px",
                        background:
                            " linear-gradient(180deg, rgba(165, 198, 255, 0.14) 0%, rgba(165, 198, 255, 0.14) 100%), #191119;",
                        borderRadius: "18px",
                        px: "38px",
                        py: "32px",
                        boxSizing: "border-box",
                        overflow: "hidden",
                    }}
                >
                    {/* Lower Box Content */}
                    <Box sx={{ height: "100%", width: "100%" }}>
                        <Transition nodeRef={unstakeNodeRef} delay={250} in={isUnstake}>
                            {(state) => (
                                <UnstakingBottomBox
                                    ref={unstakeNodeRef}
                                    style={{
                                        ...defaultStyle,
                                        ...unstakeTransitionStyles[state],
                                    }}
                                />
                            )}
                        </Transition>
                        <Transition nodeRef={stakeNodeRef} delay={250} in={!isUnstake}>
                            {(state) => (
                                <StakingBottomBox
                                    ref={stakeNodeRef}
                                    setMax={setMax}
                                    alcaBalance={ALCA_BALANCE}
                                    stakeAmt={stakeAmount}
                                    setStakeAmt={setStakeAmount}
                                    style={{
                                        ...defaultStyle,
                                        ...stakeTransitionStyles[state],
                                    }}
                                />
                            )}
                        </Transition>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Link
                    sx={{
                        mt: "1rem",
                        color: theme.palette.text.secondary,
                        fontFamily: "JetBrains",
                        fontWeight: 600,
                        textDecoration: "none",
                        fontSize: ".75rem",
                        "&:hover": {
                            textDecoration: "underline",
                            cursor: "pointer",
                            color: theme.palette.text.primary,
                        },
                    }}
                >
                    About Staked Rewards
                    <OpenInNewIcon sx={{ ml: ".35rem", fontSize: "12px", position: "relative", top: "2px" }} />
                </Link>
            </Box>
        </Box>
    );
}
