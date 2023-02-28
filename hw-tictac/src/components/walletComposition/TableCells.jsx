import React from "react";
import { Box, Button, Typography, } from "@mui/material";
import { content, HelpTooltip } from "components";
import { ellipsesSplit } from "utils";

export const headerCells = [
    {
        id: "h_empty",
        label: "",
    },
    {
        id: "privateKey",
        label: "Private Key",
        displayCallback: ({ id, label }) => <HeaderCell id={id} label={label} />,
    },
    {
        id: "publicKey",
        label: "Public Key",
        displayCallback: ({ id, label }) => <HeaderCell id={id} label={label} />,
    },
    {
        id: "address",
        label: "Address",
        displayCallback: ({ id, label }) => <HeaderCell id={id} label={label} />,
    },
    {
        id: "signature",
        label: "Signature",
        displayCallback: ({ id, label }) => <HeaderCell id={id} label={label} />,
    },
];

export const playerXCells = (xWallet) => [
    {
        id: "playerX",
        label: "Player X",
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "x_empty0",
        label: ellipsesSplit(xWallet.pKey, 6),
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "x_empty1",
        label: ellipsesSplit(xWallet.pubK, 6),
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "x_empty2",
        label: ellipsesSplit(xWallet.address, 6),
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "x_empty3",
        label: "Sign",
        displayCallback: ({ label, disabled, dispatch }) => (
            <Button variant="outlined" size="small" disabled={disabled} onClick={dispatch}>
                {label}
            </Button>
        ),
    },
];

export const playerOCells = (oWallet) => [
    {
        id: "playerO",
        label: "Player O",
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "o_empty1",
        label: ellipsesSplit(oWallet.pKey, 6),
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "o_empty2",
        label: ellipsesSplit(oWallet.pubK, 6),
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "o_empty3",
        label: ellipsesSplit(oWallet.address, 6),
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "o_empty4",
        label: "Sign",
        displayCallback: ({ label, disabled, dispatch }) => (
            <Button variant="outlined" size="small" disabled={disabled} onClick={dispatch}>
                {label}
            </Button>
        ),
    },
];

export const groupAddressCells = (groupWallet) => [
    {
        id: "groupAddress",
        label: "Group Address",
        displayCallback: ({ label }) => <Typography variant="span"> {label} </Typography>,
    },
    {
        id: "g_empty0",
        label: groupWallet.address ? "N/A" : "",
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "g_empty1",
        label: ellipsesSplit(groupWallet.pubK, 6),
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "g_empty2",
        label: ellipsesSplit(groupWallet.address, 6),
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "g_empty3",
        label: "Send",
        displayCallback: ({ label, disabled, dispatch }) => (
            <Button variant="outlined" size="small" disabled={disabled} onClick={dispatch}>
                {label}
            </Button>
        ),
    },
];

const HeaderCell = ({ id, label }) =>
    <Box display="flex" flexDirection="row" alignItems="center" gap={0.5}>
        <Typography variant="span">{label}</Typography>
        <HelpTooltip content={content[id]} />
    </Box>


