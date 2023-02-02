import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { content, CopyTooltip, TwoColumnsRow } from "components";
import { aliceNetAdapter } from "adapter/alicenetadapter";

export function TxViewValueStore({ valueStore }) {

    const history = useHistory();

    return (

        <>

            <TwoColumnsRow title="Value" tooltipContent={content.value}>
                <CopyTooltip
                    value={aliceNetAdapter.hexToInt(valueStore['VSPreImage']['Value'])}
                    content="Copy Value"
                >
                    <Typography sx={{ wordBreak: "break-all" }}>
                        {aliceNetAdapter.hexToInt(valueStore['VSPreImage']['Value'])}
                    </Typography>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Owner" tooltipContent={content.owner}>
                <Box
                    display="flex"
                    gap={2}
                    sx={{
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: { xs: "flex-start", md: "center" },
                        width: { xs: "100%", md: "inherit" }
                    }}
                >
                    <CopyTooltip value={valueStore['VSPreImage']['Owner']} content="Copy Address">
                        <Typography sx={{ wordBreak: "break-all" }}>
                            {`0x${valueStore['VSPreImage']['Owner']}`}
                        </Typography>
                    </CopyTooltip>

                    <Button
                        size="small"
                        variant="contained"
                        sx={{
                            width: { xs: "100%", md: "inherit" },
                            paddingY: 0.25,
                            borderRadius: 1,
                            fontSize: "small"
                        }}
                        onClick={() =>
                            history.push(`/data/${valueStore['VSPreImage']['Owner'].substr(4)}`)
                        }
                    >
                        View Owner DataStores
                    </Button>
                </Box>
            </TwoColumnsRow>

            <TwoColumnsRow title="Transaction Index" tooltipContent={content.txIndex} lastRow>
                <CopyTooltip value={valueStore['VSPreImage']['TXOutIdx']} content="Copy Index">
                    <Typography sx={{ wordBreak: "break-all" }}>
                        {valueStore['VSPreImage']['TXOutIdx']}
                    </Typography>
                </CopyTooltip>
            </TwoColumnsRow>

        </>

    );

}
