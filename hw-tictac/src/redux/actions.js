import { createAsyncThunk } from "@reduxjs/toolkit";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { ethers } from "ethers";
import { walletKeyByNumber } from "./reducers";
import axios from "axios";
import { serializeTttGameState } from "./gameState";

// For testing etc.. Hopefully it is clear, but don't use these keys elsewhere!
const staticWallets = true;
const staticTestKeys = {
    1: "0x6efa5e24b5e70456acac871cd35c52e362bb3faa5bcc2f012576a6763d01a776",
    2: "0x9e3830447f93e5b3bc855585260c1b1b35eebe42f6c5b990cb86912292dbc64b",
};

let lastSignedXSigs = "";
let lastSignedOSigs = "";

// Generate a wallet using ethers either by pKey, or random without
function generateWallet(pKey) {
    return new Promise((res) => {
        let wallet = pKey ? new ethers.Wallet(pKey) : ethers.Wallet.createRandom();
        // Force re-render on status change by allowing time for node to update
        setTimeout(() => {
            res(wallet);
        }, 100);
    });
}

// Gen multisig wallet from set of public keys
function genMultisig([pubKeys]) {
    return new Promise((res) => {
        aliceNetAdapter.wallet.Account.addMultiSig([pubKeys]).then((multiSig) => {
            setTimeout(() => {
                res(multiSig);
            }, 100);
        });
    });
}

// Action to update the multisig account balance
export const updateMultiSigAccountBalance = createAsyncThunk(
    "app/updateMultiSigAccountBalance",
    async (address, thunkAPI) => {
        const appState = thunkAPI.getState().app;
        const multiSigAddress = appState.wallets[walletKeyByNumber[3]].address;
        const [utxoids, aBalance] = await aliceNetAdapter.wallet.Rpc.getValueStoreUTXOIDs(
            address ? address : multiSigAddress, // Allow passing address if not available in state yet
            2
        );
        console.log("BalancePoll", { utxoids, aBalance });
        let balance = String(parseInt(aBalance, 16));
        return balance;
    }
);

export const fundWallet = createAsyncThunk("app/fundWallet", async ({ address, curve }, thunkAPI) => {
    console.log("Funding", address, curve);
    await axios.post("http://34.28.51.52:7850/faucet/", {
        address: address,
        curve: curve,
    });
    return;
});

export const genBaseWalletByNumber = createAsyncThunk("app/genBaseWalletByNumber", async (walletNumber, thunkAPI) => {
    let walletState = thunkAPI.getState().app.wallets[walletKeyByNumber[walletNumber]];
    try {
        if (!walletState.address) {
            if (walletNumber === 3) {
                const appState = thunkAPI.getState().app;
                let w1Pubk = appState.wallets[walletKeyByNumber[1]].pubK;
                let w2Pubk = appState.wallets[walletKeyByNumber[2]].pubK;
                w1Pubk = w1Pubk.slice(2, w1Pubk.length); // Remove 0x
                w2Pubk = w2Pubk.slice(2, w2Pubk.length); // Remove 0x
                console.log("Generating Group Wallet From PubKeys: ", { w1Pubk, w2Pubk });
                const multiSigWallet = await genMultisig([w1Pubk, w2Pubk]);
                console.log({ multiSigWallet });
                // Get Balance For MultiSig
                await thunkAPI.dispatch(updateMultiSigAccountBalance(multiSigWallet.address));
                return {
                    wallet: {
                        address: "0x" + aliceNetAdapter.wallet.Account.accounts[walletNumber - 1].address,
                        pKey: multiSigWallet.privateKey,
                        pubK: "0x" + (await multiSigWallet.signer.getPubK()),
                    },
                    walletNumber: walletNumber,
                };
            } else {
                console.log(`Generating Wallet: ${walletKeyByNumber[walletNumber]}`);
                let wallet = await generateWallet(staticWallets ? staticTestKeys[walletNumber] : false);
                await aliceNetAdapter.wallet.Account.addAccount(wallet.privateKey, 2);
                let pubK = await aliceNetAdapter.wallet.Account.accounts[walletNumber - 1].signer.getPubK();
                return {
                    wallet: {
                        address: "0x" + aliceNetAdapter.wallet.Account.accounts[walletNumber - 1].address,
                        pKey: wallet.privateKey,
                        pubK: "0x" + pubK,
                    },
                    walletNumber: walletNumber,
                };
            }
        } else {
            console.warn(`${walletKeyByNumber[walletNumber]} Already Exists: `, JSON.stringify(walletState));
            console.warn(
                `An attempt to regenerate ${walletKeyByNumber[walletNumber]} was made. -- You should try to avoid this.`
            );
        }
    } catch (ex) {
        console.error(ex);
    }
});

// Loads a game state from current redux index if viable
export const loadGameStateFromIndex = createAsyncThunk("app/loadGameStateFromIndex", async (n, thunkAPI) => {
    try {
        const state = thunkAPI.getState().app;
        const multiSigAddress = state.wallets[walletKeyByNumber[3]].address;
        const gameIndex = state.gameIndex;
        // get the data sore using the multisig address and the game index
        console.log({ multiSigAddress, gameIndex });
        const dataStore = await aliceNetAdapter.wallet.Rpc.getDataStoreByIndex(multiSigAddress, 2, gameIndex);
        if (dataStore) {
            // extract the raw data from the data store
            const rawData = dataStore["DSLinker"]["DSPreImage"]["RawData"];
            // extract the tx hash from the data store
            // const txHash = dataStore['DSLinker']['TxHash'];
            // deserialize the data into a valid game board
            // return { board: this.deserializeBoard(rawData.slice(1).split('')), txHash };
        }
    } catch (ex) {
        console.log(ex);
    }
});

/**
 * For the sake of all that is holy, DO NOT call these more than needed -- it will morph the datastore state until it is FUBAR
 * I repeat, do not call the below functions out of order, use the UI to restrict and disable function calls from the buttons.
 *
 * 0. Make sure gamestate is accurate
 * board updates should happen in redux store before calling these with updateGameState()*
 *
 * *This happens already in the useEffect sync I created -- You should be good to go here
 *
 * 1. createGameStateTransaction - Creates the baseline transaction for signing
 * 2. xSignsGameStateTransaction - X Must sign the txData
 * 3. oSignsGameStateTransaction - O Must sign the txData
 * 4. sendGameStateTransactions - Actually send the transaction
 *
 * Calling 1 will always RESET the transaction!
 *
 */

export const createGameStateTransaction = createAsyncThunk("app/createGameStateTransaction", async (n, thunkAPI) => {
    try {
        const state = thunkAPI.getState().app;
        const currentGameState = state.gameState;
        const gameIndex = state.gameIndex;
        const serializedTttState = serializeTttGameState(currentGameState); // Serialize for DataStore
        const multiSigAddress = state.wallets[walletKeyByNumber[3]].address;

        // Reset TxState && Create Base Data Store witrh Serialized State
        await aliceNetAdapter.wallet.Transaction._reset();
        await aliceNetAdapter.wallet.Transaction.createDataStore(
            multiSigAddress,
            `0x${gameIndex}`,
            2,
            serializedTttState
        );
        // Create the transaction fee
        await aliceNetAdapter.wallet.Transaction.createTxFee(multiSigAddress, 2);
        // Create the raw transaction object
        await aliceNetAdapter.wallet.Transaction.createRawTransaction();
        return;
        // Next actions should be X sign, and O sign
    } catch (ex) {
        console.log(ex);
    }
});

const signMove = async (player, txMsgs, multiSigPubK) => {
    try {
        // The multisignature public key for which the signer will be signing for is multiSigPubK
        // Sign the transactions vin messages
        let vin = await aliceNetAdapter.wallet.Account.accounts[parseInt(player - 1)].signer.multiSig.signMulti(
            txMsgs["Vin"],
            multiSigPubK
        );
        // Sign the transactions vout messages
        let vout = await aliceNetAdapter.wallet.Account.accounts[parseInt(player - 1)].signer.multiSig.signMulti(
            txMsgs["Vout"],
            multiSigPubK
        );
        // Return the signed vin and vout messages
        return [vin, vout];
    } catch (ex) {
        console.log(ex);
    }
};

export const xSignsGameStateTransaction = createAsyncThunk("app/xSignsGameStateTransaction", async (n, thunkAPI) => {
    try {
        console.log("X Signing Transaction");
        const multiSigPubKey = thunkAPI.getState().app.wallets[walletKeyByNumber[3]].pubK;
        // get the transaction signature messages for X account to sign and cache in lastSignedXSigs
        let sigMsgs = await aliceNetAdapter.wallet.Transaction.Tx.getSignatures();
        let [sigsXVin, sigsXVout] = await signMove(1, sigMsgs, multiSigPubKey);
        lastSignedXSigs = [sigsXVin, sigsXVout];
        return;
    } catch (ex) {
        console.error(ex);
    }
});

export const oSignsGameStateTransaction = createAsyncThunk("app/oSignsGameStateTransaction", async (n, thunkAPI) => {
    try {
        console.log("O Signing Transaction");
        const multiSigPubKey = thunkAPI.getState().app.wallets[walletKeyByNumber[3]].pubK;
        // get the transaction signature messages for O account to sign and cache in lastSignedXSigs
        let sigMsgs = await aliceNetAdapter.wallet.Transaction.Tx.getSignatures();
        let [sigsOVin, sigsOVout] = await signMove(2, sigMsgs, multiSigPubKey);
        lastSignedOSigs = [sigsOVin, sigsOVout];
        // After O Signs -- Inject the TX Sigs back into the transaction
        await aliceNetAdapter.wallet.Transaction.Tx.injectSignaturesAggregate(
            [lastSignedXSigs[0], lastSignedOSigs[0]],
            [lastSignedXSigs[1], lastSignedOSigs[1]]
        );
        return;
    } catch (ex) {
        console.error(ex);
    }
});

export const sendGameStateTransaction = createAsyncThunk("app/sendGameStateTransaction", async (n, thunkAPI) => {
    try {
        const multiSigAddress = thunkAPI.getState().app.wallets[walletKeyByNumber[3]].address;
        // send the signed transaction to the network
        let txHash = await aliceNetAdapter.wallet.Transaction.sendSignedTx(
            aliceNetAdapter.wallet.Transaction.Tx.getTx()
        );
        // monitor and wait for the transaction to be mined
        await aliceNetAdapter.wallet.Rpc.monitorPending(txHash);
        // Fetch balance for the multisignature account
        const [, aBalance] = await aliceNetAdapter.wallet.Rpc.getValueStoreUTXOIDs(multiSigAddress, 2);
        return {
            balance: String(parseInt(aBalance, 16)),
            hash: txHash,
        };
    } catch (ex) {
        console.log(ex);
    }
});
