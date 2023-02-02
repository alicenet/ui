import { FormControlLabel, FormGroup, Icon, Link, styled, Switch, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { fancyToggleStyles } from "./FancyToggleStyles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({ ...fancyToggleStyles }));

function FancyToggle({ checked, onChange }) {
    return <FormControlLabel control={<MaterialUISwitch disableRipple checked={checked} onChange={onChange} />} />;
}

export function StakingBox() {
    const theme = useTheme();
    const [isUnstake, setIsUnstake] = useState(false);

    return (
        <Box mt={"50px"}>
            <Box sx={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
                <FancyToggle
                    checked={isUnstake}
                    onChange={function () {
                        setIsUnstake((s) => !s);
                    }}
                />
            </Box>
            <Box sx={{ display: "flex", mt: "26px", alignItems: "center", justifyContent: "center" }}>
                <Typography textAlign={"center"} fontSize={"12px"} sx={{ color: theme.palette.text.secondary }}>
                    Interacting With 0x0{" "}
                    <Link
                        sx={{
                            ml: "2px",
                            color: theme.palette.secondary.main,
                            fontWeight: 600,
                            textDecoration: "none",
                            "&:hover": { cursor: "pointer" },
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
                    mt: "12px",
                    height: "442px",
                    background: "#FADEFF",
                    borderRadius: "18px",
                    pt: "16px",
                    pl: "28px",
                }}
            >
                Available To Stake <br />
                ALCA
                <Box
                    sx={{
                        position: "relative",
                        left: "-28px",
                        width: "92%",
                        maxWidth: "92%",
                        height: "100%",
                        top: "32px",
                        background:
                            " linear-gradient(180deg, rgba(165, 198, 255, 0.14) 0%, rgba(165, 198, 255, 0.14) 100%), #191119;",
                        borderRadius: "18px",
                        px: "38px",
                        pt: "32px",
                    }}
                >
                    Test Box
                </Box>
            </Box>
        </Box>
    );
}
