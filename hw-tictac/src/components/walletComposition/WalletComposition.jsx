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
    useTheme,
} from "@mui/material";
import { Wallet } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { walletKeyByNumber } from "redux/reducers";
import { oSignsGameStateTransaction, sendGameStateTransaction, xSignsGameStateTransaction } from "redux/actions";
import { groupAddressCells, headerCells, playerOCells, playerXCells } from "./TableCells";

export const WalletComposition = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const { xSigned, xWallet, oSigned, oWallet, groupWallet } = useSelector((state) => ({
        xWallet: state.app.wallets[walletKeyByNumber[1]],
        oWallet: state.app.wallets[walletKeyByNumber[2]],
        groupWallet: state.app.wallets[walletKeyByNumber[3]],
        xSigned: state.app.xSigned,
        oSigned: state.app.oSigned,
    }));

    return (
        <Box sx={{ overflowX: "auto" }}>
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
                                            disabled: !(groupWallet.address && !xSigned),
                                            dispatch: () => dispatch(xSignsGameStateTransaction()),
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
                                            disabled: !(groupWallet.address && !oSigned),
                                            dispatch: () => dispatch(oSignsGameStateTransaction()),
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
                                            disabled: !(xSigned && oSigned),
                                            dispatch: () => dispatch(sendGameStateTransaction()),
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
        </Box>
    );
}
