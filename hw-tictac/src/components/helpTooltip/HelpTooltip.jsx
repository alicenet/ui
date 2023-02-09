import React from "react";
import { Help } from '@mui/icons-material';
import { Tooltip } from "@mui/material";

export const content = {
    address: "This is the address",
    privateKey: "This is the private key",
    publicKey: "This is the public key",
    signature: "The signature of the object",
}

export function HelpTooltip({ content }) {

    return (

        <Tooltip title={content} arrow placement="top">
            <Help fontSize="smaller" opacity={0.6} sx={{ "&:hover": { opacity: 0.8 } }} />
        </Tooltip>

    );

}
