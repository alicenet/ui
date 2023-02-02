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
import React from "react";

export function CustomTable({ title, icon, headerCells, rows = [], key, double }) {

    const theme = useTheme();
    const doubleHeaderCells = headerCells.concat(double ? headerCells : []);

    const tableRowBackgroundColor = firstHalf =>
        lighten(theme.palette.background.paper, (firstHalf ? 2 : 3) * 0.025);

    return (

        <Table key={key}>

            <TableHead>

                <TableRow>

                    <TableCell
                        sx={{ border: 0 }}
                        colSpan={doubleHeaderCells.length}
                        key="table-header-main"
                        padding="none"
                    >

                        <Paper elevation={8} sx={{ boxShadow: "unset" }} square>

                            <Box
                                display="flex"
                                alignItems="center"
                                gap={2}
                                paddingX={{ xs: 2, md: 4 }}
                                paddingY={2}
                                border={2}
                                borderColor={theme.palette.primary.main}
                                borderBottom={0}
                                borderLeft={0}
                                borderRight={0}
                            >
                                {icon}
                                <Typography fontWeight="bold">
                                    {title}
                                </Typography>
                            </Box>

                        </Paper>

                    </TableCell>

                </TableRow>

                <TableRow>

                    {doubleHeaderCells.map((header, headerIndex) => {
                        const secondHalf = headerIndex >= headerCells.length;
                        return (
                            <TableCell
                                key={`table-header-${header.id}-${headerIndex}`}
                                sx={{
                                    paddingX: { xs: 2, md: 4 },
                                    background: tableRowBackgroundColor(secondHalf)
                                }}
                            >

                                <Typography fontWeight="bold">
                                    {header.label}
                                </Typography>

                            </TableCell>
                        );
                    })}

                </TableRow>

            </TableHead>

            <TableBody>
                {rows.map((row, rowIndex) => {
                    if (rowIndex % 2 !== 0 && double) {
                        return null;
                    }

                    return (
                        <TableRow key={`table-row-${rowIndex}`}>

                            {doubleHeaderCells.map((headerCell, headerCellIndex) => {
                                const secondHalf = headerCellIndex >= headerCells.length;
                                const selectedRow = secondHalf ? rows[rowIndex + 1] : row;
                                return (

                                    <TableCell
                                        key={`row-${headerCell.id}-${headerCellIndex}`}
                                        sx={{
                                            paddingX: { xs: 2, md: 4 },
                                            paddingY: 2.5,
                                            borderBottom: rowIndex + (double ? 2 : 1) === rows.length ? "unset" : "",
                                            fontSize: "small",
                                            background: tableRowBackgroundColor(secondHalf)
                                        }}
                                    >

                                        {headerCell?.displayCallback ? headerCell.displayCallback({ theme, ...selectedRow }) : selectedRow[headerCell.id]}

                                    </TableCell>
                                );
                            })}

                        </TableRow>
                    );
                })}

            </TableBody>

        </Table>
    );

}
