import React from "react";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    useTheme
} from "@mui/material";

export function GroupDataStoreIndex() {

    const theme = useTheme();

    return (
        <Paper elevation={2} sx={{ boxShadow: "unset" }} square>

            <Table>

                <TableHead>

                    <TableRow>

                        <TableCell
                            key="table-header-main"
                            padding="none"
                        >

                            <Box
                                display="flex"
                                alignItems="center"
                                padding={3}
                                paddingY={2}
                                border={2}
                                borderColor={theme.palette.primary.main}
                                borderBottom={0}
                                borderLeft={0}
                                borderRight={0}
                                gap={2}
                            >
                                <Typography>
                                    <strong>Group DataStore Index</strong>
                                </Typography>
                                <Button
                                    color="primary"
                                    size="small"
                                    variant="contained"
                                >
                                    View
                                </Button>
                            </Box>

                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    <TableRow>

                        <TableCell sx={{ border: 0, padding: 3, fontSize: "small" }}>

                            <Box>
                                <Typography>
                                    Browse previous move on the Block Explorer
                                </Typography>
                                <Typography>
                                    TX HASH(1): 91f174784ba0edd9df3051deb0a53fddca8a150e
                                </Typography>
                            </Box>

                        </TableCell>

                    </TableRow>

                </TableBody>

            </Table>

        </Paper>
    );

}