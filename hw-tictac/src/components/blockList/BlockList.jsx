import React from "react";
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { content, CopyTooltip, TwoColumnsRow } from "components";
import { useHistory } from "react-router-dom";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const NavigationChevron = ({ height, direction }) => {

    const history = useHistory();
    const theme = useTheme();

    const handleBlockNav = (term) => history.push(`/block/${term}`);

    return (
        <IconButton
            size="small"
            sx={{
                padding: 0,
                background: theme.palette.tableBlack.main,
                borderRadius: 1,
            }}
            onClick={() => handleBlockNav(height)}
        >
            {direction === "left" ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
    );
}

export function BlockList({ blockInfo }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const { BClaims, SigGroup: sigGroup } = blockInfo;
    const {
        Height: height,
        TxCount: txCount,
        PrevBlock: prevBlock,
        TxRoot: txRoot,
        StateRoot: stateRoot,
        HeaderRoot: headerRoot
    } = BClaims;

    const maxHeight = aliceNetAdapter.blocks[0]?.BClaims.Height;

    return (

        <>

            <TwoColumnsRow title="Block Height" tooltipContent={content.height} size={2}>
                <Box display="flex" gap={2}>
                    {height}
                    {
                        matches &&
                        <Box display="flex" gap={0.5}>
                            {height > 1 && <NavigationChevron height={height - 1} direction="left" />}
                            {(maxHeight > height) && <NavigationChevron height={height + 1} direction="right" />}
                        </Box>
                    }
                </Box>

            </TwoColumnsRow>

            <TwoColumnsRow title="Transaction Count" tooltipContent={content.txCount} size={2}>
                <p>{txCount ? txCount : 0}</p>
            </TwoColumnsRow>

            <TwoColumnsRow title="Previous Block" tooltipContent={content.previousBlock} size={2}>
                <CopyTooltip value={prevBlock} content="Copy Hash">
                    <Typography sx={{ wordBreak: "break-all" }}>
                        {`0x${prevBlock}`}
                    </Typography>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Transaction Root" tooltipContent={content.txRoot} size={2}>
                <CopyTooltip value={txRoot} content="Copy Hash">
                    <Typography sx={{ wordBreak: "break-all" }}>
                        {`0x${txRoot}`}
                    </Typography>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="State Root" tooltipContent={content.stateRoot} size={2}>
                <CopyTooltip value={stateRoot} content="Copy Hash">
                    <Typography sx={{ wordBreak: "break-all" }}>
                        {`0x${stateRoot}`}
                    </Typography>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Header Root" tooltipContent={content.headerRoot} size={2}>
                <CopyTooltip value={headerRoot} content="Copy Hash">
                    <Typography sx={{ wordBreak: "break-all" }}>
                        {`0x${headerRoot}`}
                    </Typography>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Group Signature" tooltipContent={content.groupSignature} size={2} lastRow>
                <Box sx={{ paddingRight: { xs: 0, md: 6 } }}>
                    <CopyTooltip value={sigGroup} content="Copy Signature">
                        <Typography sx={{ wordBreak: "break-all" }}>
                            {`0x${sigGroup}`}
                        </Typography>
                    </CopyTooltip>
                </Box>
            </TwoColumnsRow>

        </>

    );

}