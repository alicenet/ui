import React, { useState } from "react";
import { copyText } from "utils";
import { Box, Icon, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

export function CopyTooltip({ value, content, children }) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [contentMessage, setContentMessage] = useState(content);

    const handleClick = valueToCopy => {
        setContentMessage("Copied!");
        copyText(valueToCopy);
    };

    return (

        <Box display="flex" alignItems="flex-start" gap={1}>
            {children}
            {
                matches &&
                <Tooltip placement="top" arrow title={contentMessage} onClose={() => setContentMessage(content)}>
                    <Icon
                        onClick={() => handleClick(value)}
                        fontSize="small"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            cursor: "pointer",
                            "&:hover": {
                                opacity: 0.8
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faCopy} size="xs" />
                    </Icon>
                </Tooltip>
            }
        </Box>

    );

}