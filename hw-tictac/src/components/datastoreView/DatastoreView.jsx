import React from "react";
import { content, CopyTooltip, SecondaryAccordion, TwoColumnsRow } from "components";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { Link } from "react-router-dom";
import { Typography, useTheme } from "@mui/material";

export function DatastoreView({ datastoreInfo }) {

    const theme = useTheme();

    return (

        <>

            {datastoreInfo.map((dataStore, index) => (

                <SecondaryAccordion
                    title={`Index: ${dataStore['DSLinker']['DSPreImage']['Index']}`}
                    key={`collapsable-datastore-${index}`}
                >

                    <TwoColumnsRow title="Index" tooltipContent={content.index}>
                        <CopyTooltip value={dataStore['DSLinker']['DSPreImage']['Index']} content="Copy Index">
                            <Typography sx={{ wordBreak: "break-all" }}>
                                {dataStore['DSLinker']['DSPreImage']['Index']}
                            </Typography>
                        </CopyTooltip>
                    </TwoColumnsRow>

                    <TwoColumnsRow title="Data" tooltipContent={content.rawData}>
                        <CopyTooltip
                            value={dataStore['DSLinker']['DSPreImage']['RawData']}
                            content="Copy Value"
                        >
                            <Typography sx={{ wordBreak: "break-all" }}>
                                {`0x${dataStore['DSLinker']['DSPreImage']['RawData']}`}
                            </Typography>
                        </CopyTooltip>
                    </TwoColumnsRow>

                    <TwoColumnsRow title="Expires" tooltipContent={content.expires}>
                        <CopyTooltip
                            value={aliceNetAdapter.getDSExp(
                                dataStore['DSLinker']['DSPreImage']['RawData'],
                                dataStore['DSLinker']['DSPreImage']['Deposit'],
                                dataStore['DSLinker']['DSPreImage']['IssuedAt']
                            )}
                            content="Copy Value"
                        >
                            <p>{aliceNetAdapter.getDSExp(
                                dataStore['DSLinker']['DSPreImage']['RawData'],
                                dataStore['DSLinker']['DSPreImage']['Deposit'],
                                dataStore['DSLinker']['DSPreImage']['IssuedAt']
                            )}</p>
                        </CopyTooltip>
                    </TwoColumnsRow>

                    <TwoColumnsRow title="Transaction Hash" tooltipContent={content.txHash} lastRow>
                        <CopyTooltip value={dataStore['DSLinker']['TxHash']} content="Copy Hash">
                            <Typography sx={{
                                color: theme.palette.primary.main,
                                wordBreak: "break-all",
                                ":hover": {
                                    color: theme.palette.primary.dark
                                }
                            }}>
                                <Link to={`/tx/${dataStore['DSLinker']['TxHash']}`}>
                                    {`0x${dataStore['DSLinker']['TxHash']}`}
                                </Link>
                            </Typography>
                        </CopyTooltip>
                    </TwoColumnsRow>

                </SecondaryAccordion>

            ))}

        </>

    );

}
