import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { content, CopyTooltip, TwoColumnsRow } from "components";
import { aliceNetAdapter } from "adapter/alicenetadapter";

export function TxViewDataStore({ dataStore }) {

    const history = useHistory();

    return (

        <>

            <TwoColumnsRow title="Index" tooltipContent={content.index}>
                <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['Index']} content="Copy Value">
                    <Typography sx={{ wordBreak: "break-all" }}>
                        {`0x${dataStore['DSLinker']['DSPreImage']['Index']}`}
                    </Typography>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Raw Data" tooltipContent={content.rawData}>
                <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['RawData']} content="Copy Data">
                    <Typography sx={{ wordBreak: "break-all" }}>
                        {`0x${dataStore['DSLinker']['DSPreImage']['RawData']}`}
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
                    <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['Owner']} content="Copy Address">
                        <Typography sx={{ wordBreak: "break-all" }}>
                            {`0x${dataStore['DSLinker']['DSPreImage']['Owner']}`}
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
                            history.push(`/data/${dataStore['DSLinker']['DSPreImage']['Owner'].substr(4)}`)
                        }
                    >
                        View Owner DataStores
                    </Button>
                </Box>
            </TwoColumnsRow>

            <TwoColumnsRow title="Issued At" tooltipContent={content.epoch}>
                <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['IssuedAt']} content="Copy Value">
                    <Typography sx={{ wordBreak: "break-all" }}>
                        {dataStore['DSLinker']['DSPreImage']['IssuedAt']}
                    </Typography>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Expires" tooltipContent={content.expires}>
                <CopyTooltip
                    value={
                        aliceNetAdapter.getDSExp(
                            dataStore['DSLinker']['DSPreImage']['RawData'],
                            dataStore['DSLinker']['DSPreImage']['Deposit'],
                            dataStore['DSLinker']['DSPreImage']['IssuedAt']
                        )
                    }
                    content="Copy Value"
                >
                    <Typography sx={{ wordBreak: "break-all" }}>
                        {
                            aliceNetAdapter.getDSExp(
                                dataStore['DSLinker']['DSPreImage']['RawData'],
                                dataStore['DSLinker']['DSPreImage']['Deposit'],
                                dataStore['DSLinker']['DSPreImage']['IssuedAt']
                            )
                        }
                    </Typography>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Deposit" tooltipContent={content.deposit}>
                <CopyTooltip
                    value={aliceNetAdapter.hexToInt(dataStore['DSLinker']['DSPreImage']['Deposit'])}
                    content="Copy Value"
                >
                    <Typography sx={{ wordBreak: "break-all" }}>
                        {aliceNetAdapter.hexToInt(dataStore['DSLinker']['DSPreImage']['Deposit'])}
                    </Typography>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Transaction Index" tooltipContent={content.txIndex}>
                <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['TXOutIdx']} content="Copy Index">
                    <Typography sx={{ wordBreak: "break-all" }}>
                        {dataStore['DSLinker']['DSPreImage']['TXOutIdx']}
                    </Typography>
                </CopyTooltip>
            </TwoColumnsRow>

            <TwoColumnsRow title="Signature" tooltipContent={content.signature} lastRow>
                <Box sx={{ paddingRight: { xs: 0, md: 6 } }}>
                    <CopyTooltip value={dataStore['Signature']} content="Copy Signature">
                        <Typography sx={{ wordBreak: "break-all" }}>
                            {`0x${dataStore['Signature']}`}
                        </Typography>
                    </CopyTooltip>
                </Box>
            </TwoColumnsRow>

        </>

    );

}
