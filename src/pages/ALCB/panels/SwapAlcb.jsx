import { TabPanel } from "@mui/lab";
import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import ethAdapter from "eth-adapter";
import { useContext, useState } from "react";
import { checkValidAmountCharacters } from "utils/string";
import { alcb_abi } from "../../../abi/ALCB";
import { useTheme } from "@emotion/react";
import { getBoxStyles } from "../localStyles";
import { TokenBalance } from "../util/TokenBalance";
import { BalanceContext } from "alice-ui-common";
import { ConfirmTxModal } from "../util/ConfirmTxModal";

export function SwapAlcbPanel() {
    const theme = useTheme();
    const [tokensToExchange, setTokensToExchange] = useState("1");
    const [error, setError] = useState("");
    const [exchangeMode, setExchangeMode] = useState(1); // 1: eth => alcb, 2: alcb => eth
    const [waiting, setWaiting] = useState(false);
    const inputToken = exchangeMode === 1 ? "ETH" : "ALCB";
    const outputToken = exchangeMode === 1 ? "ALBC" : "ETH";
    const { updateBalances } = useContext(BalanceContext);

    const [confirmationModalState, setConfirmationState] = useState({
        isOpen: false,
        confirmFx: () => {},
    });
    const toggleConfirmationModal = (openState) =>
        setConfirmationState((s) => ({ ...s, isOpen: typeof openState !== "undefined" ? openState : !!s.isOpen }));
    // const setConfirmFx = (confirmFx) => setConfirmationState(s => ({...s, confirmFx: confirmFx}))

    // Local contract for submitting valeu options on mint
    const alcbInterface = new ethAdapter.ethers.utils.Interface(alcb_abi.abi);
    const alcbContract = new ethAdapter.ethers.Contract(
        ethAdapter.contractConfig.ALCB.address,
        alcbInterface,
        ethAdapter.signer
    );

    const toggleExchangeMode = () => {
        setExchangeMode(exchangeMode === 1 ? 2 : 1);
    };

    function determineFunction() {
        if (exchangeMode === 1) {
            popConfirmationModal(initiateEthToAlcbTransfer);
        } else {
            popConfirmationModal(initiateAlcbToEthTransfer);
        }
    }

    function popConfirmationModal(confirmFx) {
        setConfirmationState({
            isOpen: true,
            confirmFx: confirmFx,
        });
    }

    // ALCB => ETH is 80%
    function getReturnAmount(tokenAmt) {
        return exchangeMode === 1 ? tokenAmt : tokenAmt * 0.8;
    }

    async function initiateEthToAlcbTransfer() {
        if (tokensToExchange) {
            setWaiting(true);
            try {
                const alcbContractInstance = alcbContract.connect(ethAdapter.signer);
                const res = await alcbContractInstance.mint({
                    value: ethAdapter.ethers.utils.parseEther(tokensToExchange),
                });
                try {
                    await res.wait();
                    await updateBalances(ethAdapter);
                    toggleConfirmationModal(false);
                    setWaiting(false);
                } catch (ex) {
                    setWaiting(false);
                    setError(ex.messsage);
                    console.log("Could not wait for tx", ex);
                }
            } catch (ex) {
                console.error(ex);
                setError(ex.message);
                setWaiting(false);
            }
        }
    }

    async function initiateAlcbToEthTransfer() {
        if (tokensToExchange) {
            setWaiting(true);
            try {
                const alcbContractInstance = alcbContract.connect(ethAdapter.signer);
                const res = await alcbContractInstance.burn(ethAdapter.ethers.utils.parseEther(tokensToExchange));
                try {
                    await res.wait();
                    await updateBalances(ethAdapter);
                    toggleConfirmationModal(false);
                    setWaiting(false);
                } catch (ex) {
                    setWaiting(false);
                    console.log("Could not wait for tx", ex);
                }
            } catch (ex) {
                console.error(ex);
                setWaiting(false);
            }
        }
    }

    const sanitizeTokenForInput = (amt) => {
        if (amt === "." || amt === "") {
            return setTokensToExchange("");
        }
        if (checkValidAmountCharacters(amt)) {
            setTokensToExchange(amt);
        } else {
            return;
        }
    };

    return (
        <TabPanel value="2" sx={{ padding: 0 }}>
            <Box sx={getBoxStyles(theme)}>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ marginBottom: 1, paddingBottom: 1.5 }}>
                            <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                Swap {inputToken} {"for"} {outputToken}
                            </Typography>
                        </Box>
                        <Box flex="column" justifyContent="center" alignItems={"center"}>
                            <TextField
                                label={inputToken + " to swap"}
                                value={tokensToExchange}
                                onChange={(event) => sanitizeTokenForInput(event.target.value)}
                                size="small"
                                color="secondary"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {" "}
                                            {String(inputToken)} {"=>"}{" "}
                                            {String(getReturnAmount(tokensToExchange) + " " + outputToken)}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => toggleExchangeMode()}
                                    disabled={waiting}
                                >
                                    Switch Direction
                                </Button>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => determineFunction()}
                                    disabled={waiting}
                                    sx={{ ml: 2 }}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TokenBalance />
                    </Grid>
                </Grid>
            </Box>
            <ConfirmTxModal
                open={confirmationModalState.isOpen}
                close={() => {
                    if (waiting) {
                        return;
                    } else {
                        toggleConfirmationModal(false);
                        setError("");
                    }
                }}
                confirmFx={confirmationModalState.confirmFx}
                waiting={waiting}
                tokenTxDetails={{ input: inputToken, output: outputToken, tokensToExchange: tokensToExchange }}
                error={error}
            />
        </TabPanel>
    );
}
