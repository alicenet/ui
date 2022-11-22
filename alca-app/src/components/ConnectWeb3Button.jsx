import React from "react";
import { Button } from "@mui/material";
import { BalanceContext } from "alice-ui-common";
import ethAdapter from "eth-adapter";
import { useSelector } from "react-redux";
import { splitStringWithEllipses } from "utils/string";

export function ConnectWeb3Button({ menuButtonSx }) {
    useSelector((s) => s.ethAdapter); // Hook into reducer updates so equalize works properly against ethAdapter
    const balances = React.useContext(BalanceContext);
    const { web3Connected, web3Accounts } = {
        web3Connected: ethAdapter.connected,
        web3Accounts: ethAdapter.accounts,
    };

    return (
        <Button
            variant="contained"
            sx={menuButtonSx}
            onClick={() =>
                ethAdapter.connectToWeb3Wallet(() => {
                    console.log("hit");
                    balances.updateBalances(ethAdapter);
                })
            }
        >
            {web3Connected ? <>{splitStringWithEllipses(web3Accounts[0], 5)}</> : <>Connect</>}
        </Button>
    );
}
