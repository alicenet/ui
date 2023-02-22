import React from "react";
import {
    Box,
    Button,
    lighten,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from "@mui/material";
import { Wallet } from "@mui/icons-material";
import { content, HelpTooltip } from "components";
import { useSelector } from "react-redux";
import { walletKeyByNumber } from "redux/reducers";
import { ellipsesSplit } from "utils";

const headerCells = [
    {
        id: "empty",
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
const playerXCells = (xWallet) => [
    {
        id: "playerX",
        label: "Player X",
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "empty",
        label: ellipsesSplit(xWallet.pKey, 6),
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "empty",
        label: ellipsesSplit(xWallet.pubK, 6),
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "empty",
        label: ellipsesSplit(xWallet.address, 6),
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "empty",
        label: "Sign",
        displayCallback: ({ label }) => (
            <Button disabled variant="outlined" size="small">
                {label}
            </Button>
        ),
    },
];

const playerOCells = (oWallet) => [
    {
        id: "playerO",
        label: "Player O",
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "empty",
        label: ellipsesSplit(oWallet.pKey, 6),
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "empty",
        label: ellipsesSplit(oWallet.pubK, 6),
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "empty",
        label: ellipsesSplit(oWallet.address, 6),
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "empty",
        label: "Sign",
        displayCallback: ({ label }) => (
            <Button disabled variant="outlined" size="small">
                {label}
            </Button>
        ),
    },
];

const groupAddressCells = (groupWallet) => [
    {
        id: "groupAddress",
        label: "Group Address",
        displayCallback: ({ label }) => <Typography variant="span"> {label} </Typography>,
    },
    {
        id: "empty",
        label: groupWallet.address ? "N/A" : "",
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "empty",
        label: ellipsesSplit(groupWallet.pubK, 6),
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "empty",
        label: ellipsesSplit(groupWallet.address, 6),
        displayCallback: ({ label }) => <Typography variant="span">{label}</Typography>,
    },
    {
        id: "empty",
        label: "X Sends",
        displayCallback: ({ label }) => (
            <Button disabled variant="outlined" size="small">
                {label}
            </Button>
        ),
    },
];

const HeaderCell = ({ id, label }) => (
    <Box display="flex" flexDirection="row" alignItems="center" gap={0.5}>
        <Typography variant="span">{label}</Typography>
        <HelpTooltip content={content[id]} />
    </Box>
);

export function WalletComposition() {
    const theme = useTheme();
    const { xWallet, oWallet, groupWallet } = useSelector((state) => ({
        xWallet: state.app.wallets[walletKeyByNumber[1]],
        oWallet: state.app.wallets[walletKeyByNumber[2]],
        groupWallet: state.app.wallets[walletKeyByNumber[3]],
    }));

    console.log({ xWallet, oWallet, groupWallet });

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ border: 0 }} key="table-header-main" padding="none" colSpan={headerCells.length}>
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
                    {headerCells.map((headerCell) => {
                        return (
                            <TableCell
                                key={`row-${headerCell.id}`}
                                sx={{
                                    background: lighten(theme.palette.background.paper, 3 * 0.045),
                                    padding: 2,
                                    fontSize: "small",
                                }}
                            >
                                {headerCell?.displayCallback ? (
                                    headerCell.displayCallback({
                                        id: headerCell.id,
                                        label: headerCell.label,
                                    })
                                ) : (
                                    <></>
                                )}
                            </TableCell>
                        );
                    })}
                </TableRow>

                <TableRow>
                    {playerXCells(xWallet).map((playerXCell) => {
                        return (
                            <TableCell
                                key={`row-PX-${playerXCell.id}`}
                                sx={{
                                    background: lighten(theme.palette.background.paper, 3 * 0.045),
                                    padding: 2,
                                    fontSize: "small",
                                }}
                            >
                                {playerXCell?.displayCallback ? (
                                    playerXCell.displayCallback({
                                        id: playerXCell.id,
                                        label: playerXCell.label,
                                    })
                                ) : (
                                    <></>
                                )}
                            </TableCell>
                        );
                    })}
                </TableRow>

                <TableRow>
                    {playerOCells(oWallet).map((playerOCell) => {
                        return (
                            <TableCell
                                key={`row-PO-${playerOCell.id}`}
                                sx={{
                                    background: lighten(theme.palette.background.paper, 3 * 0.045),
                                    padding: 2,
                                    fontSize: "small",
                                }}
                            >
                                {playerOCell?.displayCallback ? (
                                    playerOCell.displayCallback({
                                        id: playerOCell.id,
                                        label: playerOCell.label,
                                    })
                                ) : (
                                    <></>
                                )}
                            </TableCell>
                        );
                    })}
                </TableRow>

                <TableRow>
                    {groupAddressCells(groupWallet).map((groupAddressCell) => {
                        return (
                            <TableCell
                                key={`row-GA-${groupAddressCell.id}`}
                                sx={{
                                    background: lighten(theme.palette.background.paper, 3 * 0.045),
                                    padding: 2,
                                    fontSize: "small",
                                }}
                            >
                                {groupAddressCell?.displayCallback ? (
                                    groupAddressCell.displayCallback({
                                        id: groupAddressCell.id,
                                        label: groupAddressCell.label,
                                    })
                                ) : (
                                    <></>
                                )}
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableBody>
        </Table>
    );
}
