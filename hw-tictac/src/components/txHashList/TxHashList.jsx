import React from "react";
import { Link } from "react-router-dom";
import { CopyTooltip, TwoColumnsRow } from "components";
import { Typography, useTheme } from "@mui/material";

export function TxHashList({ txHshLst }) {

    const theme = useTheme();

    return (

        <>

            {txHshLst && txHshLst.map((hash, index, { length }) =>

                <TwoColumnsRow title="Tx Hash" size={2} lastRow={index + 1 === length} key={`tx-hash-item-${index}`}>

                    <CopyTooltip value={hash} content="Copy Hash">

                        <Typography sx={{
                            color: theme.palette.primary.main,
                            wordBreak: "break-all",
                            ":hover": {
                                color: theme.palette.primary.dark
                            }
                        }}>

                            <Link to={`/tx/${hash}`}>
                                {`0x${hash}`}
                            </Link>

                        </Typography>

                    </CopyTooltip>

                </TwoColumnsRow>
            )}

        </>

    );

}
