import React from "react";
import {
    Box,
    lighten,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    useTheme
} from "@mui/material";
import { Wallet } from '@mui/icons-material';
import { content, HelpTooltip } from "components";

const headerCells =
    [
        {
            id: "empty",
            label: "",
        },
        {
            id: "privateKey",
            label: "Private Key",
            displayCallback: ({ id, label }) => <HeaderCell id={id} label={label} />
        },
        {
            id: "publicKey",
            label: "Public Key",
            displayCallback: ({ id, label }) => <HeaderCell id={id} label={label} />
        },
        {
            id: "address",
            label: "Address",
            displayCallback: ({ id, label }) => <HeaderCell id={id} label={label} />
        },
        {
            id: "signature",
            label: "Signature",
            displayCallback: ({ id, label }) => <HeaderCell id={id} label={label} />
        },
    ]
;

const playerXCells =
    [
        {
            id: "playerX",
            label: "Player X",
            displayCallback: ({ label }) => <Typography variant="span"> {label} </Typography>
        },
        {
            id: "empty",
            label: "",
        },
        {
            id: "empty",
            label: "",
        },
        {
            id: "empty",
            label: "",
        },
        {
            id: "empty",
            label: "",
        },
    ]
;

const playerOCells =
    [
        {
            id: "playerO",
            label: "Player O",
            displayCallback: ({ label }) => <Typography variant="span"> {label} </Typography>
        },
        {
            id: "empty",
            label: "",
        },
        {
            id: "empty",
            label: "",
        },
        {
            id: "empty",
            label: "",
        },
        {
            id: "empty",
            label: "",
        },
    ]
;

const groupAddressCells =
    [
        {
            id: "groupAddress",
            label: "Group Address",
            displayCallback: ({ label }) => <Typography variant="span"> {label} </Typography>
        },
        {
            id: "empty",
            label: "",
        },
        {
            id: "empty",
            label: "",
        },
        {
            id: "empty",
            label: "",
        },
        {
            id: "empty",
            label: "",
        },
    ]
;

const HeaderCell = ({ id, label }) =>
    <Box display="flex" flexDirection="row" alignItems="center" gap={0.5}>
        <Typography variant="span">
            {label}
        </Typography>
        <HelpTooltip content={content[id]} />
    </Box>


export function WalletComposition() {

    const theme = useTheme();

    return (
        <Table>

            <TableHead>

                <TableRow>

                    <TableCell
                        sx={{ border: 0 }}
                        key="table-header-main"
                        padding="none"
                        colSpan={headerCells.length}
                    >

                        <Paper elevation={2} sx={{ boxShadow: "unset" }} square>

                            <Box
                                display="flex"
                                alignItems="center"
                                gap={2}
                                padding={2}
                                border={2}
                                borderColor={theme.palette.primary.main}
                                borderBottom={0}
                                borderLeft={0}
                                borderRight={0}
                            >
                                <Wallet opacity={0.75} />
                                <Typography>
                                    <strong>Wallet Composition</strong>
                                </Typography>
                            </Box>

                        </Paper>

                    </TableCell>

                </TableRow>

            </TableHead>

            <TableBody>

                <TableRow>

                    {headerCells.map(headerCell => {
                        return (
                            <TableCell
                                key={`row-${headerCell.id}`}
                                sx={{
                                    border: 0,
                                    background: lighten(theme.palette.background.paper, 3 * 0.045),
                                    padding: 2,
                                    fontSize: "small",
                                }}
                            >

                                {headerCell?.displayCallback ? headerCell.displayCallback(
                                    {
                                        id: headerCell.id,
                                        label: headerCell.label
                                    }
                                ) : <></>}

                            </TableCell>

                        );
                    })}

                </TableRow>

                <TableRow>

                    {playerXCells.map(playerXCell => {
                        return (
                            <TableCell
                                key={`row-PX-${playerXCell.id}`}
                                sx={{
                                    border: 0,
                                    background: lighten(theme.palette.background.paper, 3 * 0.045),
                                    padding: 2,
                                    fontSize: "small",
                                }}
                            >

                                {playerXCell?.displayCallback ? playerXCell.displayCallback(
                                    {
                                        id: playerXCell.id,
                                        label: playerXCell.label
                                    }
                                ) : <></>}

                            </TableCell>

                        );
                    })}

                </TableRow>

                <TableRow>

                    {playerOCells.map(playerOCell => {
                        return (
                            <TableCell
                                key={`row-PO-${playerOCell.id}`}
                                sx={{
                                    border: 0,
                                    background: lighten(theme.palette.background.paper, 3 * 0.045),
                                    padding: 2,
                                    fontSize: "small",
                                }}
                            >

                                {playerOCell?.displayCallback ? playerOCell.displayCallback(
                                    {
                                        id: playerOCell.id,
                                        label: playerOCell.label
                                    }
                                ) : <></>}

                            </TableCell>

                        );
                    })}

                </TableRow>

                <TableRow>

                    {groupAddressCells.map(groupAddressCell => {
                        return (
                            <TableCell
                                key={`row-GA-${groupAddressCell.id}`}
                                sx={{
                                    border: 0,
                                    background: lighten(theme.palette.background.paper, 3 * 0.045),
                                    padding: 2,
                                    fontSize: "small",
                                }}
                            >

                                {groupAddressCell?.displayCallback ? groupAddressCell.displayCallback(
                                    {
                                        id: groupAddressCell.id,
                                        label: groupAddressCell.label
                                    }
                                ) : <></>}

                            </TableCell>

                        );
                    })}

                </TableRow>

            </TableBody>

        </Table>

    );

}