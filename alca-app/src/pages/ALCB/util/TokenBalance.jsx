import { Box, Typography } from "@mui/material";
import { BalanceContext } from "alice-ui-common";
import { useContext } from "react";
import { formattedAlcbBalance, formattedEthBalance } from "utils/balance";

export function TokenBalance() {
    const { balances } = useContext(BalanceContext);

    const BalanceDisplay = ({ label, value }) => (
        <Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ pr: 2, minWidth: "100px" }}>
                    <Typography sx={{ minWidth: "100px" }} textAlign={"left"} variant="subtitle2">
                        {label} Balance:
                    </Typography>
                </Box>
                <Box sx={{ ml: 1 }}>
                    <Typography variant="h7">
                        {value} <strong>{label}</strong>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
    return (
        <>
            <Typography variant="h6" sx={{ fontWeight: 900, mt: 1 }}>
                Current Balances
            </Typography>
            <Box display="flex" flexDirection={"column"} sx={{ mt: 1 }}>
                <BalanceDisplay label="ETH" value={formattedEthBalance(balances)} />
                <BalanceDisplay label="ALCB" value={formattedAlcbBalance(balances)} />
            </Box>
        </>
    );
}
