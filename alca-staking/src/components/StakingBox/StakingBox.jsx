import { FormControlLabel, FormGroup, styled, Switch, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { fancyToggleStyles } from "./FancyToggleStyles";

export function StakingBox() {
    const theme = useTheme();
    const [isUnstake, setIsUnstake] = useState(false);

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({ ...fancyToggleStyles }));

    return (
        <Box mt={"35px"}>
            <Box sx={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
                <StakeSwitch checked={isUnstake} onChange={() => setIsUnstake((s) => !s)} disableRipple />
            </Box>
        </Box>
    );
}

function StakeSwitch(props) {
    const MaterialUISwitch = styled(Switch)(({ theme }) => ({ ...fancyToggleStyles }));
    return <MaterialUISwitch {...props} />;
}
