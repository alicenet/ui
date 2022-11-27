import React from "react";
import { Button } from "@mui/material";
import { BalanceContext } from "alice-ui-common";
import ethAdapter from "eth-adapter";
import { useDispatch, useSelector } from "react-redux";
import { splitStringWithEllipses } from "utils/string";
import { setInitialLoadCompleted } from "redux/actions/application";

export function ConnectWeb3Button({ menuButtonSx, overrideText, sx }) {
    useSelector((s) => s.ethAdapter); // Hook into reducer updates so equalize works properly against ethAdapter
    const balances = React.useContext(BalanceContext);
    const dispatch = useDispatch();
    const { web3Connected, web3Accounts } = {
        web3Connected: ethAdapter.connected,
        web3Accounts: ethAdapter.accounts,
    };

    const connectCb = async () => {
        await balances.updateBalances(ethAdapter);
        dispatch(setInitialLoadCompleted());
    };

    let sxGroup = Object.assign({}, menuButtonSx, sx);

    return (
        <Button variant="contained" sx={sxGroup} onClick={() => ethAdapter.connectToWeb3Wallet(connectCb)}>
            {web3Connected ? <>{splitStringWithEllipses(web3Accounts[0], 5)}</> : <>{overrideText || "Connect"}</>}
        </Button>
    );
}
