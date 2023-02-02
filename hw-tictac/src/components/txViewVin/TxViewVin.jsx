import React from "react";
import { content, CopyTooltip, SecondaryAccordion, TwoColumnsRow } from "components";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

export function TxViewVin({ txInfo }) {

    const theme = useTheme();

    return (

        <>

            {txInfo.map((tx, index) =>

                <SecondaryAccordion title={`Vin ${index + 1}`} key={`collapsable-tx-vin-${index}`}>

                    <TwoColumnsRow title="Consumed Transaction" tooltipContent={content.consumedTx}>
                        <CopyTooltip
                            value={tx['TXInLinker']['TXInPreImage']['ConsumedTxHash']}
                            content="Copy Hash"
                        >
                            <Typography sx={{
                                color: theme.palette.primary.main,
                                wordBreak: "break-all",
                                ":hover": {
                                    color: theme.palette.primary.dark
                                }
                            }}>
                                <Link to={`/tx/${tx['TXInLinker']['TXInPreImage']['ConsumedTxHash']}`}>
                                    {`0x${tx['TXInLinker']['TXInPreImage']['ConsumedTxHash']}`}
                                </Link>
                            </Typography>
                        </CopyTooltip>
                    </TwoColumnsRow>

                    <TwoColumnsRow
                        title="Consumed Transaction Index"
                        tooltipContent={content.consumedTxIndex}

                    >
                        <CopyTooltip
                            value={tx['TXInLinker']['TXInPreImage']['ConsumedTxIdx']}
                            content="Copy Value"
                        >
                            <Typography sx={{ wordBreak: "break-all" }}>
                                {tx['TXInLinker']['TXInPreImage']['ConsumedTxIdx']}
                            </Typography>
                        </CopyTooltip>
                    </TwoColumnsRow>

                    <TwoColumnsRow title="Signature" tooltipContent={content.signature} lastRow>
                        <Box sx={{ paddingRight: { xs: 0, md: 6 } }}>
                            <CopyTooltip value={tx['Signature']} content="Copy Hash">
                                <Typography sx={{ wordBreak: "break-all" }}>
                                    {`0x${tx['Signature']}`}
                                </Typography>
                            </CopyTooltip>
                        </Box>
                    </TwoColumnsRow>

                </SecondaryAccordion>
            )}

        </>

    );

}