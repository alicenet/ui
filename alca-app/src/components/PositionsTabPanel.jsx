import { useContext } from "react";
import { useTheme } from "@emotion/react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { TabPanel } from "@mui/lab";
import { BalanceContext } from "alice-ui-common";
import { formatNumberToLocale } from "utils/number";

export function PositionsTabPanel({ value, rows, columns, hideFooterPagination }) {
    const { balances } = useContext(BalanceContext);

    const theme = useTheme();

    function formattedAlcaBalance() {
        if (balances.alca.error || balances.alca.value === "n/a") return "n/a";

        return formatNumberToLocale(balances.alca.value);
    }

    return (
        <TabPanel value={value} sx={{ padding: 0 }}>
            <Box
                padding={2}
                borderRadius={1}
                sx={{
                    background: `linear-gradient(180deg, ${theme.palette.custom.elevation12} 0%, ${theme.palette.custom.elevation12} 100%), ${theme.palette.background.default}`,
                    "& .even": {
                        background: `linear-gradient(180deg, ${theme.palette.custom.elevation3} 0%, ${theme.palette.action.hover} 100%, ${theme.palette.custom.elevation1} 100%), ${theme.palette.background.default}`,
                    },
                    "& .customRow": {
                        fontFamily: theme.typography.subtitle1.fontFamily,
                        borderRadius: 1,
                    },
                    "& .headerClass": {
                        fontFamily: "JetBrains Mono",
                    },
                    "& .MuiDataGrid-cell:focus-within": {
                        outline: "none",
                    },
                    "& .odd.MuiDataGrid-row:hover": {
                        background: `linear-gradient(180deg, ${theme.palette.custom.elevation12} 0%, ${theme.palette.custom.elevation12} 100%), ${theme.palette.background.default}`,
                    },
                    "& .even.MuiDataGrid-row:hover": {
                        background: `linear-gradient(180deg, ${theme.palette.custom.elevation3} 0%, ${theme.palette.action.hover} 100%, ${theme.palette.custom.elevation1} 100%), ${theme.palette.background.default}`,
                    },
                }}
            >
                <Box mb={1} pb={1.5} borderBottom="1px solid #555">
                    <Typography variant="subtitle2">Current ALCA Balance</Typography>
                    <Typography variant="h5">{formattedAlcaBalance()} ALCA</Typography>
                </Box>

                <DataGrid
                    autoPageSize
                    autoHeight
                    disableSelectionOnClick
                    disableColumnMenu
                    pageSize={10}
                    rowHeight={72}
                    rows={rows}
                    columns={columns}
                    hideFooterPagination={hideFooterPagination}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? "customRow even" : "customRow odd"
                    }
                    sx={{ fontSize: 14 }}
                />
            </Box>
        </TabPanel>
    );
}
