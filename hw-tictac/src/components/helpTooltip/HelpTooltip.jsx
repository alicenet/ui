import React from "react";
import { HelpOutline } from '@mui/icons-material';
import { Tooltip } from "@mui/material";

export const content = {
    bn: "Barreto-Naehrig curve type account address",
    changeAddress: "Address that remaining value goes to",
    consumedTx: "Transaction hash of the transaction being consumed",
    consumedTxIndex: "The index of the transaction output being consumed",
    dataStore: "Stores data at a specified index",
    deposit: "The storage rent assigned to this data",
    duration: "How many epochs the DataStore should persist",
    epoch: "The Epoch in which the data was written",
    expires: "The Epoch in which the data expires",
    groupSignature: "The signature of the validators under the negotiated group key",
    headerRoot: "The root hash of the header tree",
    height: "The block height",
    index: "Index where the data is stored",
    offset: "The offset of the transaction, length is 64",
    owner: "The account that owns the UTXO",
    previousBlock: "The hash of the previous block's BClaims",
    rawData: "The hex representation of the stored data",
    receiver: "Account that will receive the value",
    secp: "Standards for Efficient Cryptography curve",
    sender: "Account that is sending value",
    signature: "The signature of the object",
    stateRoot: "The root hash of the state tree",
    txIndex: "The index at which a UTXO was created in the transaction's output vector",
    value: "The amount of value stored in the UTXO",
    txCount: "The number of transactions in the block",
    txRoot: "The root hash of the Merkle Tree containing all of the tx hashes included in the block",
    txHash: "The hash of the transaction inputs and outputs",
    valueStore: "Stores value for a transaction",
}

// Toasty notifications
export function HelpTooltip({ content }) {

    return (

        <Tooltip title={content} arrow placement="top">
            <HelpOutline fontSize="small" sx={{ "&:hover": { opacity: 0.8 } }} />
        </Tooltip>

    );

}
