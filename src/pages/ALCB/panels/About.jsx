import { TabPanel } from "@mui/lab";
import { Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { getBoxStyles } from "../localStyles";
import { TokenBalance } from "../util/TokenBalance";
import { useTheme } from "@emotion/react";

export function AboutTabPanel() {
    const theme = useTheme();

    return (
        <TabPanel value="1" sx={{ padding: 0 }}>
            <Box sx={getBoxStyles(theme)}>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                ALCB
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                ALCB is the utility token of AliceNet <br />
                                It can be swapped freely on Ethereum
                                <br />
                                Once bridged, ALCB can not be brought back to Ethereum
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TokenBalance />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Box>
                            <Typography variant="h5" sx={{ mt: 1, fontWeight: 900 }}>
                                Swap Ratios
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Swapping</TableCell>
                                            <TableCell>Swapped To</TableCell>
                                            <TableCell>Input</TableCell>
                                            <TableCell>Output</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>ETH</TableCell>
                                            <TableCell>ALCB</TableCell>
                                            <TableCell>1 ETH</TableCell>
                                            <TableCell>1 ALCB</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>ALCB</TableCell>
                                            <TableCell>ETH</TableCell>
                                            <TableCell>1 ALCB</TableCell>
                                            <TableCell>.8 ETH</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </TabPanel>
    );
}
