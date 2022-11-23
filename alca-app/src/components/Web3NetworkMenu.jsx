import React from "react";
import { Button } from "@mui/material";
import ethAdapter from "eth-adapter";
import { ETHEREUM_NETWORK_BY_ID } from "eth-adapter";
import { useSelector } from "react-redux";

export function Web3NetworkMenu({ menuButtonSx }) {
    useSelector((s) => s.ethAdapter); // Hook into reducer updates so equalize works properly against ethAdapter

    return (
        <>
            <Button
                id="network-button"
                variant="text"
                sx={{ ...menuButtonSx, pointerEvents: "none" }}
                disabled={!ethAdapter.connected}
                disableRipple
            >
                Network:{" "}
                {ethAdapter.connected
                    ? ETHEREUM_NETWORK_BY_ID[ethAdapter.ethers.BigNumber.from(ethAdapter.networkId || 0).toString()] ||
                      "Other"
                    : "Not Connected"}
            </Button>
        </>
    );
}
